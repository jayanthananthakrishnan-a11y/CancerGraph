import type { ModalityCategory } from '../types/modality';
import type { ModelDefinition, CompatibilityResult } from '../types/model';
import { MODEL_REGISTRY } from '../config/models';

/**
 * Evaluates whether a specific model can execute given a set of active/available patient modalities.
 */
export function evaluateModelCompatibility(
  availableModalities: ModalityCategory[],
  model: ModelDefinition
): CompatibilityResult {
  const missingModalities = model.requiredModalities.filter(
    req => !availableModalities.includes(req)
  );

  const isCompatible = missingModalities.length === 0;

  let reason = '';
  if (isCompatible) {
    reason = `All ${model.requiredModalities.length} required modalities present (${model.requiredModalities.join(', ')})`;
  } else {
    reason = `Disabled: Missing required input modality (${missingModalities.map(m => m.toUpperCase()).join(', ')})`;
  }

  const matchedCount = model.requiredModalities.length - missingModalities.length;
  const matchPercentage = Math.round((matchedCount / model.requiredModalities.length) * 100);

  return {
    model,
    isCompatible,
    missingModalities,
    matchPercentage,
    reason
  };
}

/**
 * Calculates compatibility for all models associated with a specific cancer type.
 */
export function getCompatibleModelsForCancer(
  cancerId: string,
  availableModalities: ModalityCategory[]
): CompatibilityResult[] {
  const models = MODEL_REGISTRY.filter(m => m.cancerTypeId === cancerId);
  return models.map(model => evaluateModelCompatibility(availableModalities, model));
}

/**
 * Filters the global model registry by active modalities across all cancers or a specific cancer.
 */
export function filterModelsByAvailability(
  models: ModelDefinition[],
  availableModalities: ModalityCategory[]
): { compatible: ModelDefinition[]; incompatible: CompatibilityResult[] } {
  const results = models.map(m => evaluateModelCompatibility(availableModalities, m));
  return {
    compatible: results.filter(r => r.isCompatible).map(r => r.model),
    incompatible: results.filter(r => !r.isCompatible)
  };
}
