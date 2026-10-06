import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { CANCER_REGISTRY } from '../config/cancers';
import { DATASET_REGISTRY } from '../config/datasets';
import { MODEL_REGISTRY } from '../config/models';
import { ModalitySelector } from '../components/common/ModalitySelector';
import { evaluateModelCompatibility } from '../services/modalityEngine';
import type { ModalityCategory } from '../types/modality';
import { EmptyState } from '../components/common/EmptyState';
import { Play, Settings } from 'lucide-react';

export const ExperimentsPage: React.FC = () => {
  const [selectedCancer, setSelectedCancer] = useState<string>('glioma');
  const [selectedDataset, setSelectedDataset] = useState<string>('glioma-multimodal-registry');
  const [activeModalities, setActiveModalities] = useState<ModalityCategory[]>([
    'clinical', 'imaging', 'genomics'
  ]);
  const [selectedModelId, setSelectedModelId] = useState<string>('glioma-clinical-mri-fusion');
  const [fusionStrategy, setFusionStrategy] = useState<'Early Fusion' | 'Late Fusion' | 'Intermediate Graph Fusion'>('Intermediate Graph Fusion');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const availableModels = MODEL_REGISTRY.filter(m => !selectedCancer || m.cancerTypeId === selectedCancer);
  const evaluatedModels = availableModels.map(m => evaluateModelCompatibility(activeModalities, m));
  const compatibleModels = evaluatedModels.filter(e => e.isCompatible);

  const availableDatasets = DATASET_REGISTRY.filter(d => !selectedCancer || d.cancerTypeId === selectedCancer);

  return (
    <div>
      <SectionHeader 
        title="Experiment Workspace Architecture"
        description="Configure multimodal training and inference experiments by pairing dataset cohorts, available input modalities, and compatible model architectures."
        badgeText="Research Shell"
      />

      <div style={styles.grid}>
        {/* Left Column: Configurator Panel */}
        <div style={styles.configCard}>
          <div style={styles.cardHeader}>
            <Settings size={18} color="var(--royal-blue)" />
            <h3 style={styles.cardTitle}>Experiment Configuration Builder</h3>
          </div>

          {/* Step 1: Cancer Target */}
          <div style={styles.stepBox}>
            <label style={styles.label}>1. Select Target Cancer Module</label>
            <select 
              value={selectedCancer}
              onChange={(e) => {
                setSelectedCancer(e.target.value);
                const ds = DATASET_REGISTRY.find(d => d.cancerTypeId === e.target.value);
                if (ds) setSelectedDataset(ds.id);
                setIsSubmitted(false);
              }}
              style={styles.select}
            >
              {CANCER_REGISTRY.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.badgeText})</option>
              ))}
            </select>
          </div>

          {/* Step 2: Dataset Selection */}
          <div style={styles.stepBox}>
            <label style={styles.label}>2. Select Research Dataset Schema</label>
            <select 
              value={selectedDataset}
              onChange={(e) => {
                setSelectedDataset(e.target.value);
                setIsSubmitted(false);
              }}
              style={styles.select}
            >
              {availableDatasets.map(d => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </select>
          </div>

          {/* Step 3: Modality Selection */}
          <div style={styles.stepBox}>
            <label style={styles.label}>3. Select Available Input Modalities</label>
            <ModalitySelector 
              selectedModalities={activeModalities}
              onChange={(m) => {
                setActiveModalities(m);
                setIsSubmitted(false);
              }}
            />
          </div>

          {/* Step 4: Model Architecture Selection */}
          <div style={styles.stepBox}>
            <label style={styles.label}>4. Select Compatible Model Architecture</label>
            {compatibleModels.length > 0 ? (
              <select 
                value={selectedModelId}
                onChange={(e) => {
                  setSelectedModelId(e.target.value);
                  setIsSubmitted(false);
                }}
                style={styles.select}
              >
                {compatibleModels.map(item => (
                  <option key={item.model.id} value={item.model.id}>
                    {item.model.name} — {item.model.category}
                  </option>
                ))}
              </select>
            ) : (
              <div style={styles.errorPill}>
                No compatible models for the selected modalities ({activeModalities.join(', ')}). Enable missing required modalities above.
              </div>
            )}
          </div>

          {/* Step 5: Hyperparameters */}
          <div style={styles.stepBox}>
            <label style={styles.label}>5. Multimodal Fusion Strategy</label>
            <select 
              value={fusionStrategy}
              onChange={(e) => setFusionStrategy(e.target.value as any)}
              style={styles.select}
            >
              <option value="Intermediate Graph Fusion">Intermediate Graph Fusion (GNN)</option>
              <option value="Early Fusion">Early Concatenation Fusion</option>
              <option value="Late Fusion">Late Decision Fusion</option>
            </select>
          </div>

          <button 
            className="btn btn-violet"
            style={{ width: '100%', marginTop: '12px' }}
            disabled={compatibleModels.length === 0}
            onClick={() => setIsSubmitted(true)}
          >
            <Play size={16} />
            <span>Initialize Experiment Execution Workspace</span>
          </button>
        </div>

        {/* Right Column: Execution Workspace / Status */}
        <div>
          {isSubmitted ? (
            <div style={styles.executionCard}>
              <div style={styles.execHeader}>
                <div style={styles.badgeRow}>
                  <span className="badge badge-violet">Experiment Initialized</span>
                  <span style={styles.execId}>EXP-ARCH-{Date.now().toString().slice(-4)}</span>
                </div>
                <h3 style={styles.execTitle}>Multimodal Experiment Workspace Active</h3>
              </div>

              <div style={styles.summaryGrid}>
                <div style={styles.summaryItem}>
                  <span style={styles.sumLabel}>Cancer Module</span>
                  <span style={styles.sumVal}>{CANCER_REGISTRY.find(c => c.id === selectedCancer)?.name}</span>
                </div>
                <div style={styles.summaryItem}>
                  <span style={styles.sumLabel}>Active Modalities</span>
                  <span style={styles.sumVal}>{activeModalities.join(', ').toUpperCase()}</span>
                </div>
                <div style={styles.summaryItem}>
                  <span style={styles.sumLabel}>Model Architecture</span>
                  <span style={styles.sumVal}>{MODEL_REGISTRY.find(m => m.id === selectedModelId)?.name}</span>
                </div>
                <div style={styles.summaryItem}>
                  <span style={styles.sumLabel}>Fusion Layer</span>
                  <span style={styles.sumVal}>{fusionStrategy}</span>
                </div>
              </div>

              <EmptyState 
                title="Experiment Pipeline Ready for ML Execution"
                description="The architecture for experiment parameterization, modality fusion, and loss tracking is configured. Real inference and training runs will connect in Phase 2+."
                icon="experiment"
                targetPhaseNote="ML Training & Inference Engine Integration Pending"
              />
            </div>
          ) : (
            <EmptyState 
              title="Experiment Workspace Awaiting Initialization"
              description="Configure the cancer target, dataset, active modalities, and model architecture on the left, then click 'Initialize Experiment' to inspect the execution pipeline."
              icon="experiment"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.1fr',
    gap: '24px',
    alignItems: 'flex-start'
  },
  configCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: 'var(--shadow-sm)'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-subtle)'
  },
  cardTitle: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  stepBox: {
    marginBottom: '18px'
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    marginBottom: '6px',
    display: 'block'
  },
  select: {
    width: '100%',
    padding: '9px 12px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--cool-white)',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--dark-text)',
    outline: 'none'
  },
  errorPill: {
    padding: '10px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: '#FEF2F2',
    border: '1px solid #FCA5A5',
    color: '#991B1B',
    fontSize: '0.78rem'
  },
  executionCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: 'var(--shadow-sm)'
  },
  execHeader: {
    marginBottom: '20px'
  },
  badgeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px'
  },
  execId: {
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--cool-gray)'
  },
  execTitle: {
    fontSize: '1.2rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    backgroundColor: 'var(--cool-white)',
    padding: '16px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-subtle)',
    marginBottom: '20px'
  },
  summaryItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  sumLabel: {
    fontSize: '0.7rem',
    color: 'var(--cool-gray)',
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  sumVal: {
    fontSize: '0.88rem',
    fontWeight: 700,
    color: 'var(--dark-text)',
    marginTop: '2px'
  }
};
