import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SectionHeader } from '../components/common/SectionHeader';
import { CANCER_REGISTRY } from '../config/cancers';
import { DATASET_REGISTRY } from '../config/datasets';
import { MODEL_REGISTRY } from '../config/models';
import { Clock, ShieldAlert, ArrowLeft, Dna, Database, Cpu } from 'lucide-react';

export const PlannedDomainsPage: React.FC = () => {
  const { cancerId } = useParams<{ cancerId?: string }>();
  
  const plannedCancers = CANCER_REGISTRY.filter(c => c.status === 'planned');
  const selectedCancer = CANCER_REGISTRY.find(c => c.id === cancerId) || plannedCancers[0];

  const cancerDatasets = DATASET_REGISTRY.filter(d => d.cancerTypeId === selectedCancer?.id);
  const cancerModels = MODEL_REGISTRY.filter(m => m.cancerTypeId === selectedCancer?.id);

  return (
    <div>
      <SectionHeader 
        title="Planned Research Domains (Roadmap)"
        description="Extensible cancer modules targeted for Phase 3–6 dataset collection and model integration."
        badgeText="Roadmap Architecture"
      >
        <Link to="/glioma/overview" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Return to Active Glioma Target</span>
        </Link>
      </SectionHeader>

      {/* Planned Domain Selector Tabs */}
      <div style={styles.tabRow}>
        <span style={styles.tabLabel}>Planned Domains:</span>
        {plannedCancers.map(c => {
          const isActive = c.id === selectedCancer?.id;
          return (
            <Link
              key={c.id}
              to={`/planned-domains/${c.id}`}
              style={{
                ...styles.tabBtn,
                ...(isActive ? styles.tabBtnActive : {})
              }}
            >
              <span>{c.name}</span>
              <span style={styles.phaseBadge}>Phase {c.phase}</span>
            </Link>
          );
        })}
      </div>

      {/* Selected Planned Cancer Card */}
      {selectedCancer && (
        <div style={styles.mainCard}>
          <div style={styles.cardHeader}>
            <div style={styles.titleGroup}>
              <Dna size={22} color="var(--royal-blue)" />
              <div>
                <h2 style={styles.cancerTitle}>{selectedCancer.name}</h2>
                <span style={styles.scientificName}>{selectedCancer.scientificName} ({selectedCancer.icdCode})</span>
              </div>
            </div>
            <span style={styles.plannedTag}>
              <Clock size={14} />
              <span>{selectedCancer.primaryTargetPhase}</span>
            </span>
          </div>

          <p style={styles.description}>{selectedCancer.description}</p>

          <div style={styles.bannerNote}>
            <ShieldAlert size={18} color="#D97706" style={{ flexShrink: 0 }} />
            <span>
              <strong>Domain Status: Planned (Not Implemented Yet).</strong> In accordance with honest research guidelines, no mock predictions, fake clinical metrics, or synthetic patient files are generated for this planned domain.
            </span>
          </div>

          <div style={styles.grid2Col}>
            {/* Planned Datasets */}
            <div style={styles.subBox}>
              <div style={styles.subHeader}>
                <Database size={16} color="var(--royal-blue)" />
                <h3 style={styles.subTitle}>Planned Dataset Schemas</h3>
              </div>
              <div style={styles.listContainer}>
                {cancerDatasets.map(ds => (
                  <div key={ds.id} style={styles.itemCard}>
                    <h4 style={styles.itemTitle}>{ds.title}</h4>
                    <p style={styles.itemDesc}>{ds.description}</p>
                    <span style={styles.plannedPill}>Planned Schema</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Planned Models */}
            <div style={styles.subBox}>
              <div style={styles.subHeader}>
                <Cpu size={16} color="var(--royal-blue)" />
                <h3 style={styles.subTitle}>Planned Model Architectures</h3>
              </div>
              <div style={styles.listContainer}>
                {cancerModels.map(m => (
                  <div key={m.id} style={styles.itemCard}>
                    <h4 style={styles.itemTitle}>{m.name}</h4>
                    <p style={styles.itemDesc}>{m.description}</p>
                    <span style={styles.plannedPill}>{m.version}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  tabRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  tabLabel: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--dark-muted)'
  },
  tabBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    backgroundColor: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--dark-text)',
    transition: 'all 0.15s ease'
  },
  tabBtnActive: {
    backgroundColor: 'var(--deep-indigo)',
    color: '#FFFFFF',
    borderColor: 'var(--deep-indigo)'
  },
  phaseBadge: {
    fontSize: '0.65rem',
    fontWeight: 700,
    backgroundColor: 'rgba(108, 92, 231, 0.15)',
    color: 'var(--violet)',
    padding: '2px 6px',
    borderRadius: '4px'
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '28px',
    boxShadow: 'var(--shadow-sm)'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--border-subtle)'
  },
  titleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  cancerTitle: {
    fontSize: '1.3rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  scientificName: {
    fontSize: '0.8rem',
    color: 'var(--dark-muted)',
    fontStyle: 'italic',
    display: 'block'
  },
  plannedTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.75rem',
    fontWeight: 800,
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    padding: '4px 12px',
    borderRadius: '12px'
  },
  description: {
    fontSize: '0.9rem',
    color: 'var(--dark-text)',
    lineHeight: 1.6,
    marginBottom: '20px'
  },
  bannerNote: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#FFFBEB',
    border: '1px solid #FCD34D',
    borderRadius: 'var(--radius-md)',
    padding: '14px 18px',
    fontSize: '0.82rem',
    color: '#92400E',
    marginBottom: '24px',
    lineHeight: 1.5
  },
  grid2Col: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '24px'
  },
  subBox: {
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '18px'
  },
  subHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '14px'
  },
  subTitle: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '12px 14px'
  },
  itemTitle: {
    fontSize: '0.88rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    marginBottom: '4px'
  },
  itemDesc: {
    fontSize: '0.78rem',
    color: 'var(--dark-muted)',
    lineHeight: 1.45,
    marginBottom: '6px'
  },
  plannedPill: {
    fontSize: '0.65rem',
    fontWeight: 700,
    backgroundColor: '#E0E7FF',
    color: '#3730A3',
    padding: '2px 6px',
    borderRadius: '4px'
  }
};
