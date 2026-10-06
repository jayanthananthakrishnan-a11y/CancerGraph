import type { ModalityDefinition } from '../types/modality';

export const MODALITY_REGISTRY: ModalityDefinition[] = [
  {
    id: 'imaging',
    name: 'Imaging Modality',
    category: 'imaging',
    description: 'Visual medical diagnostic data including spatial scans and histological imaging slices.',
    subtypes: [
      { id: 'mri', name: 'Magnetic Resonance Imaging (MRI)', description: 'Multi-parametric structural MRI (T1, T1Gd, T2, FLAIR).' },
      { id: 'ct', name: 'Computed Tomography (CT)', description: 'High-resolution cross-sectional anatomical scans.' },
      { id: 'xray', name: 'Radiography (X-Ray)', description: 'Diagnostic projectional radiography.' },
      { id: 'histo', name: 'Histopathology Images', description: 'Whole slide tissue section micro-photographs.' },
      { id: 'ultrasound', name: 'Ultrasound (US)', description: 'Sonographic acoustic anatomical imaging.' }
    ],
    typicalFeatures: ['Spatial Intensity', 'Tissue Contrast', 'Structural Boundaries', 'Vascular Enhancement'],
    badgeColor: 'cyan'
  },
  {
    id: 'clinical',
    name: 'Clinical Modality',
    category: 'clinical',
    description: 'Structured patient health records, laboratory values, demographic factors, and disease history.',
    subtypes: [
      { id: 'demographics', name: 'Demographics & Vitals', description: 'Age, biological sex, BMI, baseline physical status.' },
      { id: 'labs', name: 'Laboratory Panels', description: 'Blood chemistry, hematology, liver/kidney enzyme biomarkers.' },
      { id: 'history', name: 'Clinical History', description: 'Symptom duration, comorbidities, prior therapies, performance status.' }
    ],
    typicalFeatures: ['Patient Age', 'Karnofsky Score', 'Serum Biomarkers', 'Comorbid Index'],
    badgeColor: 'royal'
  },
  {
    id: 'genomics',
    name: 'Genomics & Omics',
    category: 'genomics',
    description: 'Molecular profiles, gene expression arrays, somatic mutation panels, and transcriptomics.',
    subtypes: [
      { id: 'rna_seq', name: 'RNA Sequencing (RNA-Seq)', description: 'Quantitative transcriptomic gene expression levels.' },
      { id: 'dna_mutations', name: 'Somatic Mutations', description: 'Point mutations, insertions/deletions, IDH1/2 & TP53 status.' },
      { id: 'methylation', name: 'DNA Methylation', description: 'Epigenetic promoter methylation state (e.g. MGMT).' }
    ],
    typicalFeatures: ['IDH Mutation Status', 'MGMT Promoter Methylation', '1p/19q Co-deletion', 'Gene Expression Vectors'],
    badgeColor: 'violet'
  },
  {
    id: 'pathology',
    name: 'Digital Pathology',
    category: 'pathology',
    description: 'Microscopic examination of tissue biopsies, histological tumor grading, and cell morphology.',
    subtypes: [
      { id: 'wsi', name: 'Whole Slide Images (WSI)', description: 'Ultra-high-resolution gigapixel tissue section scans.' },
      { id: 'grading', name: 'Histological Grading', description: 'Standardized pathological grading & cellular atypia assessment.' }
    ],
    typicalFeatures: ['Cell Density', 'Mitotic Rate', 'Microvascular Proliferation', 'Necrosis Index'],
    badgeColor: 'lavender'
  },
  {
    id: 'radiomics',
    name: 'Radiomics Modality',
    category: 'radiomics',
    description: 'High-dimensional quantitative features extracted from medical images using mathematical algorithms.',
    subtypes: [
      { id: 'texture', name: 'Texture Analysis', description: 'Gray-level co-occurrence matrix (GLCM) & run-length metrics.' },
      { id: 'shape', name: 'Shape & Geometry', description: 'Tumor volume, sphericity, surface area to volume ratio.' },
      { id: 'intensity', name: 'First-Order Statistics', description: 'Voxel intensity histogram mean, skewness, kurtosis.' }
    ],
    typicalFeatures: ['Sphericity', 'GLCM Energy', 'Intensity Variance', 'Boundary Irregularity'],
    badgeColor: 'gray'
  }
];

export const getModalityById = (id: string): ModalityDefinition | undefined => {
  return MODALITY_REGISTRY.find(m => m.id === id);
};
