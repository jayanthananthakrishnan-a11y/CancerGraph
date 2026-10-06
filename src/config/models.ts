import type { ModelDefinition } from '../types/model';

export const MODEL_REGISTRY: ModelDefinition[] = [
  // GLIOMA ACTIVE TRAINED Baseline MODEL
  {
    id: 'glioma-dataset2-classifier-active',
    name: 'Glioma Dataset2 Classifier (glioma_dataset2_classifier.keras)',
    cancerTypeId: 'glioma',
    category: 'Vision Models',
    task: 'Classification',
    requiredModalities: ['imaging'],
    version: '1.0.0 (Dataset2 Baseline MobileNetV2)',
    status: 'available_model',
    filePath: 'Research/Glioma/models/glioma_dataset2_classifier.keras',
    description: 'Clean 4-class transfer learning classifier trained directly on local Dataset2 (7,200 2D MRI slices). Connected to local Python inference API on port 5000.',
    outputType: '4 Softmax Class Probabilities (glioma, meningioma, notumor, pituitary)',
    architectureNotes: 'Pretrained MobileNetV2 Backbone -> GlobalAveragePooling2D -> BatchNormalization -> Dropout(0.3) -> Dense(128) -> Dense(4 Softmax)',
    usefulnessNote: 'Primary working ML baseline for interactive 2D MRI slice classification in CancerGraph UI.',
    evaluationFinding: 'Trained locally on Dataset2. Connected to real-time Python inference server.'
  },

  // GLIOMA INVENTORY & OTHER MODELS
  {
    id: 'dense-efficient-brain-tumor',
    name: 'Brain Tumor Classifier (denseEfficient.h5)',
    cancerTypeId: 'glioma',
    category: 'Vision Models',
    task: 'Classification',
    requiredModalities: ['imaging'],
    version: '1.0.0 (Legacy Keras 2)',
    status: 'under_evaluation',
    filePath: 'Research/Glioma/models/Brain Tumor Classifier/denseEfficient.h5',
    description: 'Dual-backbone DenseNet201 + EfficientNetB0 feature fusion ensemble (~101.5 MB). Verified for 2D MRI feature vector extraction (3,200D concatenate_2, 256D dense_15, 128D dense_16).',
    outputType: '15 Raw Class Probabilities / 3,200D Imaging Embeddings',
    architectureNotes: 'DenseNet201 (1,920D) + EfficientNetB0 (1,280D) -> Concatenate (3,200D) -> Dense (256) -> Dense (128) -> Dense (15 Softmax)',
    usefulnessNote: 'Primary baseline for 2D MRI imaging feature vector extraction in CancerGraph GNN.',
    evaluationFinding: 'Model loads successfully via tf_keras (requires TF_USE_LEGACY_KERAS=1). Produces 15 outputs while Dataset2 has 4 classes; class mapping investigation active.'
  },
  {
    id: 'oncosense-3d-unet',
    name: 'OncoSense-3D-UNet (brats_3d_unet_kaggle_best.keras)',
    cancerTypeId: 'glioma',
    category: 'Vision Models',
    task: 'Segmentation',
    requiredModalities: ['imaging'],
    version: '1.0.0 (BraTS 2021)',
    status: 'available_model',
    filePath: 'Research/Glioma/models/OncoSense-3D-UNet/brats_3d_unet_kaggle_best.keras',
    description: '3D Volumetric U-Net (~120 MB) trained on BraTS 2021 multi-parametric 3D MRI scans (T1, T1ce, T2, FLAIR) for tumor sub-region segmentation.',
    outputType: '3D Volumetric Tumor Segmentation Masks (Whole Tumor, Enhancing Tumor, Core)',
    architectureNotes: '3D Volumetric Convolutional U-Net Architecture',
    usefulnessNote: 'Category A priority candidate for 3D spatial region segmentation and radiomic volume extraction.',
    evaluationFinding: 'Model checkpoint obtained locally; setup pending for local volumetric inference benchmarking against Dataset4 (MU-Glioma-Post).'
  },
  {
    id: 'xception-brain-tumor-ref',
    name: 'Brain Tumor Classification Xception (Reference)',
    cancerTypeId: 'glioma',
    category: 'Vision Models',
    task: 'Classification',
    requiredModalities: ['imaging'],
    version: '1.0.0-inventory',
    status: 'registered',
    filePath: 'Research/Glioma/models/Glioma_Model_Inventory.txt',
    description: 'Kaggle inventory model utilizing depthwise separable convolutions (Xception architecture) for 2D MRI classification.',
    outputType: '4-Class Tumor Probabilities',
    architectureNotes: 'Xception Depthwise Separable CNN',
    usefulnessNote: 'Category C research reference model; set aside in favor of denseEfficient.h5 ensemble.',
    evaluationFinding: 'Inventory reference implementation.'
  },
  {
    id: 'glioma-multimodal-gnn-planned',
    name: 'Glioma Multimodal Graph Neural Network (GNN)',
    cancerTypeId: 'glioma',
    category: 'Graph Neural Networks (GNN)',
    task: 'Classification',
    requiredModalities: ['clinical', 'imaging', 'genomics'],
    version: 'Planned Architecture',
    status: 'planned_model',
    description: 'Heterogeneous GNN designed to connect patient clinical attributes, extracted imaging embeddings (3,200D vector), and TCGA genomic mutation profiles into unified graph nodes.',
    outputType: 'Multimodal Integrated Glioma Subtype & Risk Vector',
    architectureNotes: 'Heterogeneous Graph Transformer (HGT) / Graph Attention Network (GAT)',
    usefulnessNote: 'Planned core model in CancerGraph pipeline (scheduled following feature vector verification).',
    evaluationFinding: 'Architecture specified; GNN training scheduled after feature mapping validation.'
  },
  {
    id: 'glioma-clinical-cox-planned',
    name: 'Glioma Clinical Cox Survival Hazard Model',
    cancerTypeId: 'glioma',
    category: 'Clinical Feature Models',
    task: 'Risk Assessment',
    requiredModalities: ['clinical'],
    version: 'Planned Architecture',
    status: 'planned_model',
    description: 'Tabular clinical network evaluating Karnofsky Performance Score (KPS), age, and clinical presentation markers on Dataset1 (TCGA).',
    outputType: 'Survival Hazard Vector & Risk Stratification',
    architectureNotes: 'Multilayer Perceptron / Cox Proportional Hazards Neural Network',
    usefulnessNote: 'Planned baseline for tabular clinical feature integration.',
    evaluationFinding: 'Architecture specified; pipeline ready for Dataset1 tabular ingestion.'
  },

  // PLANNED MODELS FOR OTHER CANCERS (Phases 3–6)
  {
    id: 'breast-mammography-detector',
    name: 'Breast Mammography Lesion Detector (Planned)',
    cancerTypeId: 'breast',
    category: 'Vision Models',
    task: 'Detection',
    requiredModalities: ['imaging'],
    version: 'Phase 3 Target',
    status: 'coming_soon',
    description: 'Planned vision model for digital mammography lesion detection.',
    outputType: 'Bounding Boxes & BIRADS Category',
    architectureNotes: 'EfficientDet / ConvNeXt'
  },
  {
    id: 'lung-ct-nodule-analyzer',
    name: 'Lung CT Nodule Analyzer (Planned)',
    cancerTypeId: 'lung',
    category: 'Vision Models',
    task: 'Segmentation',
    requiredModalities: ['imaging'],
    version: 'Phase 4 Target',
    status: 'coming_soon',
    description: 'Planned thoracic CT 3D volumetric nodule segmenter.',
    outputType: '3D Nodule Mask & Malignancy Score',
    architectureNotes: '3D ResNet-UNet'
  },
  {
    id: 'liver-mri-ct-segmenter',
    name: 'Liver Lesion Segmenter (Planned)',
    cancerTypeId: 'liver',
    category: 'Vision Models',
    task: 'Segmentation',
    requiredModalities: ['imaging'],
    version: 'Phase 5 Target',
    status: 'coming_soon',
    description: 'Planned multi-phase CT and MRI liver lesion segmenter.',
    outputType: 'Volumetric Tumor Mask',
    architectureNotes: 'nnU-Net'
  },
  {
    id: 'prostate-mpmri-gleason-gnn',
    name: 'Prostate mpMRI Gleason GNN (Planned)',
    cancerTypeId: 'prostate',
    category: 'Graph Neural Networks (GNN)',
    task: 'Classification',
    requiredModalities: ['imaging', 'pathology'],
    version: 'Phase 6 Target',
    status: 'coming_soon',
    description: 'Planned spatial graph network connecting mpMRI localization with biopsy Gleason grades.',
    outputType: 'Gleason Grade Group',
    architectureNotes: 'Spatial Graph Neural Network'
  }
];

export const getModelsByCancerId = (cancerId: string): ModelDefinition[] => {
  return MODEL_REGISTRY.filter(m => m.cancerTypeId === cancerId);
};
