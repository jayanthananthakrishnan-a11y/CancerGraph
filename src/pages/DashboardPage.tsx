import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/common/SectionHeader';
import { MultimodalWorkflowDiagram } from '../components/architecture/MultimodalWorkflowDiagram';
import { 
  Brain, 
  ShieldCheck, 
  ArrowRight, 
  GitMerge,
  Dna
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <SectionHeader 
        title="CancerGraph Research Platform Overview"
        description="Academic research platform organized around validated Glioma multimodal data ingestion, feature vector extraction, and Graph Neural Network (GNN) modeling."
        badgeText="Glioma Active Target"
      >
        <Link to="/glioma/overview" className="btn btn-primary">
          <Dna size={16} />
          <span>Glioma Active Research Module</span>
        </Link>
        <Link to="/glioma/architecture" className="btn btn-violet">
          <GitMerge size={16} />
          <span>Research Pipeline Architecture</span>
        </Link>
      </SectionHeader>

      {/* Hero Overview Banner */}
      <div style={styles.heroCard}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <ShieldCheck size={14} color="#5BC7D8" />
            <span>Honest Research State — Zero Synthetic Medical Data</span>
          </div>
          <h2 style={styles.heroTitle}>Glioma-Centric Multimodal AI Research Architecture</h2>
          <p style={styles.heroText}>
            CancerGraph reorganizes research assets around one concrete objective: establishing a validated Glioma multimodal pipeline. Imaging feature extraction layers (3,200D concatenate_2, 256D dense_15, 128D dense_16) and 3D volumetric U-Net models are connected directly to local project datasets.
          </p>

          <div style={styles.heroStatsGrid}>
            <div style={styles.statBox}>
              <span style={styles.statNumber}>Glioma</span>
              <span style={styles.statLabel}>Primary Research Domain</span>
              <span style={styles.statSub}>4 Local Datasets & 2 Pretrained Models</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNumber}>4</span>
              <span style={styles.statLabel}>Evaluated Local Datasets</span>
              <span style={styles.statSub}>Dataset1, Dataset2, Dataset3, Dataset4</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNumber}>3,200D</span>
              <span style={styles.statLabel}>Verified Imaging Vector</span>
              <span style={styles.statSub}>denseEfficient.h5 Bottleneck Embedding</span>
            </div>
          </div>
        </div>
      </div>

      {/* Multimodal Diagram Section */}
      <MultimodalWorkflowDiagram />

      {/* Primary Research Module Callout */}
      <div style={styles.extensionCard}>
        <div style={styles.extIconCircle}>
          <Brain size={24} color="#6C5CE7" />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={styles.extTitle}>Active Glioma Research Module</h4>
          <p style={styles.extDesc}>
            Access the primary research workspace containing verified dataset inventories, pretrained model loading status, empirical evaluation logs for denseEfficient.h5, and research pipeline architecture.
          </p>
        </div>
        <Link to="/glioma/overview" className="btn btn-violet">
          <span>Enter Glioma Workspace</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  heroCard: {
    backgroundColor: 'var(--deep-surface)',
    border: '1px solid var(--border-dark)',
    borderRadius: 'var(--radius-xl)',
    padding: '32px',
    color: '#FFFFFF',
    marginBottom: '28px',
    boxShadow: 'var(--shadow-dark)',
    backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(108, 92, 231, 0.15) 0%, transparent 60%)'
  },
  heroContent: {
    maxWidth: '900px'
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(91, 199, 216, 0.12)',
    border: '1px solid rgba(91, 199, 216, 0.3)',
    color: '#5BC7D8',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 700,
    marginBottom: '16px'
  },
  heroTitle: {
    fontSize: '1.6rem',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    marginBottom: '12px',
    color: '#FFFFFF',
    lineHeight: 1.25
  },
  heroText: {
    fontSize: '0.92rem',
    color: '#D2D8E4',
    lineHeight: 1.6,
    marginBottom: '24px'
  },
  heroStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    paddingTop: '20px',
    borderTop: '1px solid var(--border-dark)'
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  statNumber: {
    fontSize: '1.4rem',
    fontWeight: 800,
    color: '#5BC7D8'
  },
  statLabel: {
    fontSize: '0.82rem',
    fontWeight: 700,
    color: '#FFFFFF',
    marginTop: '2px'
  },
  statSub: {
    fontSize: '0.72rem',
    color: 'var(--cool-gray)',
    marginTop: '2px'
  },
  extensionCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginTop: '32px',
    boxShadow: 'var(--shadow-sm)'
  },
  extIconCircle: {
    width: '52px',
    height: '52px',
    borderRadius: '12px',
    backgroundColor: 'var(--violet-light)',
    border: '1px solid rgba(108, 92, 231, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  extTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  extDesc: {
    fontSize: '0.82rem',
    color: 'var(--dark-muted)',
    marginTop: '4px',
    lineHeight: 1.45
  }
};
