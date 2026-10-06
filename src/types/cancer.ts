export type CancerId = 'glioma' | 'breast' | 'lung' | 'liver' | 'prostate';

export interface CancerModule {
  id: CancerId;
  name: string;
  scientificName: string;
  icdCode?: string;
  description: string;
  anatomicalSite: string;
  supportedModalities: string[]; // Modality IDs
  targetCapabilities: string[]; // Detection, Classification, Localization, Segmentation, Risk Assessment
  phase: number;
  status: 'active_target' | 'planned';
  primaryTargetPhase: string;
  badgeText: string;
}
