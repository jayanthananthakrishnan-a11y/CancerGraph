import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { CancerSubNav } from '../components/layout/CancerSubNav';
import { DATASET_REGISTRY } from '../config/datasets';
import { ModalityBadge } from '../components/common/ModalityBadge';
import { Folder, Database, HardDrive, CheckCircle2, AlertTriangle } from 'lucide-react';

export const GliomaDatasetsPage: React.FC = () => {
  const gliomaDatasets = DATASET_REGISTRY.filter(d => d.cancerTypeId === 'glioma');

  return (
    <div>
      <CancerSubNav cancerType="glioma" />
      <SectionHeader 
        title="Glioma Research Datasets"
        description="Authentic local datasets collected under Research/Glioma/datasets/ for clinical tabular risk modeling, 2D slice feature extraction, and 3D volumetric segmentation."
        badgeText="Verified Local Assets"
      />

      <div style={styles.infoBanner}>
        <Database size={20} color="#6C5CE7" />
        <div style={{ flex: 1 }}>
          <h4 style={styles.infoTitle}>Actual Project Datasets Inventory</h4>
          <p style={styles.infoText}>
            All datasets listed below exist on local disk under <code>Research/Glioma/datasets/</code>. No fake or placeholder datasets are displayed.
          </p>
        </div>
      </div>

      <div style={styles.grid}>
        {gliomaDatasets.map(ds => {
          const isUnderEvaluation = ds.status === 'under_evaluation';

          return (
            <div key={ds.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.headerTitleRow}>
                  <Folder size={18} color="var(--royal-blue)" />
                  <h3 style={styles.cardTitle}>{ds.title}</h3>
                </div>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: isUnderEvaluation ? '#FEF3C7' : '#D1FAE5',
                  color: isUnderEvaluation ? '#92400E' : '#065F46'
                }}>
                  {isUnderEvaluation ? (
                    <>
                      <AlertTriangle size={12} />
                      <span>IN EVALUATION</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={12} />
                      <span>AVAILABLE LOCALLY</span>
                    </>
                  )}
                </span>
              </div>

              <p style={styles.description}>{ds.description}</p>

              {/* Location Path */}
              {ds.locationPath && (
                <div style={styles.pathBox}>
                  <HardDrive size={14} color="var(--cool-gray)" />
                  <span style={styles.pathText}>{ds.locationPath}</span>
                </div>
              )}

              {/* Modality Badges */}
              <div style={styles.modalitySection}>
                <span style={styles.metaLabel}>Provided Modalities:</span>
                <div style={styles.badgeRow}>
                  {ds.modalitiesProvided.map(mod => (
                    <ModalityBadge key={mod} modality={mod} />
                  ))}
                </div>
              </div>

              {/* Target Tasks */}
              <div style={styles.taskSection}>
                <span style={styles.metaLabel}>Research Purpose / Tasks:</span>
                <div style={styles.taskBadges}>
                  {ds.targetTasks.map(task => (
                    <span key={task} style={styles.taskBadge}>{task}</span>
                  ))}
                </div>
              </div>

              {/* Evaluation Note */}
              {ds.evaluationNote && (
                <div style={styles.noteBox}>
                  <strong>Evaluation Status:</strong> {ds.evaluationNote}
                </div>
              )}

              {/* Detailed Breakdown */}
              <div style={styles.detailsBox}>
                <span style={styles.detailsTitle}>Modality Details:</span>
                <ul style={styles.detailsList}>
                  {Object.entries(ds.modalityDetails).map(([mod, items]) => (
                    <li key={mod}>
                      <strong style={{ textTransform: 'capitalize' }}>{mod}:</strong> {items.join('; ')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  infoBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '18px 24px',
    marginBottom: '28px',
    boxShadow: 'var(--shadow-sm)'
  },
  infoTitle: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  infoText: {
    fontSize: '0.82rem',
    color: 'var(--dark-muted)',
    marginTop: '2px'
  },
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
    letterSpacing: '0.04em'
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
  modalitySection: {
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
  taskSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  taskBadges: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap'
  },
  taskBadge: {
    fontSize: '0.72rem',
    fontWeight: 600,
    backgroundColor: 'var(--violet-light)',
    color: 'var(--violet)',
    padding: '3px 8px',
    borderRadius: '4px'
  },
  noteBox: {
    backgroundColor: '#EFF6FF',
    border: '1px solid #BFDBFE',
    borderRadius: 'var(--radius-md)',
    padding: '10px 14px',
    fontSize: '0.8rem',
    color: '#1E40AF',
    lineHeight: 1.5
  },
  detailsBox: {
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '14px'
  },
  detailsTitle: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    display: 'block',
    marginBottom: '6px'
  },
  detailsList: {
    paddingLeft: '16px',
    margin: 0,
    fontSize: '0.78rem',
    color: 'var(--dark-muted)',
    lineHeight: 1.5
  }
};
