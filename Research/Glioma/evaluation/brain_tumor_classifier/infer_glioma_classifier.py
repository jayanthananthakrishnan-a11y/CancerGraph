"""
Standalone Inference Script for Glioma 4-Class MRI Classifier
Model Path: Research/Glioma/models/glioma_dataset2_classifier.keras
"""

import os
import sys
import json
import numpy as np
from PIL import Image

os.environ["TF_USE_LEGACY_KERAS"] = "1"
import tf_keras as keras

MODEL_PATH = r"c:\Users\akris\OneDrive\Desktop\Multimodal_Cancer_Classification_BetaVersion\Research\Glioma\models\glioma_dataset2_classifier.keras"
CLASSES = ['glioma', 'meningioma', 'notumor', 'pituitary']
IMG_SIZE = (224, 224)

def load_glioma_model():
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Trained model checkpoint not found at: {MODEL_PATH}")
    model = keras.models.load_model(MODEL_PATH)
    return model

def preprocess_mri_image(image_input):
    """
    Accepts image file path or PIL Image object.
    Returns preprocessed float32 numpy array with shape (1, 224, 224, 3)
    """
    if isinstance(image_input, str):
        img = Image.open(image_input)
    else:
        img = image_input

    img_rgb = img.convert('RGB')
    img_resized = img_rgb.resize(IMG_SIZE)
    arr = np.array(img_resized, dtype=np.float32) / 255.0
    tensor = np.expand_dims(arr, axis=0)
    return tensor

def predict_mri(model, image_input):
    tensor = preprocess_mri_image(image_input)
    probs = model.predict(tensor, verbose=0)[0]
    
    pred_idx = int(np.argmax(probs))
    pred_class = CLASSES[pred_idx]
    
    prob_dict = {cls: float(round(float(p), 4)) for cls, p in zip(CLASSES, probs)}
    
    result = {
        'model_name': 'glioma_dataset2_classifier.keras',
        'model_version': '1.0.0 (Dataset2 Baseline MobileNetV2)',
        'classes': CLASSES,
        'predicted_class': pred_class,
        'predicted_index': pred_idx,
        'confidence': float(round(float(probs[pred_idx]), 4)),
        'probabilities': prob_dict,
        'disclaimer': 'Research classification — not a clinical diagnosis.'
    }
    return result

def main():
    if len(sys.argv) < 2:
        print("Usage: python infer_glioma_classifier.py <path_to_mri_image>")
        sys.exit(1)
        
    image_path = sys.argv[1]
    if not os.path.exists(image_path):
        print(f"Error: Image file not found: {image_path}")
        sys.exit(1)
        
    model = load_glioma_model()
    result = predict_mri(model, image_path)
    print(json.dumps(result, indent=2))

if __name__ == '__main__':
    main()
