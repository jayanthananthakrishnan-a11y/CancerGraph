import React from 'react';
import type { DatasetDefinition } from '../../types/dataset';
import { ModalityBadge } from '../common/ModalityBadge';
import { getCancerById } from '../../config/cancers';
import { Database, Lock, Unlock } from 'lucide-react';

interface DatasetCardProps {
  dataset: DatasetDefinition;
}

export const DatasetCard: React.FC<DatasetCardProps> = ({ dataset }) => {
  const cancer = getCancerById(dataset.cancerTypeId);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.titleArea}>
          <div style={styles.iconBox}>
            <Database size={18} color="#5BC7D8" />
          </div>
          <div>
            <h4 style={styles.title}>{dataset.title}</h4>
            <span style={styles.cancerName}>{cancer?.name || dataset.cancerTypeId} Target Cohort</span>
          </div>
        </div>

        <span style={{
          ...styles.accessBadge,
          backgroundColor: dataset.accessType === 'Open Access' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
          color: dataset.accessType === 'Open Access' ? '#059669' : '#D97706',
          border: `1px solid ${dataset.accessType === 'Open Access' ? '#A7F3D0' : '#FDE68A'}`
        }}>
          {dataset.accessType === 'Open Access' ? <Unlock size={11} /> : <Lock size={11} />}
          <span>{dataset.accessType}</span>
        </span>
      </div>

      <p style={styles.description}>{dataset.description}</p>

      <div style={styles.modalitiesSection}>
        <span style={styles.sectionLabel}>Provided Modalities:</span>
        <div style={styles.badgeList}>
          {dataset.modalitiesProvided.map(m => (
            <ModalityBadge key={m} modality={m} size="sm" />
          ))}
        </div>
      </div>

      <div style={styles.tasksSection}>
        <span style={styles.sectionLabel}>Target Analytical Tasks:</span>
        <div style={styles.taskList}>
          {dataset.targetTasks.map(t => (
            <span key={t} style={styles.taskPill}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div style={styles.footer}>
        <span style={styles.placeholderNotice}>
          Registry Schema linked — Awaiting Data Ingestion
        </span>
        <span style={styles.statusTag}>Phase 1 Shell</span>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  titleArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  iconBox: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: 'var(--soft-cyan-light)',
    border: '1px solid rgba(91, 199, 216, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  cancerName: {
    fontSize: '0.72rem',
    color: 'var(--dark-muted)',
    display: 'block'
  },
  accessBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.7rem',
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: '12px'
  },
  description: {
    fontSize: '0.82rem',
    color: 'var(--dark-muted)',
    lineHeight: 1.45,
    marginBottom: '16px'
  },
  modalitiesSection: {
    marginBottom: '12px'
  },
  sectionLabel: {
    fontSize: '0.68rem',
    fontWeight: 700,
    color: 'var(--cool-gray)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    display: 'block',
    marginBottom: '6px'
  },
  badgeList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  },
  tasksSection: {
    marginBottom: '16px'
  },
  taskList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px'
  },
  taskPill: {
    fontSize: '0.7rem',
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border)',
    color: 'var(--dark-text)'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid var(--border-subtle)',
    marginTop: 'auto'
  },
  placeholderNotice: {
    fontSize: '0.72rem',
    color: 'var(--cool-gray)',
    fontStyle: 'italic'
  },
  statusTag: {
    fontSize: '0.7rem',
    fontWeight: 600,
    color: 'var(--royal-blue)'
  }
};
