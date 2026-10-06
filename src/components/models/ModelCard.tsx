import React from 'react';
import type { ModelDefinition, CompatibilityResult } from '../../types/model';
import { ModalityBadge } from '../common/ModalityBadge';
import { getCancerById } from '../../config/cancers';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface ModelCardProps {
  model: ModelDefinition;
  compatibility?: CompatibilityResult;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, compatibility }) => {
  const cancer = getCancerById(model.cancerTypeId);
  const isGNN = model.category.includes('Graph') || model.category.includes('Multimodal');

  return (
    <div style={{
      ...styles.card,
      ...(compatibility && !compatibility.isCompatible ? styles.cardDisabled : {})
    }}>
      <div style={styles.header}>
        <div>
          <div style={styles.categoryRow}>
            <span style={{
              ...styles.categoryTag,
              backgroundColor: isGNN ? 'var(--violet-light)' : 'var(--royal-blue-light)',
              color: isGNN ? 'var(--violet)' : 'var(--royal-blue)'
            }}>
              {model.category}
            </span>
            <span style={styles.versionTag}>v{model.version}</span>
          </div>
          <h4 style={styles.modelName}>{model.name}</h4>
        </div>

        {compatibility && (
          <div style={{
            ...styles.compatPill,
            backgroundColor: compatibility.isCompatible ? '#ECFDF5' : '#FEF2F2',
            borderColor: compatibility.isCompatible ? '#A7F3D0' : '#FCA5A5',
            color: compatibility.isCompatible ? '#047857' : '#B91C1C'
          }}>
            {compatibility.isCompatible ? (
              <>
                <CheckCircle2 size={13} color="#047857" />
                <span>Compatible</span>
              </>
            ) : (
              <>
                <XCircle size={13} color="#B91C1C" />
                <span>Disabled</span>
              </>
            )}
          </div>
        )}
      </div>

      <p style={styles.description}>{model.description}</p>

      <div style={styles.detailsGrid}>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Cancer Target</span>
          <span style={styles.detailValue}>{cancer?.name || model.cancerTypeId}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Task Type</span>
          <span style={styles.detailValue}>{model.task}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Output Schema</span>
          <span style={styles.detailValue}>{model.outputType}</span>
        </div>
      </div>

      <div style={styles.modalityArea}>
        <span style={styles.detailLabel}>Required Input Modalities:</span>
        <div style={styles.modalityList}>
          {model.requiredModalities.map(m => (
            <ModalityBadge key={m} modality={m} size="sm" />
          ))}
        </div>
      </div>

      {compatibility && !compatibility.isCompatible && (
        <div style={styles.reasonBox}>
          <AlertTriangle size={13} color="#DC2626" />
          <span>{compatibility.reason}</span>
        </div>
      )}

      <div style={styles.footer}>
        <span style={styles.archNotes}>Arch: {model.architectureNotes}</span>
        <span style={styles.statusBadge}>
          {model.status === 'registered' ? 'Registered Shell' : 'Target Pipeline'}
        </span>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '18px',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  cardDisabled: {
    backgroundColor: '#F9FAFB',
    borderColor: 'var(--border)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  categoryRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px'
  },
  categoryTag: {
    fontSize: '0.68rem',
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: '10px'
  },
  versionTag: {
    fontSize: '0.65rem',
    color: 'var(--cool-gray)',
    fontFamily: 'var(--font-mono)'
  },
  modelName: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  compatPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 8px',
    borderRadius: '12px',
    border: '1px solid',
    fontSize: '0.72rem',
    fontWeight: 700
  },
  description: {
    fontSize: '0.8rem',
    color: 'var(--dark-muted)',
    lineHeight: 1.45,
    marginBottom: '14px'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
    backgroundColor: 'var(--cool-white)',
    padding: '10px',
    borderRadius: 'var(--radius-md)',
    marginBottom: '12px',
    border: '1px solid var(--border-subtle)'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  detailLabel: {
    fontSize: '0.68rem',
    color: 'var(--cool-gray)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.03em'
  },
  detailValue: {
    fontSize: '0.78rem',
    fontWeight: 700,
    color: 'var(--dark-text)'
  },
  modalityArea: {
    marginBottom: '12px'
  },
  modalityList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '4px'
  },
  reasonBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#FEF2F2',
    border: '1px solid #FCA5A5',
    borderRadius: 'var(--radius-sm)',
    padding: '6px 10px',
    fontSize: '0.72rem',
    color: '#991B1B',
    marginBottom: '12px'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10px',
    borderTop: '1px solid var(--border-subtle)',
    marginTop: 'auto'
  },
  archNotes: {
    fontSize: '0.7rem',
    color: 'var(--cool-gray)',
    fontStyle: 'italic',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '220px'
  },
  statusBadge: {
    fontSize: '0.68rem',
    color: 'var(--royal-blue)',
    fontWeight: 600
  }
};
