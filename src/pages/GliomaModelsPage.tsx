import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { CancerSubNav } from '../components/layout/CancerSubNav';
import { MODEL_REGISTRY } from '../config/models';
import { ModalityBadge } from '../components/common/ModalityBadge';
import { Cpu, FileCode, CheckCircle2, Clock, AlertTriangle, Layers } from 'lucide-react';

export const GliomaModelsPage: React.FC = () => {
  const gliomaModels = MODEL_REGISTRY.filter(m => m.cancerTypeId === 'glioma');

  return (
    <div>
      <CancerSubNav cancerType="glioma" />
      <SectionHeader 
        title="Glioma Pretrained Models & Inventory"
        description="Empirical model inventory and local model files stored under Research/Glioma/models/ for 2D slice feature extraction and 3D volumetric segmentation."
        badgeText="Pretrained Model Inventory"
      />

      <div style={styles.grid}>
        {gliomaModels.map(model => {
          const isUnderEvaluation = model.status === 'under_evaluation';
          const isAvailable = model.status === 'available_model';
          const isPlanned = model.status === 'planned_model';

          let statusText = 'REGISTERED REFERENCE';
          let statusBg = '#E2E8F0';
          let statusColor = '#475569';
          let StatusIcon = Layers;

          if (isUnderEvaluation) {
            statusText = 'UNDER EVALUATION';
            statusBg = '#FEF3C7';
            statusColor = '#92400E';
            StatusIcon = AlertTriangle;
          } else if (isAvailable) {
            statusText = 'AVAILABLE MODEL';
            statusBg = '#D1FAE5';
            statusColor = '#065F46';
            StatusIcon = CheckCircle2;
          } else if (isPlanned) {
            statusText = 'PLANNED MODEL';
            statusBg = '#E0E7FF';
            statusColor = '#3730A3';
            StatusIcon = Clock;
          }

          return (
            <div key={model.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.headerTitleRow}>
                  <Cpu size={18} color="var(--royal-blue)" />
                  <h3 style={styles.cardTitle}>{model.name}</h3>
                </div>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: statusBg,
                  color: statusColor
                }}>
                  <StatusIcon size={12} />
                  <span>{statusText}</span>
                </span>
              </div>

              <p style={styles.description}>{model.description}</p>

              {/* File Path if local file exists */}
              {model.filePath && (
                <div style={styles.pathBox}>
                  <FileCode size={14} color="var(--cool-gray)" />
                  <span style={styles.pathText}>{model.filePath}</span>
                </div>
              )}

              {/* Required Modalities */}
              <div style={styles.metaSection}>
                <span style={styles.metaLabel}>Input Modality:</span>
                <div style={styles.badgeRow}>
                  {model.requiredModalities.map(mod => (
                    <ModalityBadge key={mod} modality={mod} />
                  ))}
                </div>
              </div>

              {/* Architecture & Output */}
              <div style={styles.archBox}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={styles.boxLabel}>Architecture:</span>
                  <span style={styles.boxVal}>{model.architectureNotes}</span>
                </div>
                <div>
                  <span style={styles.boxLabel}>Output Type:</span>
                  <span style={styles.boxVal}>{model.outputType}</span>
                </div>
              </div>

              {/* Usefulness Note */}
              {model.usefulnessNote && (
                <div style={styles.usefulnessBox}>
                  <strong>Current Usefulness:</strong> {model.usefulnessNote}
                </div>
              )}

              {/* Evaluation Finding */}
              {model.evaluationFinding && (
                <div style={{
                  ...styles.findingBox,
                  borderColor: isUnderEvaluation ? '#F59E0B' : '#10B981'
                }}>
                  <strong>Evaluation Status / Finding:</strong> {model.evaluationFinding}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
    gap: '24px'
  },
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px'
  },
  headerTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  cardTitle: {
    fontSize: '1.05rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.68rem',
    fontWeight: 800,
    padding: '4px 10px',
    borderRadius: '12px',
    letterSpacing: '0.04em',
    whiteSpace: 'nowrap'
  },
  description: {
    fontSize: '0.85rem',
    color: 'var(--dark-text)',
    lineHeight: 1.55
  },
  pathBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border-subtle)',
    padding: '8px 12px',
    borderRadius: 'var(--radius-md)'
  },
  pathText: {
    fontSize: '0.78rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--dark-muted)'
  },
  metaSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  metaLabel: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--cool-gray)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
  },
  badgeRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  archBox: {
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '12px 14px'
  },
  boxLabel: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    marginRight: '6px'
  },
  boxVal: {
    fontSize: '0.78rem',
    color: 'var(--dark-muted)'
  },
  usefulnessBox: {
    backgroundColor: '#EFF6FF',
    border: '1px solid #BFDBFE',
    borderRadius: 'var(--radius-md)',
    padding: '10px 14px',
    fontSize: '0.8rem',
    color: '#1E40AF',
    lineHeight: 1.5
  },
  findingBox: {
    backgroundColor: '#FFFBEB',
    border: '1px solid #FCD34D',
    borderRadius: 'var(--radius-md)',
    padding: '10px 14px',
    fontSize: '0.8rem',
    color: '#92400E',
    lineHeight: 1.5
  }
};
