import React from 'react';
import { Link } from 'react-router-dom';
import type { CancerModule } from '../../types/cancer';
import { ModalityBadge } from '../common/ModalityBadge';
import { ChevronRight, Dna } from 'lucide-react';

interface CancerCardProps {
  cancer: CancerModule;
}

export const CancerCard: React.FC<CancerCardProps> = ({ cancer }) => {
  const isGlioma = cancer.id === 'glioma';

  return (
    <div style={{
      ...styles.card,
      ...(isGlioma ? styles.cardGlioma : {})
    }}>
      <div style={styles.cardHeader}>
        <div style={styles.headerTitleArea}>
          <div style={{
            ...styles.iconCircle,
            backgroundColor: isGlioma ? 'rgba(108, 92, 231, 0.12)' : 'var(--cool-white)',
            borderColor: isGlioma ? 'rgba(108, 92, 231, 0.3)' : 'var(--border)'
          }}>
            <Dna size={20} color={isGlioma ? '#6C5CE7' : '#3155B5'} />
          </div>
          <div>
            <h3 style={styles.cancerTitle}>{cancer.name}</h3>
            <span style={styles.scientificName}>{cancer.scientificName}</span>
          </div>
        </div>

        <span style={{
          ...styles.phaseTag,
          backgroundColor: isGlioma ? 'var(--violet)' : 'var(--cool-gray-light)',
          color: isGlioma ? '#FFFFFF' : 'var(--dark-muted)'
        }}>
          Phase {cancer.phase} Target
        </span>
      </div>

      <p style={styles.description}>{cancer.description}</p>

      <div style={styles.metaRow}>
        <span style={styles.metaLabel}>Anatomical Site:</span>
        <span style={styles.metaVal}>{cancer.anatomicalSite}</span>
      </div>

      <div style={styles.modalitySection}>
        <span style={styles.sectionSubLabel}>Supported Input Modalities:</span>
        <div style={styles.modalityList}>
          {cancer.supportedModalities.map(m => (
            <ModalityBadge key={m} modality={m} size="sm" />
          ))}
        </div>
      </div>

      <div style={styles.capabilitiesSection}>
        <span style={styles.sectionSubLabel}>Target Analytical Capabilities:</span>
        <div style={styles.capList}>
          {cancer.targetCapabilities.map(cap => (
            <span key={cap} style={styles.capBadge}>
              {cap}
            </span>
          ))}
        </div>
      </div>

      <div style={styles.cardFooter}>
        <span style={styles.icdCode}>{cancer.icdCode}</span>
        <Link to={`/cancers/${cancer.id}`} className="btn btn-secondary btn-sm" style={styles.openBtn}>
          <span>View Architecture</span>
          <ChevronRight size={14} />
        </Link>
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
    flexDirection: 'column',
    transition: 'all 0.2s ease',
    position: 'relative'
  },
  cardGlioma: {
    borderColor: 'rgba(108, 92, 231, 0.4)',
    boxShadow: '0 4px 16px rgba(108, 92, 231, 0.08)'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '14px'
  },
  headerTitleArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  iconCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancerTitle: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  scientificName: {
    fontSize: '0.72rem',
    color: 'var(--dark-muted)',
    fontStyle: 'italic',
    display: 'block'
  },
  phaseTag: {
    fontSize: '0.68rem',
    fontWeight: 700,
    padding: '3px 8px',
    borderRadius: '12px'
  },
  description: {
    fontSize: '0.82rem',
    color: 'var(--dark-muted)',
    lineHeight: 1.45,
    marginBottom: '16px',
    flex: 1
  },
  metaRow: {
    fontSize: '0.78rem',
    marginBottom: '12px',
    display: 'flex',
    gap: '6px'
  },
  metaLabel: {
    color: 'var(--cool-gray)',
    fontWeight: 600
  },
  metaVal: {
    color: 'var(--dark-text)',
    fontWeight: 600
  },
  modalitySection: {
    marginBottom: '12px'
  },
  sectionSubLabel: {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: 'var(--cool-gray)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '6px'
  },
  modalityList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  },
  capabilitiesSection: {
    marginBottom: '16px'
  },
  capList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px'
  },
  capBadge: {
    fontSize: '0.68rem',
    padding: '2px 6px',
    borderRadius: '4px',
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--dark-text)',
    fontWeight: 500
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid var(--border-subtle)',
    marginTop: 'auto'
  },
  icdCode: {
    fontSize: '0.7rem',
    color: 'var(--cool-gray)',
    fontFamily: 'var(--font-mono)'
  },
  openBtn: {
    color: 'var(--royal-blue)',
    borderColor: 'var(--border)'
  }
};
