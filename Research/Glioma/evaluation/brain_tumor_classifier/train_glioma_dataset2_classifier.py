"""
Training script for Glioma 4-Class Brain MRI Classifier
Target Dataset: Research/Glioma/datasets/Dataset2
Model Output: Research/Glioma/models/glioma_dataset2_classifier.keras
Results Output: Research/Glioma/evaluation/results/glioma_dataset2_evaluation.json
"""

import os
import json
import numpy as np
import tensorflow as tf
from PIL import Image
from sklearn.metrics import classification_report, confusion_matrix, precision_recall_fscore_support

# Ensure legacy keras compatibility if needed
os.environ["TF_USE_LEGACY_KERAS"] = "1"
import tf_keras as keras

# Target paths
DATASET_DIR = r"c:\Users\akris\OneDrive\Desktop\Multimodal_Cancer_Classification_BetaVersion\Research\Glioma\datasets\Dataset2"
MODEL_SAVE_PATH = r"c:\Users\akris\OneDrive\Desktop\Multimodal_Cancer_Classification_BetaVersion\Research\Glioma\models\glioma_dataset2_classifier.keras"
RESULTS_SAVE_PATH = r"c:\Users\akris\OneDrive\Desktop\Multimodal_Cancer_Classification_BetaVersion\Research\Glioma\evaluation\results\glioma_dataset2_evaluation.json"

CLASSES = ['glioma', 'meningioma', 'notumor', 'pituitary']
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10

def load_data_from_directory(folder_path):
    images = []
    labels = []
    filepaths = []
    
    for class_idx, class_name in enumerate(CLASSES):
        cls_dir = os.path.join(folder_path, class_name)
        if not os.path.exists(cls_dir):
            continue
        for fname in os.listdir(cls_dir):
            fpath = os.path.join(cls_dir, fname)
            if fname.lower().endswith(('.jpg', '.jpeg', '.png')):
                filepaths.append(fpath)
                labels.append(class_idx)
                
    return filepaths, np.array(labels)

def preprocess_image(fpath):
    with Image.open(fpath) as img:
        img_rgb = img.convert('RGB')
        img_resized = img_rgb.resize(IMG_SIZE)
        arr = np.array(img_resized, dtype=np.float32) / 255.0
        return arr

class DataGenerator(keras.utils.Sequence):
    def __init__(self, filepaths, labels, batch_size=32, shuffle=True):
        self.filepaths = np.array(filepaths)
        self.labels = np.array(labels)
        self.batch_size = batch_size
        self.shuffle = shuffle
        self.indices = np.arange(len(self.filepaths))
        self.on_epoch_end()
        
    def __len__(self):
        return int(np.ceil(len(self.filepaths) / self.batch_size))
        
    def __getitem__(self, index):
        batch_indices = self.indices[index * self.batch_size:(index + 1) * self.batch_size]
        batch_paths = self.filepaths[batch_indices]
        batch_labels = self.labels[batch_indices]
        
        batch_x = np.zeros((len(batch_paths), IMG_SIZE[0], IMG_SIZE[1], 3), dtype=np.float32)
        for i, path in enumerate(batch_paths):
            batch_x[i] = preprocess_image(path)
            
        batch_y = keras.utils.to_categorical(batch_labels, num_classes=4)
        return batch_x, batch_y
        
    def on_epoch_end(self):
        if self.shuffle:
            np.random.shuffle(self.indices)

def build_model():
    base_model = keras.applications.MobileNetV2(
        input_shape=(IMG_SIZE[0], IMG_SIZE[1], 3),
        include_top=False,
        weights='imagenet'
    )
    # Freeze base model layers initially
    base_model.trainable = False
    
    inputs = keras.Input(shape=(IMG_SIZE[0], IMG_SIZE[1], 3), name='mri_input')
    x = base_model(inputs, training=False)
    x = keras.layers.GlobalAveragePooling2D()(x)
    x = keras.layers.BatchNormalization()(x)
    x = keras.layers.Dropout(0.3)(x)
    x = keras.layers.Dense(128, activation='relu', name='dense_feature_embedding')(x)
    outputs = keras.layers.Dense(4, activation='softmax', name='classification_head')(x)
    
    model = keras.Model(inputs=inputs, outputs=outputs, name='glioma_dataset2_classifier')
    return model, base_model

