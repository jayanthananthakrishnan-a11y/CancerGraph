import precomputedData from '../../research/experiments/precomputed_ui_data.json';

export interface ExperimentRecord {
  experiment_id: string;
  description: string;
  source_dataset: string;
  source_modality: string;
  target_dataset: string;
  target_modality: string;
  target_only_baseline: {
    metrics: {
      accuracy: number;
      precision: number;
      recall: number;
      f1: number;
      roc_auc: number;
    };
    runtime_seconds: number;
  };
  transfer_results: {
    transfer_method: string;
    metrics: {
      accuracy: number;
      precision: number;
      recall: number;
      f1: number;
      roc_auc: number;
    };
    runtime_seconds: number;
  };
  metric_deltas: {
    accuracy: number;
    f1: number;
    roc_auc: number;
    precision: number;
    recall: number;
  };
  cross_modal_similarity?: {
    discriminant_cosine_similarity: number;
    separability_ratio: number;
  };
  sample_counts: {
    source_samples: number;
    target_samples: number;
  };
}

export const getBreastCancerData = () => {
  return {
    experiments: precomputedData.experiments as ExperimentRecord[],
    baseline_summary: precomputedData.baseline_summary,
    wdbc_correlations: precomputedData.wdbc_correlations,
    coimbra_correlations: precomputedData.coimbra_correlations
  };
};
