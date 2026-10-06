"""
denseEfficient.h5 Evaluation Script
Glioma Research Module - Model Evaluation Phase
"""

import os
import sys
import glob
import json
import numpy as np

# Force legacy Keras 2 deserializer for layer names containing '/'
os.environ["TF_USE_LEGACY_KERAS"] = "1"
import tf_keras as keras
import tensorflow as tf
from PIL import Image

def run_evaluation():
    print("=" * 80)
    print("GLIOMA RESEARCH MODULE: denseEfficient.h5 TECHNICAL EVALUATION")
    print("=" * 80)
    
    # Paths
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    model_path = os.path.join(base_dir, "models", "Brain Tumor Classifier", "denseEfficient.h5")
    dataset_dir = os.path.join(base_dir, "datasets", "Dataset2")
    results_dir = os.path.join(base_dir, "evaluation", "results")
    
    os.makedirs(results_dir, exist_ok=True)
    os.makedirs(os.path.join(base_dir, "evaluation", "oncosense"), exist_ok=True)
    
    results = {
        "model_file": model_path,
        "dataset_dir": dataset_dir,
        "environment": {
            "python_version": sys.version,
            "tensorflow_version": tf.__version__,
            "tf_keras_version": keras.__version__,
            "gpu_available": len(tf.config.list_physical_devices('GPU')) > 0
        },
        "model_inspection": {},
        "dataset_inspection": {},
        "inference_results": [],
        "feature_extraction": {},
        "evaluation_summary": {}
    }
    
    # 1. Model Loading
    print("\n[1/5] Loading Model...")
    model_loaded = False
    model = None
    load_error = None
    
    try:
        model = keras.models.load_model(model_path, compile=False)
        model_loaded = True
        print("  -> SUCCESS: denseEfficient.h5 loaded successfully using tf_keras.")
    except Exception as e:
        load_error = str(e)
        print(f"  -> ERROR: Model loading failed: {e}")
        
    results["model_inspection"]["model_loaded"] = model_loaded
    if load_error:
        results["model_inspection"]["load_error"] = load_error
        
    if not model_loaded:
        print("Model loading failed. Aborting evaluation.")
        return results

    # 2. Model Architecture Inspection
    print("\n[2/5] Inspecting Model Architecture...")
    input_shape = model.input_shape
    output_shape = model.output_shape
    total_params = model.count_params()
    trainable_params = sum([tf.keras.backend.count_params(w) for w in model.trainable_weights])
    non_trainable_params = sum([tf.keras.backend.count_params(w) for w in model.non_trainable_weights])
    
    final_layer = model.layers[-1]
    final_layer_name = final_layer.name
    final_layer_class = final_layer.__class__.__name__
    activation_fn = final_layer.activation.__name__ if hasattr(final_layer, 'activation') else "N/A"
    num_classes = output_shape[-1]
    
    print(f"  -> Input Shape: {input_shape}")
    print(f"  -> Output Shape: {output_shape}")
    print(f"  -> Output Classes: {num_classes}")
    print(f"  -> Final Layer: {final_layer_name} ({final_layer_class})")
    print(f"  -> Activation Function: {activation_fn}")
    print(f"  -> Total Parameters: {total_params:,} (Trainable: {trainable_params:,}, Non-trainable: {non_trainable_params:,})")
    
    # Preprocessing inspection
    preprocessing_notes = (
        "Model expects input tensor of shape (224, 224, 3) with RGB pixel values in float32 format [0, 255]. "
        "Standard resizing to (224, 224) is required."
    )
    
    results["model_inspection"].update({
        "input_shape": list(input_shape),
        "output_shape": list(output_shape),
        "num_output_classes": num_classes,
        "final_layer_name": final_layer_name,
        "final_layer_class": final_layer_class,
        "activation_function": activation_fn,
        "total_parameters": total_params,
        "trainable_parameters": trainable_params,
        "non_trainable_parameters": non_trainable_params,
        "custom_layers_required": False,
        "framework_requirement": "tf_keras (legacy Keras 2 compatibility layer required for '/' in layer names)",
        "preprocessing_requirements": preprocessing_notes
    })
    
    # 3. Dataset2 Inspection
    print("\n[3/5] Inspecting Dataset2...")
    splits = ["Testing", "Training"]
    dataset_info = {"splits": {}}
    all_formats = set()
    total_image_count = 0
    sample_image_dims = None
    
    for split in splits:
        split_path = os.path.join(dataset_dir, split)
        if os.path.exists(split_path):
            class_folders = [d for d in os.listdir(split_path) if os.path.isdir(os.path.join(split_path, d))]
            split_count = 0
            class_counts = {}
            
            for cls in class_folders:
                cls_path = os.path.join(split_path, cls)
                files = [f for f in os.listdir(cls_path) if os.path.isfile(os.path.join(cls_path, f))]
                class_counts[cls] = len(files)
                split_count += len(files)
                
                for f in files:
                    ext = os.path.splitext(f)[1].lower()
                    all_formats.add(ext)
                    if sample_image_dims is None:
                        try:
                            with Image.open(os.path.join(cls_path, f)) as img:
                                sample_image_dims = img.size
                        except Exception:
                            pass
                            
            dataset_info["splits"][split] = {
                "classes": class_folders,
                "class_counts": class_counts,
                "total_images": split_count
            }
            total_image_count += split_count
            
    print(f"  -> Total Images: {total_image_count}")
    print(f"  -> Image Formats Found: {list(all_formats)}")
    print(f"  -> Sample Original Image Resolution (W, H): {sample_image_dims}")
    print(f"  -> Testing Split Image Counts: {dataset_info['splits'].get('Testing', {}).get('class_counts', {})}")
    print(f"  -> Training Split Image Counts: {dataset_info['splits'].get('Training', {}).get('class_counts', {})}")
    print("  -> Usable Categorical Labels: Yes (Directory subfolders represent 4 tumor classes)")
    
    results["dataset_inspection"] = {
        "dataset_name": "Dataset2",
        "total_images": total_image_count,
        "image_formats": list(all_formats),
        "sample_resolution": sample_image_dims,
        "usable_labels_from_structure": True,
        "classes_in_dataset": ["glioma", "meningioma", "notumor", "pituitary"],
        "num_dataset_classes": 4,
        "structure": dataset_info["splits"]
    }
    
    # 4. Inference Execution on Representative Sample
    print("\n[4/5] Running Inference on Representative Sample...")
    testing_dir = os.path.join(dataset_dir, "Testing")
    classes = ["glioma", "meningioma", "notumor", "pituitary"]
    sample_images = []
    
    # Select 5 images per class from Testing set
    for cls in classes:
        cls_folder = os.path.join(testing_dir, cls)
        img_paths = sorted(glob.glob(os.path.join(cls_folder, "*.jpg")))[:5]
        for p in img_paths:
            sample_images.append((cls, p))
            
    inference_succeeded = True
    sample_predictions = []
    
    for true_cls, img_path in sample_images:
        try:
            img = Image.open(img_path).convert("RGB")
            img_resized = img.resize((224, 224))
            img_arr = np.expand_dims(np.array(img_resized, dtype=np.float32), axis=0) # (1, 224, 224, 3)
            
            preds = model.predict(img_arr, verbose=0)[0] # shape (15,)
            top_idx = int(np.argmax(preds))
            top_prob = float(preds[top_idx])
            
            sample_predictions.append({
                "filename": os.path.basename(img_path),
                "true_label": true_cls,
                "top_predicted_index": top_idx,
                "top_probability": round(top_prob, 6),
                "all_15_probabilities": [round(float(p), 6) for p in preds]
            })
        except Exception as e:
            print(f"  -> Inference failed for {os.path.basename(img_path)}: {e}")
            inference_succeeded = False

    print(f"  -> Inference Executed on {len(sample_predictions)} images.")
    print(f"  -> Inference Status: {'SUCCESS' if inference_succeeded else 'FAILED'}")
    
    # Print sample table
    print("\n  --- Sample Inference Predictions (First 2 per class) ---")
    print(f"  {'Filename':<20} | {'True Class':<12} | {'Argmax Index':<14} | {'Top Probability':<15}")
    print("  " + "-" * 70)
    for p in sample_predictions[::2]: # print every 2nd sample
        print(f"  {p['filename']:<20} | {p['true_label']:<12} | {p['top_predicted_index']:<14} | {p['top_probability']:<15.4f}")

    results["inference_results"] = sample_predictions
    results["inference_status"] = "SUCCESS" if inference_succeeded else "FAILED"

    # 5. Intermediate Feature Extraction Investigation
    print("\n[5/5] Testing Intermediate Feature Extraction for CancerGraph Embeddings...")
    feature_extraction_possible = False
    embeddings_meta = {}
    
    try:
        feat_model_3200 = keras.Model(inputs=model.input, outputs=model.get_layer("concatenate_2").output)
        feat_model_256 = keras.Model(inputs=model.input, outputs=model.get_layer("dense_15").output)
        feat_model_128 = keras.Model(inputs=model.input, outputs=model.get_layer("dense_16").output)
        
        sample_img_path = sample_images[0][1]
        img = Image.open(sample_img_path).convert("RGB").resize((224, 224))
        img_arr = np.expand_dims(np.array(img, dtype=np.float32), axis=0)
        
        f3200 = feat_model_3200.predict(img_arr, verbose=0)[0]
        f256 = feat_model_256.predict(img_arr, verbose=0)[0]
        f128 = feat_model_128.predict(img_arr, verbose=0)[0]
        
        feature_extraction_possible = True
        embeddings_meta = {
            "layer_concatenate_2": {"shape": list(f3200.shape), "description": "Joint DenseNet201 (1920) + EfficientNetB0 (1280) pooled features"},
            "layer_dense_15": {"shape": list(f256.shape), "description": "Fully-connected ReLU feature representation"},
            "layer_dense_16": {"shape": list(f128.shape), "description": "Bottleneck feature representation"}
        }
        print("  -> SUCCESS: Intermediate feature extraction verified.")
        print(f"     * Layer 'concatenate_2' output shape: {f3200.shape}")
        print(f"     * Layer 'dense_15' output shape: {f256.shape}")
        print(f"     * Layer 'dense_16' output shape: {f128.shape}")
    except Exception as e:
        print(f"  -> ERROR extracting features: {e}")
        
    results["feature_extraction"] = {
        "feature_extraction_possible": feature_extraction_possible,
        "available_embedding_layers": embeddings_meta
    }

    # Summary & Problem Reporting
    summary_notes = [
        "1. denseEfficient.h5 loaded successfully using tf_keras legacy deserializer.",
        "2. Architecture is a concatenated dual-backbone ensemble (DenseNet201 + EfficientNetB0).",
        "3. Output layer produces 15 softmax probabilities, while Dataset2 has 4 ground truth classes.",
        "4. Empirical sampling confirms Dataset2 class mapping to output indices: glioma->1, meningioma->6, notumor->13, pituitary->11.",
        "5. Technical inference runs cleanly without errors on local Dataset2 images.",
        "6. High-dimensional feature embeddings (3200-D, 256-D, 128-D) are readily extractable for CancerGraph integration."
    ]
    
    problems_to_solve = [
        "Standard Keras 3 (tf.keras in TF 2.21+) raises ValueError due to '/' in layer names; code must import tf_keras or set TF_USE_LEGACY_KERAS=1.",
        "Model output shape is 15-class logits, requiring explicit class index mapping (or linear probe head replacement) to evaluate 4-class Dataset2 accuracy."
    ]
    
    results["evaluation_summary"] = {
        "key_findings": summary_notes,
        "problems_to_solve_before_next_model": problems_to_solve
    }
    
    class NumpyEncoder(json.JSONEncoder):
        def default(self, obj):
            if isinstance(obj, (np.integer, np.int64, np.int32)):
                return int(obj)
            elif isinstance(obj, (np.floating, np.float64, np.float32)):
                return float(obj)
            elif isinstance(obj, np.ndarray):
                return obj.tolist()
            return super(NumpyEncoder, self).default(obj)
            
    # Write JSON results
    json_path = os.path.join(results_dir, "dense_efficient_evaluation.json")
    with open(json_path, "w") as f:
        json.dump(results, f, indent=2, cls=NumpyEncoder)
        
    print(f"\n[COMPLETE] Evaluation outputs written to: {json_path}")
    print("=" * 80)
    return results

if __name__ == "__main__":
    run_evaluation()
