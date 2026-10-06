export type ModalityCategory = 'imaging' | 'clinical' | 'genomics' | 'pathology' | 'radiomics';

export interface SubModality {
  id: string;
  name: string;
  description: string;
}

export interface ModalityDefinition {
  id: ModalityCategory;
  name: string;
  category: ModalityCategory;
  description: string;
  subtypes: SubModality[];
  typicalFeatures: string[];
  badgeColor: 'cyan' | 'royal' | 'violet' | 'lavender' | 'gray';
}
