import type { DatasetDefinition } from '../types/dataset';

export const DATASET_REGISTRY: DatasetDefinition[] = [
  // GLIOMA REAL DATASETS (Research/Glioma/datasets/)
  {
    id: 'dataset-1-tcga',
    title: 'Dataset1: TCGA-GBM & TCGA-LGG Cohort',
    cancerTypeId: 'glioma',
    modalitiesProvided: ['clinical', 'genomics'],
    accessType: 'Open Access',
    targetTasks: ['Classification', 'Risk Assessment'],
    status: 'available_locally',
    locationPath: 'Research/Glioma/datasets/Dataset1',
    description: 'Clinical profiles paired with tabular genomic mutation vectors for Glioblastoma Multiforme (GBM) and Lower Grade Glioma (LGG). Available locally for clinical risk and biomarker modeling.',
    evaluationNote: 'Dataset available locally; target for clinical Cox proportional hazards and IDH mutation stratification.',
    modalityDetails: {
      clinical: ['Karnofsky Performance Score (KPS)', 'Age at Diagnosis', 'Overall Survival (months)', 'Therapeutic History'],
      genomics: ['IDH1/2 Mutation Status', '1p/19q Codeletion', 'MGMT Promoter Methylation', 'TP53 / ATRX Mutations']
    }
  },
  {
    id: 'dataset-2-kaggle-4class',
    title: 'Dataset2: Kaggle 4-Class Brain MRI Dataset',
    cancerTypeId: 'glioma',
    modalitiesProvided: ['imaging'],
    accessType: 'Open Access',
    targetTasks: ['Classification', 'Feature Extraction'],
    status: 'under_evaluation',
    locationPath: 'Research/Glioma/datasets/Dataset2',
    description: '7,200 2D JPEG axial brain MRI slices (5,600 training, 1,600 testing) structured across 4 category subfolders: glioma, meningioma, notumor, pituitary. Evaluated against denseEfficient.h5.',
    evaluationNote: 'Model loading and inference verified. Output produces 15 softmax probabilities; 15-to-4 class mapping investigation currently active.',
    modalityDetails: {
      imaging: [
        '7,200 2D JPEG Slice Images',
        'Training Split: 5,600 images (1,400 per class)',
        'Testing Split: 1,600 images (400 per class)',
        'Class Subfolders: glioma, meningioma, notumor, pituitary'
      ]
    }
  },
  {
    id: 'dataset-3-binary-mri',
    title: 'Dataset3: Binary Brain Tumor MRI Dataset',
    cancerTypeId: 'glioma',
    modalitiesProvided: ['imaging'],
    accessType: 'Open Access',
    targetTasks: ['Detection'],
    status: 'available_locally',
    locationPath: 'Research/Glioma/datasets/Dataset3',
    description: '2D Brain MRI slice dataset organized into binary classification folders (Brain Tumor vs Healthy / No Tumor). Available locally for baseline tumor screening.',
    evaluationNote: 'Dataset present on disk; useful for binary presence/absence tumor screening baseline.',
    modalityDetails: {
      imaging: ['2D Axial Brain MRI Slices', 'Binary Category Labels (Tumor / Healthy)']
    }
  },
  {
    id: 'dataset-4-mu-glioma-post',
    title: 'Dataset4: MU-Glioma-Post Post-Operative Cohort',
    cancerTypeId: 'glioma',
    modalitiesProvided: ['imaging', 'clinical'],
    accessType: 'Institutional',
    targetTasks: ['Segmentation', 'Risk Assessment'],
    status: 'under_evaluation',
    locationPath: 'Research/Glioma/datasets/Dataset4_MU-Glioma-Post',
    description: 'Post-operative clinical measurements paired with 3D volumetric multi-parametric brain MRI scans for longitudinal tracking and resection volume evaluation.',
    evaluationNote: 'Selected as local validation dataset for 3D U-Net (OncoSense-3D-UNet) volumetric segmentation.',
    modalityDetails: {
      imaging: ['Volumetric 3D Multi-sequence MRI (T1, T1ce, T2, FLAIR)'],
      clinical: ['Post-operative Resection Status', 'Residual Tumor Volume', 'Longitudinal Survival Metrics']
    }
  },

  // PLANNED DOMAIN DATASETS (Phases 3–6)
  {
    id: 'breast-imaging-pathology-cohort',
    title: 'Breast Mammography & Histopathology Cohort (Planned)',
    cancerTypeId: 'breast',
    modalitiesProvided: ['clinical', 'imaging', 'pathology'],
    accessType: 'Open Access',
    targetTasks: ['Detection', 'Classification'],
    status: 'planned',
    description: 'Planned research dataset schema pairing full-field digital mammograms with core biopsy histopathology whole slide images.',
    modalityDetails: {
      imaging: ['Digital Mammography', 'Ultrasound'],
      pathology: ['Core Biopsy H&E Slide Scans']
    }
  },
  {
    id: 'thoracic-ct-genomic-registry',
    title: 'Thoracic CT & Genomic Lung Cohort (Planned)',
    cancerTypeId: 'lung',
    modalitiesProvided: ['clinical', 'imaging', 'genomics'],
    accessType: 'Institutional',
    targetTasks: ['Nodule Detection', 'Risk Assessment'],
    status: 'planned',
    description: 'Planned dataset schema for low-dose volumetric chest CT scans paired with EGFR/KRAS mutation profiles.',
    modalityDetails: {
      imaging: ['Volumetric Low-Dose Chest CT'],
      genomics: ['EGFR / KRAS / ALK Variants']
    }
  },
  {
    id: 'hepatic-ct-mri-cohort',
    title: 'Hepatic Multi-Phase CT & MRI Cohort (Planned)',
    cancerTypeId: 'liver',
    modalitiesProvided: ['clinical', 'imaging'],
    accessType: 'Controlled Access',
    targetTasks: ['Lesion Segmentation'],
    status: 'planned',
    description: 'Planned dataset schema for multiphase contrast CT and DCE-MRI liver lesion segmentation.',
    modalityDetails: {
      imaging: ['Triple-Phase Contrast CT', 'Gadoxetic Acid DCE-MRI']
    }
  },
  {
    id: 'prostate-mpmri-biopsy-cohort',
    title: 'Prostate mpMRI & Biopsy Registry (Planned)',
    cancerTypeId: 'prostate',
    modalitiesProvided: ['clinical', 'imaging', 'pathology'],
    accessType: 'Open Access',
    targetTasks: ['Classification', 'Risk Assessment'],
    status: 'planned',
    description: 'Planned dataset schema pairing multiparametric MRI (T2W, DWI, DCE) with systematic core biopsy Gleason scores.',
    modalityDetails: {
      imaging: ['T2W', 'DWI', 'DCE mpMRI'],
      pathology: ['Systematic Biopsy Core Histology']
    }
  }
];

export const getDatasetsByCancerId = (cancerId: string): DatasetDefinition[] => {
  return DATASET_REGISTRY.filter(d => d.cancerTypeId === cancerId);
};
