import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getModalityById } from '../config/modalities';
import { MODEL_REGISTRY } from '../config/models';
import { DATASET_REGISTRY } from '../config/datasets';
import { SectionHeader } from '../components/common/SectionHeader';
import { ModelCard } from '../components/models/ModelCard';
import { DatasetCard } from '../components/datasets/DatasetCard';
import { EmptyState } from '../components/common/EmptyState';
import { ArrowLeft, Cpu, Database } from 'lucide-react';

export const ModalityDetailPage: React.FC = () => {
  const { modalityId } = useParams<{ modalityId: string }>();
  const modality = getModalityById(modalityId || '');

  if (!modality) {
    return (
      <EmptyState
        title="Modality Not Found"
        description={`The requested modality ID '${modalityId}' is not defined.`}
        icon="info"
      />
    );
  }

  const linkedModels = MODEL_REGISTRY.filter(m => 
    m.requiredModalities.includes(modality.category)
  );

  const linkedDatasets = DATASET_REGISTRY.filter(d => 
    d.modalitiesProvided.includes(modality.category)
  );

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Link to="/modalities" style={styles.backLink}>
          <ArrowLeft size={14} />
          <span>Back to Modality Registry</span>
        </Link>
      </div>

      <SectionHeader 
        title={modality.name}
        description={modality.description}
        badgeText={`Category: ${modality.category}`}
      />

      {/* Subtypes Card */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Registered Subtypes & Clinical Formats</h3>
        <div style={styles.subtypeGrid}>
          {modality.subtypes.map(sub => (
            <div key={sub.id} style={styles.subtypeCard}>
              <h4 style={styles.subTitle}>{sub.name}</h4>
              <p style={styles.subDesc}>{sub.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Models using this Modality */}
      <div style={{ margin: '32px 0' }}>
        <div style={styles.sectionHeader}>
          <Cpu size={20} color="var(--violet)" />
          <h3 style={styles.sectionTitle}>Models Requiring {modality.name} ({linkedModels.length})</h3>
        </div>

        {linkedModels.length > 0 ? (
          <div style={styles.grid}>
            {linkedModels.map(m => (
              <ModelCard key={m.id} model={m} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Models Linked"
            description={`No model architectures currently registered require ${modality.name} as a mandatory input.`}
            icon="model"
          />
        )}
      </div>

      {/* Datasets containing this Modality */}
      <div style={{ marginBottom: '36px' }}>
        <div style={styles.sectionHeader}>
          <Database size={20} color="var(--soft-cyan)" />
          <h3 style={styles.sectionTitle}>Dataset Cohorts Providing {modality.name} ({linkedDatasets.length})</h3>
        </div>

        {linkedDatasets.length > 0 ? (
          <div style={styles.grid}>
            {linkedDatasets.map(d => (
              <DatasetCard key={d.id} dataset={d} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Datasets Linked"
            description={`No registered datasets currently provide ${modality.name}.`}
            icon="dataset"
          />
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--royal-blue)',
    textDecoration: 'none',
    fontSize: '0.82rem',
    fontWeight: 600
  },
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: 'var(--shadow-sm)'
  },
  cardTitle: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    marginBottom: '16px'
  },
  subtypeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '12px'
  },
  subtypeCard: {
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '14px'
  },
  subTitle: {
    fontSize: '0.88rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  subDesc: {
    fontSize: '0.78rem',
    color: 'var(--dark-muted)',
    marginTop: '4px'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px'
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '20px'
  }
};
