import type { CancerId } from './cancer';
import type { ModalityCategory } from './modality';

export interface DatasetDefinition {
  id: string;
  title: string;
  cancerTypeId: CancerId;
  modalitiesProvided: ModalityCategory[];
  accessType: 'Open Access' | 'Controlled Access' | 'Institutional';
  targetTasks: string[];
  status: 'available_locally' | 'under_evaluation' | 'planned' | 'registered_placeholder' | 'awaiting_integration';
  locationPath?: string;
  evaluationNote?: string;
  description: string;
  modalityDetails: {
    imaging?: string[];
    clinical?: string[];
    genomics?: string[];
    pathology?: string[];
    radiomics?: string[];
  };
}
