import type { CancerModule } from '../types/cancer';

export const CANCER_REGISTRY: CancerModule[] = [
  {
    id: 'glioma',
    name: 'Glioma Research Target',
    scientificName: 'Glioblastoma Multiforme (GBM) & Low-Grade Gliomas (LGG)',
    icdCode: 'ICD-11: 2A00',
    description: 'Primary central nervous system tumors. Active focal research target for CancerGraph multimodal feature extraction, 3D segmentation, empirical evaluation, and patient GNN modeling.',
    anatomicalSite: 'Brain / Central Nervous System',
    supportedModalities: ['clinical', 'imaging', 'genomics', 'radiomics'],
    targetCapabilities: ['Detection', 'Classification', 'Segmentation', 'Feature Extraction', 'Risk Assessment'],
    phase: 1,
    status: 'active_target',
    primaryTargetPhase: 'Active Research Primary Target',
    badgeText: 'Primary Research Target'
  },
  {
    id: 'breast',
    name: 'Breast Cancer (Planned)',
    scientificName: 'Invasive Ductal & Lobular Carcinoma',
    icdCode: 'ICD-11: 2C60',
    description: 'Planned research domain for mammography, histopathology whole slide images, and PAM50 genomic expression profiles.',
    anatomicalSite: 'Breast Tissue & Axillary Nodes',
    supportedModalities: ['clinical', 'imaging', 'pathology', 'genomics'],
    targetCapabilities: ['Detection', 'Classification', 'Risk Assessment'],
    phase: 3,
    status: 'planned',
    primaryTargetPhase: 'Phase 3 Research Target',
    badgeText: 'Planned (Phase 3)'
  },
  {
    id: 'lung',
    name: 'Lung Cancer (Planned)',
    scientificName: 'Non-Small Cell & Small Cell Lung Carcinoma',
    icdCode: 'ICD-11: 2C25',
    description: 'Planned research domain for low-dose volumetric chest CT imaging, clinical biomarkers, and EGFR/KRAS mutation profiling.',
    anatomicalSite: 'Lungs & Pulmonary System',
    supportedModalities: ['clinical', 'imaging', 'radiomics', 'genomics'],
    targetCapabilities: ['Detection', 'Classification', 'Risk Assessment'],
    phase: 4,
    status: 'planned',
    primaryTargetPhase: 'Phase 4 Research Target',
    badgeText: 'Planned (Phase 4)'
  },
  {
    id: 'liver',
    name: 'Liver Cancer (Planned)',
    scientificName: 'Hepatocellular Carcinoma & Cholangiocarcinoma',
    icdCode: 'ICD-11: 2C12',
    description: 'Planned research domain for multi-phase contrast CT and DCE-MRI liver tumor localization.',
    anatomicalSite: 'Liver & Biliary System',
    supportedModalities: ['clinical', 'imaging', 'pathology', 'radiomics'],
    targetCapabilities: ['Detection', 'Classification', 'Segmentation'],
    phase: 5,
    status: 'planned',
    primaryTargetPhase: 'Phase 5 Research Target',
    badgeText: 'Planned (Phase 5)'
  },
  {
    id: 'prostate',
    name: 'Prostate Cancer (Planned)',
    scientificName: 'Prostate Adenocarcinoma',
    icdCode: 'ICD-11: 2C82',
    description: 'Planned research domain for multiparametric MRI (mpMRI), biopsy Gleason scoring, and PSA clinical metrics.',
    anatomicalSite: 'Prostate Gland',
    supportedModalities: ['clinical', 'imaging', 'pathology', 'genomics'],
    targetCapabilities: ['Detection', 'Classification', 'Risk Assessment'],
    phase: 6,
    status: 'planned',
    primaryTargetPhase: 'Phase 6 Research Target',
    badgeText: 'Planned (Phase 6)'
  }
];

export const getCancerById = (id: string): CancerModule | undefined => {
  return CANCER_REGISTRY.find(c => c.id === id);
};