def main():
    print("=== Training Glioma 4-Class MRI Classifier ===")
    train_dir = os.path.join(DATASET_DIR, 'Training')
    test_dir = os.path.join(DATASET_DIR, 'Testing')
    
    train_paths, train_labels = load_data_from_directory(train_dir)
    test_paths, test_labels = load_data_from_directory(test_dir)
    
    print(f"Total Training Images: {len(train_paths)}")
    print(f"Total Testing Images: {len(test_paths)}")
    
    # Stratified split: 80% train, 20% validation
    np.random.seed(42)
    val_indices = []
    train_indices = []
    
    for c in range(4):
        c_idx = np.where(train_labels == c)[0]
        np.random.shuffle(c_idx)
        num_val = int(len(c_idx) * 0.2)
        val_indices.extend(c_idx[:num_val])
        train_indices.extend(c_idx[num_val:])
        
    val_paths = [train_paths[i] for i in val_indices]
    val_lbls = train_labels[val_indices]
    
    tr_paths = [train_paths[i] for i in train_indices]
    tr_lbls = train_labels[train_indices]
    
    print(f"Split Training -> Train: {len(tr_paths)}, Validation: {len(val_paths)}")
    
    train_gen = DataGenerator(tr_paths, tr_lbls, batch_size=BATCH_SIZE, shuffle=True)
    val_gen = DataGenerator(val_paths, val_lbls, batch_size=BATCH_SIZE, shuffle=False)
    test_gen = DataGenerator(test_paths, test_labels, batch_size=BATCH_SIZE, shuffle=False)
    
    model, base_model = build_model()
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=1e-3),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    model.summary()
    
    callbacks = [
        keras.callbacks.EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True),
        keras.callbacks.ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=2, min_lr=1e-6)
    ]
    
    print("\nStarting Training (Frozen Backbone)...")
    history = model.fit(
        train_gen,
        validation_data=val_gen,
        epochs=5,
        callbacks=callbacks
    )
    
    print("\nFine-tuning top backbone layers...")
    base_model.trainable = True
    # Freeze lower layers, unfreeze top 30 layers
    for layer in base_model.layers[:-30]:
        layer.trainable = False
        
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=1e-4),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    history_fine = model.fit(
        train_gen,
        validation_data=val_gen,
        epochs=EPOCHS,
        callbacks=callbacks
    )
    
    # Save Model
    os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
    model.save(MODEL_SAVE_PATH)
    print(f"\nTrained model successfully saved to: {MODEL_SAVE_PATH}")
    
    # Evaluate on Test Set
    print("\nEvaluating model on Test Set (1,600 images)...")
    test_preds_prob = model.predict(test_gen)
    test_preds_class = np.argmax(test_preds_prob, axis=1)
    
    test_loss, test_acc = model.evaluate(test_gen)
    
    # Compute detailed metrics
    precision, recall, f1, _ = precision_recall_fscore_support(test_labels, test_preds_class, average='macro')
    precision_per_class, recall_per_class, f1_per_class, _ = precision_recall_fscore_support(test_labels, test_preds_class, average=None)
    cm = confusion_matrix(test_labels, test_preds_class).tolist()
    
    evaluation_results = {
        'model_name': 'glioma_dataset2_classifier',
        'architecture': 'MobileNetV2 Transfer Learning CNN',
        'framework': 'tf_keras (TensorFlow 2.21.0)',
        'target_dataset': 'Research/Glioma/datasets/Dataset2',
        'classes': CLASSES,
        'class_mapping': {i: cls for i, cls in enumerate(CLASSES)},
        'training_summary': {
            'train_samples': len(tr_paths),
            'val_samples': len(val_paths),
            'test_samples': len(test_paths),
            'final_train_acc': float(history_fine.history['accuracy'][-1]),
            'final_val_acc': float(history_fine.history['val_accuracy'][-1]),
            'final_train_loss': float(history_fine.history['loss'][-1]),
            'final_val_loss': float(history_fine.history['val_loss'][-1])
        },
        'test_metrics': {
            'accuracy': float(test_acc),
            'loss': float(test_loss),
            'macro_precision': float(precision),
            'macro_recall': float(recall),
            'macro_f1_score': float(f1),
            'per_class': {
                cls: {
                    'precision': float(precision_per_class[i]),
                    'recall': float(recall_per_class[i]),
                    'f1_score': float(f1_per_class[i])
                } for i, cls in enumerate(CLASSES)
            },
            'confusion_matrix': cm
        }
    }
    
    os.makedirs(os.path.dirname(RESULTS_SAVE_PATH), exist_ok=True)
    with open(RESULTS_SAVE_PATH, 'w') as f:
        json.dump(evaluation_results, f, indent=2)
        
    print(f"Evaluation report successfully saved to: {RESULTS_SAVE_PATH}")
    print("\n--- Final Test Set Results ---")
    print(f"Test Accuracy: {test_acc * 100:.2f}%")
    print(f"Test Loss:     {test_loss:.4f}")
    print(f"Macro F1:      {f1:.4f}")
    print("\nConfusion Matrix:")
    print(np.array(cm))

if __name__ == '__main__':
    main()
