import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/common/SectionHeader';
import { MODALITY_REGISTRY } from '../config/modalities';
import { ModalityBadge } from '../components/common/ModalityBadge';
import { ChevronRight, CheckCircle } from 'lucide-react';

export const ModalitiesPage: React.FC = () => {
  return (
    <div>
      <SectionHeader 
        title="Modality Registry Architecture"
        description="CancerGraph treats Imaging, Clinical, Genomics, Pathology, and Radiomics as independent modality types, enabling flexible combinatorial fusion."
        badgeText="5 Modality Definitions"
      />

      <div style={styles.grid}>
        {MODALITY_REGISTRY.map(modality => (
          <div key={modality.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.titleArea}>
                <ModalityBadge modality={modality.category} />
                <h3 style={styles.modalityTitle}>{modality.name}</h3>
              </div>
            </div>

            <p style={styles.description}>{modality.description}</p>

            <div style={styles.section}>
              <span style={styles.sectionLabel}>Supported Subtypes & Modality Formats:</span>
              <div style={styles.subtypeList}>
                {modality.subtypes.map(sub => (
                  <div key={sub.id} style={styles.subtypeItem}>
                    <CheckCircle size={13} color="var(--royal-blue)" />
                    <div>
                      <span style={styles.subName}>{sub.name}</span>
                      <span style={styles.subDesc}>{sub.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.section}>
              <span style={styles.sectionLabel}>Typical Feature Representations:</span>
              <div style={styles.featureList}>
                {modality.typicalFeatures.map(feat => (
                  <span key={feat} style={styles.featurePill}>
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            <div style={styles.cardFooter}>
              <span style={styles.extNote}>Pluggable Modality Definition</span>
              <Link to={`/modalities/${modality.id}`} className="btn btn-secondary btn-sm">
                <span>Inspect Modality</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '24px'
  },
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    marginBottom: '12px'
  },
  titleArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px'
  },
  modalityTitle: {
    fontSize: '1.15rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  description: {
    fontSize: '0.85rem',
    color: 'var(--dark-muted)',
    lineHeight: 1.5,
    marginBottom: '16px'
  },
  section: {
    marginBottom: '16px'
  },
  sectionLabel: {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: 'var(--cool-gray)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    display: 'block',
    marginBottom: '8px'
  },
  subtypeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  subtypeItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    backgroundColor: 'var(--cool-white)',
    padding: '8px 10px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-subtle)'
  },
  subName: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--dark-text)',
    display: 'block'
  },
  subDesc: {
    fontSize: '0.72rem',
    color: 'var(--dark-muted)',
    display: 'block'
  },
  featureList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  },
  featurePill: {
    fontSize: '0.72rem',
    padding: '3px 8px',
    borderRadius: '4px',
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border)',
    color: 'var(--dark-text)'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid var(--border-subtle)',
    marginTop: 'auto'
  },
  extNote: {
    fontSize: '0.72rem',
    color: 'var(--cool-gray)',
    fontStyle: 'italic'
  }
};
