import React from 'react';
import type { ModalityCategory } from '../../types/modality';
import { MODALITY_REGISTRY } from '../../config/modalities';
import { Check, AlertCircle } from 'lucide-react';

interface ModalitySelectorProps {
  selectedModalities: ModalityCategory[];
  onChange: (updated: ModalityCategory[]) => void;
  title?: string;
}

export const ModalitySelector: React.FC<ModalitySelectorProps> = ({
  selectedModalities,
  onChange,
  title = "Select Available Modalities"
}) => {
  const toggleModality = (id: ModalityCategory) => {
    if (selectedModalities.includes(id)) {
      onChange(selectedModalities.filter(m => m !== id));
    } else {
      onChange([...selectedModalities, id]);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h4 style={styles.title}>{title}</h4>
          <p style={styles.subtitle}>Toggle modalities present in patient input or dataset cohort</p>
        </div>
        <span style={styles.countBadge}>
          {selectedModalities.length} / {MODALITY_REGISTRY.length} Modalities Selected
        </span>
      </div>

      <div style={styles.grid}>
        {MODALITY_REGISTRY.map(modality => {
          const isSelected = selectedModalities.includes(modality.category);
          return (
            <button
              key={modality.id}
              onClick={() => toggleModality(modality.category)}
              style={{
                ...styles.modalityBtn,
                ...(isSelected ? styles.modalityBtnActive : {})
              }}
              type="button"
            >
              <div style={{
                ...styles.checkbox,
                ...(isSelected ? styles.checkboxActive : {})
              }}>
                {isSelected && <Check size={12} color="#FFFFFF" />}
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={styles.modalityName}>{modality.name}</div>
                <div style={styles.modalitySub}>
                  {modality.subtypes.slice(0, 2).map(s => s.name).join(', ')}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedModalities.length === 0 && (
        <div style={styles.warningBox}>
          <AlertCircle size={14} color="#F59E0B" />
          <span>No modalities selected. Single-modality and multimodal models will be marked disabled until data sources are checked.</span>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px',
    boxShadow: 'var(--shadow-sm)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  title: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  subtitle: {
    fontSize: '0.78rem',
    color: 'var(--dark-muted)',
    marginTop: '2px'
  },
  countBadge: {
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border)',
    padding: '4px 10px',
    borderRadius: '20px',
    color: 'var(--royal-blue)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '12px'
  },
  modalityBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--cool-white)',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  modalityBtnActive: {
    backgroundColor: 'rgba(49, 85, 181, 0.06)',
    borderColor: 'var(--royal-blue)',
    boxShadow: '0 2px 8px rgba(49, 85, 181, 0.12)'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    border: '1px solid var(--cool-gray)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  checkboxActive: {
    backgroundColor: 'var(--royal-blue)',
    borderColor: 'var(--royal-blue)'
  },
  modalityName: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  modalitySub: {
    fontSize: '0.7rem',
    color: 'var(--dark-muted)',
    marginTop: '2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  warningBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '14px',
    padding: '8px 12px',
    backgroundColor: '#FFFBEB',
    border: '1px solid #FCD34D',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.75rem',
    color: '#B45309'
  }
};
