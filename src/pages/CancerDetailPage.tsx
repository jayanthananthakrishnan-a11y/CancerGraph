import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCancerById } from '../config/cancers';
import { getModelsByCancerId } from '../config/models';
import { getDatasetsByCancerId } from '../config/datasets';
import { SectionHeader } from '../components/common/SectionHeader';
import { ModalityBadge } from '../components/common/ModalityBadge';
import { ModelCard } from '../components/models/ModelCard';
import { DatasetCard } from '../components/datasets/DatasetCard';
import { EmptyState } from '../components/common/EmptyState';
import { ModalitySelector } from '../components/common/ModalitySelector';
import { evaluateModelCompatibility } from '../services/modalityEngine';
import type { ModalityCategory } from '../types/modality';
import { Cpu, Database, UserCheck, ArrowLeft } from 'lucide-react';

export const CancerDetailPage: React.FC = () => {
  const { cancerId } = useParams<{ cancerId: string }>();
  const cancer = getCancerById(cancerId || '');

  const [activeModalities, setActiveModalities] = useState<ModalityCategory[]>([
    'clinical', 'imaging', 'genomics'
  ]);

  if (!cancer) {
    return (
      <EmptyState
        title="Cancer Module Not Found"
        description={`The requested cancer module ID '${cancerId}' is not registered in the Phase 1 platform.`}
        icon="info"
      />
    );
  }

  const models = getModelsByCancerId(cancer.id);
  const datasets = getDatasetsByCancerId(cancer.id);

  const evaluatedModels = models.map(m => evaluateModelCompatibility(activeModalities, m));

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Link to="/cancers" style={styles.backLink}>
          <ArrowLeft size={14} />
          <span>Back to Cancer Registry</span>
        </Link>
      </div>

      <SectionHeader 
        title={`${cancer.name} Architecture Module`}
        description={cancer.description}
        badgeText={cancer.badgeText}
      >
        <Link to="/patient-analysis" className="btn btn-primary">
          <UserCheck size={16} />
          <span>Test Patient Analysis</span>
        </Link>
      </SectionHeader>

      {/* Cancer Overview Header Card */}
      <div style={styles.overviewCard}>
        <div style={styles.overviewGrid}>
          <div>
            <span style={styles.metaLabel}>Scientific Taxonomy</span>
            <h3 style={styles.sciTitle}>{cancer.scientificName}</h3>
            <span style={styles.icdTag}>{cancer.icdCode}</span>
          </div>

          <div>
            <span style={styles.metaLabel}>Anatomical Site</span>
            <div style={styles.metaValue}>{cancer.anatomicalSite}</div>
          </div>

          <div>
            <span style={styles.metaLabel}>Target Phase</span>
            <div style={styles.metaValue}>Phase {cancer.phase} Implementation</div>
          </div>
        </div>

        <div style={styles.modalityArea}>
          <span style={styles.metaLabel}>Supported Input Modalities for {cancer.name}:</span>
          <div style={styles.modalityList}>
            {cancer.supportedModalities.map(m => (
              <ModalityBadge key={m} modality={m} />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Modality Compatibility Sandbox for this Cancer */}
      <div style={{ margin: '28px 0' }}>
        <h3 style={styles.subHeading}>Modality Availability Sandbox ({cancer.name})</h3>
        <p style={styles.subText}>Toggle available modalities below to observe real-time model compatibility calculation for this cancer.</p>
        
        <div style={{ marginTop: '14px' }}>
          <ModalitySelector 
            selectedModalities={activeModalities} 
            onChange={setActiveModalities} 
          />
        </div>
      </div>

      {/* Registered Models Section */}
      <div style={{ marginBottom: '36px' }}>
        <div style={styles.sectionHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={20} color="var(--violet)" />
            <h3 style={styles.sectionTitle}>Registered Model Architectures ({models.length})</h3>
          </div>
          <span style={styles.sectionNotice}>Models automatically evaluated against active modality sandbox</span>
        </div>

        {models.length > 0 ? (
          <div style={styles.grid}>
            {evaluatedModels.map(item => (
              <ModelCard 
                key={item.model.id} 
                model={item.model} 
                compatibility={item} 
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Models Registered Yet"
            description={`Model architectures for ${cancer.name} will be registered during Phase ${cancer.phase}.`}
            icon="model"
            targetPhaseNote={`Targeted for Phase ${cancer.phase} Development`}
          />
        )}
      </div>

      {/* Registered Datasets Section */}
      <div style={{ marginBottom: '36px' }}>
        <div style={styles.sectionHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={20} color="var(--soft-cyan)" />
            <h3 style={styles.sectionTitle}>Registered Dataset Cohorts ({datasets.length})</h3>
          </div>
        </div>

        {datasets.length > 0 ? (
          <div style={styles.grid}>
            {datasets.map(ds => (
              <DatasetCard key={ds.id} dataset={ds} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Datasets Linked"
            description={`Dataset schemas for ${cancer.name} will be linked when research cohorts are ingested.`}
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
  overviewCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: 'var(--shadow-sm)',
    marginBottom: '24px'
  },
  overviewGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid var(--border-subtle)',
    marginBottom: '18px'
  },
  metaLabel: {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: 'var(--cool-gray)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    display: 'block',
    marginBottom: '4px'
  },
  sciTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  icdTag: {
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--dark-muted)'
  },
  metaValue: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: 'var(--dark-text)'
  },
  modalityArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  modalityList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  subHeading: {
    fontSize: '1.1rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  subText: {
    fontSize: '0.82rem',
    color: 'var(--dark-muted)'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  sectionNotice: {
    fontSize: '0.75rem',
    color: 'var(--cool-gray)',
    fontStyle: 'italic'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '20px'
  }
};
