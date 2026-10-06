# 🧬 CancerGraph: Multimodal Cancer AI Platform & Research Workbench

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Python](https://img.shields.io/badge/Python-Native_HTTP-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Keras](https://img.shields.io/badge/Keras-Legacy_tf_keras-FF6F00?logo=tensorflow&logoColor=white)](https://tf-keras.readthedocs.io/)

**CancerGraph** is a web-based AI application and research platform designed to showcase multimodal deep learning models for cancer classification alongside academic BTP (Bachelor Technology Project) research benchmarks.

The application pairs interactive frontend interfaces with lightweight Python inference backends, allowing users to test diagnostic classification models and explore research methodology across cancer domains.

---

## 🎯 Project Status & Scope

To provide full technical transparency for reviewers and recruiters, project capabilities are categorized into three distinct tiers:

### A. Genuinely Implemented Application Features
* **Live 4-Class Brain MRI Glioma Classifier**: Interactive deep learning inference engine for 2D Brain MRI slices. Accepts image uploads or pre-loaded dataset slice samples and returns Softmax predictions across 4 classes (`glioma`, `meningioma`, `pituitary`, `notumor`).
* **Python Inference Backend**: Built with Python's native `http.server` library (port `5000`) loading an EfficientNet Keras model (`glioma_dataset2_classifier.keras`) running on `tf_keras`.
* **Progressive Disclosure UI Architecture**: Clean 5-level user navigation flow (Home $\rightarrow$ Domain Workspace $\rightarrow$ Live AI Tool / Research / Datasets).
* **Collapsible Workspace Sidebar**: Contextual sidebar navigation with dynamic toggle controls.
* **Dataset & Modality Explorers**: Structured metadata visualizers detailing MRI sequences, histopathology slides, ultrasound, and mammography datasets.

### B. Research & Experimental Material (BTP Benchmark Suite)
* **3,200D Feature Embeddings**: Offline Python evaluations (`evaluate_dense_efficient.py`) extracting intermediate feature representations (`concatenate_2`, `dense_15`). The frontend provides an interactive vector sandbox for demonstration.
* **TCGA Genomic Biomarker Profiling**: Theoretical clinical profiling context (`IDH1/2`, `MGMT` promoter methylation, `1p/19q` co-deletion) displayed in patient analysis UI pages.
* **Breast Cancer Transfer Learning Research**: Empirical dataset audits (CBIS-DDSM, BUSI, BreaKHis) and representation transfer findings documented in dedicated research showcase pages.
* **3D U-Net Volumetric Segmentation**: Research-level evaluation material and architecture diagrams for 3D brain tumor segmentation (`OncoSense 3D-UNet`).

### C. Planned / Future Capabilities (Roadmap)
* **Breast Cancer Backend Integration**: Connecting live classification models for Breast Ultrasound (`BUSI`) and Scanned Mammography (`CBIS-DDSM`).
* **Multi-Organ Domain Expansion**: Domain shells for **Lung (NSCLC)**, **Liver (HCC)**, **Prostate**, and **Colorectal** cancers (currently marked "Under Development" on the roadmap).

---

## 🏗️ System Architecture & Technology Stack

```text
┌─────────────────────────────────────────────────────────┐
│              CancerGraph React 19 Frontend               │
│  (React 19, TypeScript 6.0, Vite 8.2, React Router 7)   │
└────────────────────────────┬────────────────────────────┘
                             │
                  POST /api/predict (JSON)
                  GET /api/health
                  GET /api/sample_image
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│               Python Native HTTP Server                 │
│        (http.server.HTTPServer on Port 5000)            │
│                     [tf_keras]                          │
│                             │                           │
│                             ▼                           │
│          glioma_dataset2_classifier.keras               │
│         (4-Class Brain MRI Classifier Model)            │
└─────────────────────────────────────────────────────────┘
```

* **Frontend Stack**: React `19.2.8`, TypeScript `6.0.2`, Vite `8.2.0`, React Router DOM `7.18.2`, Lucide React `1.33.0`.
* **Backend Stack**: Python Standard Library `http.server` running on port `5000`, Pillow (`PIL`), NumPy.
* **ML Framework**: `tf_keras` legacy API compatibility mode (`TF_USE_LEGACY_KERAS=1`).

---

## ⚙️ How to Run Locally

### 1. Prerequisites
* **Node.js**: v18.0.0 or higher
* **Python**: v3.10+ with `tf_keras` (or `tensorflow`), `Pillow`, and `numpy`

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Start Python Inference API Server
In your first terminal window:
```bash
python Research/Glioma/evaluation/brain_tumor_classifier/inference_api.py
```
*The server will initialize `glioma_dataset2_classifier.keras` and listen at `http://127.0.0.1:5000`.*

### 4. Start Vite Frontend Development Server
In your second terminal window:
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 5. Validate Application Build
```bash
npm run build
```

---

## 📁 Repository Exclusions (.gitignore Notice)

To maintain a clean public repository and respect data privacy, the following local research artifacts are **intentionally excluded from Git** via explicit directory-level `.gitignore` rules:

* **Raw Datasets**: `Research/Glioma/datasets/`, `Research/Breast Cancer/datasets/`
* **Trained Model Binary Artifacts**: `Research/Glioma/models/`, `Research/Breast Cancer/models/`
* **High-Dimensional Embeddings**: `Research/embeddings/`
* **Academic BTP Documents & Presentations**: `Research/*.pptx`, `Research/*.docx`, `Research/*.pdf`
* **Internal Analysis Workspaces**: `Research/literature/`, `Research/notebooks/`, `Research/experiments/`

---

## ⚠️ Current Limitations & Research Status

1. **Inference Backend Scope**: Only the 4-class Glioma Brain MRI classifier (`glioma_dataset2_classifier.keras`) is currently wired to a live backend API.
2. **Medical Disclaimer**: CancerGraph is an academic demonstration and research portfolio project. It is **not** a certified medical diagnostic device and must not be used for clinical decision-making.

---

## 📜 License

Distributed under the **MIT License**. Created for academic research and portfolio demonstration.
