import type { CancerId } from './cancer';
import type { ModalityCategory } from './modality';

export type ModelCategory = 
  | 'Vision Models'
  | 'Clinical Feature Models'
  | 'Genomic Models'
  | 'Radiomics Models'
  | 'Graph Neural Networks (GNN)'
  | 'Hybrid Models'
  | 'Multimodal Fusion Models';

export type AnalysisTask = 'Detection' | 'Classification' | 'Localization' | 'Segmentation' | 'Risk Assessment';

export interface ModelDefinition {
  id: string;
  name: string;
  cancerTypeId: CancerId;
  category: ModelCategory;
  task: AnalysisTask;
  requiredModalities: ModalityCategory[];
  version: string;
  status: 'available_model' | 'under_evaluation' | 'planned_model' | 'registered' | 'coming_soon' | 'archived';
  filePath?: string;
  usefulnessNote?: string;
  evaluationFinding?: string;
  description: string;
  outputType: string;
  architectureNotes: string;
}

export interface CompatibilityResult {
  model: ModelDefinition;
  isCompatible: boolean;
  missingModalities: ModalityCategory[];
  matchPercentage: number;
  reason: string;
}
