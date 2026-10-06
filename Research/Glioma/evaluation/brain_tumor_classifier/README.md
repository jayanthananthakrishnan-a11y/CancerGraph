# Model Evaluation: Brain Tumor Classifier (`denseEfficient.h5`)

## 1. Overview & File Paths
- **Model File**: `Research/Glioma/models/Brain Tumor Classifier/denseEfficient.h5` (~101.5 MB)
- **Dataset Evaluated**: `Research/Glioma/datasets/Dataset2`
- **Evaluation Script**: `Research/Glioma/evaluation/brain_tumor_classifier/evaluate_dense_efficient.py`
- **Evaluation Output Results**: `Research/Glioma/evaluation/results/dense_efficient_evaluation.json`

---

## 2. Framework & Environment Requirements
- **Python Version**: `3.11.9`
- **TensorFlow Version**: `2.21.0`
- **Keras Framework**: `tf_keras` (`2.21.0`)
- **Key Requirement**: Standard Keras 3 (`tf.keras` in TF 2.21) fails on legacy layer names containing `/` (e.g. `conv1/conv` within the DenseNet submodel). Successful model loading requires setting `os.environ["TF_USE_LEGACY_KERAS"] = "1"` or importing `tf_keras`.

---

## 3. Model Architecture & Specifications
- **Model Type**: Concatenated Dual-Backbone Feature Fusion Ensemble
- **Sub-Networks**:
  - `densenet201` (Functional): outputs a 1,920-dimensional feature vector.
  - `efficientnetb0` (Functional): outputs a 1,280-dimensional feature vector.
- **Fusion Layer**: `concatenate_2` (Concatenates DenseNet201 + EfficientNetB0 into a 3,200-dimensional vector).
- **Classification Head**:
  - `flatten_5` $\rightarrow$ `batch_normalization_103`
  - `dense_15` (Dense, 256 units, ReLU)
  - `dropout_10` (rate 0.5)
  - `dense_16` (Dense, 128 units, ReLU)
  - `dropout_11` (rate 0.5)
  - `dense_17` (Dense, 15 units, Softmax)
- **Input Shape**: `(None, 224, 224, 3)` (RGB image format)
- **Output Shape**: `(None, 15)` (15 softmax class probabilities)
- **Total Parameters**: 23,238,642 (860,687 trainable, 22,377,955 non-trainable)
- **Custom Layers**: None (Standard legacy Keras 2 layers)

---

## 4. Preprocessing Requirements
- **Target Dimensions**: `(224, 224, 3)`
- **Color Channels**: RGB
- **Input Data Type**: `float32` array
- **Pixel Value Range**: `[0, 255]`
- **Internal Normalization**: The model contains internal scaling/normalization blocks. Images must be resized to `(224, 224)` and formatted as 3-channel RGB float arrays.

---

## 5. Dataset2 Structure & Class Information
- **Total Images**: 7,200 `.jpg` files
  - `Testing/`: 1,600 images (400 `glioma`, 400 `meningioma`, 400 `notumor`, 400 `pituitary`)
  - `Training/`: 5,600 images (1,400 `glioma`, 1,400 `meningioma`, 1,400 `notumor`, 1,400 `pituitary`)
- **Dataset Classes**: 4 categories (`glioma`, `meningioma`, `notumor`, `pituitary`)
- **Usable Labels**: Yes, subfolder directory hierarchy provides ground truth labels.
- **Resolution**: Original images are typically 512x512 JPEG format.

---

## 6. Model Loading & Technical Inference Status
- **Model Loading Status**: **`SUCCESS`** (via `tf_keras`)
- **Inference Status**: **`SUCCESS`**
- **Scientifically Valid Accuracy Scope**: Not calculated at this stage. The primary objective of this evaluation phase is establishing technical compatibility and inference execution.

### Sample Prediction Results (Representative Batch from Dataset2 `Testing` split)
| Filename | True Label | Model Output Shape | Argmax Index | Top Probability |
| :--- | :--- | :--- | :--- | :--- |
| `Te-gl_0010.jpg` | `glioma` | `(15,)` | Index 9 | 0.8883 |
| `Te-gl_0012.jpg` | `glioma` | `(15,)` | Index 9 | 0.8241 |
| `Te-me_0010.jpg` | `meningioma` | `(15,)` | Index 9 | 0.4151 |
| `Te-me_0012.jpg` | `meningioma` | `(15,)` | Index 9 | 0.4632 |
| `Te-no_0010.jpg` | `notumor` | `(15,)` | Index 8 | 0.7453 |
| `Te-no_0012.jpg` | `notumor` | `(15,)` | Index 8 | 0.5401 |
| `Te-pi_0010.jpg` | `pituitary` | `(15,)` | Index 8 | 0.4337 |
| `Te-pi_0012.jpg` | `pituitary` | `(15,)` | Index 8 | 0.4859 |

---

## 7. Intermediate Feature Extraction for CancerGraph GNN
- **Feature Extraction Feasibility**: **`YES`**
- **Available Embedding Layers**:
  1. `concatenate_2`: **3,200-dimensional** vector (Combined DenseNet201 + EfficientNetB0 representation).
  2. `dense_15`: **256-dimensional** vector (Dense ReLU representation).
  3. `dense_16`: **128-dimensional** vector (Bottleneck feature representation).
- **CancerGraph Utility**: The 3,200-D or 256-D vectors can be directly extracted to serve as rich imaging node embeddings for multimodal fusion in CancerGraph GNN.

---

## 8. Compatibility Issues & Next Steps
1. **Keras 3 vs Keras 2 Slashes in Layer Names**:
   - *Issue*: Loading `denseEfficient.h5` directly in `tf.keras` (Keras 3) throws `ValueError: Argument name must be a string and cannot contain character '/'`.
   - *Solution*: Set `os.environ["TF_USE_LEGACY_KERAS"] = "1"` or import `tf_keras`.
2. **15-Class Output Head vs 4-Class Target Dataset**:
   - *Issue*: The model's classification head `dense_17` outputs 15 classes, whereas `Dataset2` contains 4 classes.
   - *Solution*: For classification on `Dataset2`, an explicit 15-to-4 class mapping or linear probe head fine-tuning is required before reporting accuracy metrics.
