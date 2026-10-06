import type { CancerId } from './cancer';
import type { ModalityCategory } from './modality';

export interface ExperimentConfig {
  id?: string;
  name: string;
  cancerTypeId: CancerId | '';
  datasetId: string;
  selectedModalities: ModalityCategory[];
  selectedModelId: string;
  parameters: {
    fusionStrategy?: 'Early Fusion' | 'Late Fusion' | 'Intermediate Graph Fusion';
    graphConstructionType?: 'K-Nearest Neighbors' | 'Feature Similarity' | 'Patient Interaction Graph';
  };
}
