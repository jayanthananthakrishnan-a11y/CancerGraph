import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { MultimodalWorkflowDiagram } from '../components/architecture/MultimodalWorkflowDiagram';
import { ModalitySelector } from '../components/common/ModalitySelector';
import type { ModalityCategory } from '../types/modality';
import { EmptyState } from '../components/common/EmptyState';
import { Share2 } from 'lucide-react';

export const MultimodalAnalysisPage: React.FC = () => {
  const [activeModalities, setActiveModalities] = useState<ModalityCategory[]>([
    'clinical', 'imaging', 'genomics', 'radiomics', 'pathology'
  ]);

  return (
    <div>
      <SectionHeader 
        title="Multimodal Fusion & GNN Architecture"
        description="CancerGraph combines single-modality feature representations into a unified heterogeneous Graph Neural Network (GNN) for cross-modality reasoning."
        badgeText="Core AI Architecture"
      />

      {/* Interactive Diagram Component */}
      <MultimodalWorkflowDiagram activeModalities={activeModalities} />

      {/* Modality Combination Matrix Control */}
      <div style={{ margin: '28px 0' }}>
        <ModalitySelector 
          selectedModalities={activeModalities}
          onChange={setActiveModalities}
          title="Interactive Modality Combination Sandbox"
        />
      </div>

      {/* GNN Graph Node Construction Cards */}
      <div style={styles.sectionHeader}>
        <Share2 size={20} color="var(--violet)" />
        <h3 style={styles.sectionTitle}>Heterogeneous GNN Node & Edge Construction Architecture</h3>
      </div>

      <div style={styles.gnnGrid}>
        <div style={styles.gnnCard}>
          <div style={styles.nodeHeader}>
            <span style={{ ...styles.nodeDot, backgroundColor: '#3155B5' }} />
            <h4 style={styles.nodeTitle}>Patient & Clinical Nodes</h4>
          </div>
          <p style={styles.nodeDesc}>Contains demographic, laboratory, and baseline hazard feature vectors projected into latent node space.</p>
        </div>

        <div style={styles.gnnCard}>
          <div style={styles.nodeHeader}>
            <span style={{ ...styles.nodeDot, backgroundColor: '#5BC7D8' }} />
            <h4 style={styles.nodeTitle}>Imaging Sub-region Nodes</h4>
          </div>
          <p style={styles.nodeDesc}>Spatial graph nodes constructed from 3D MRI/CT tumor sub-regions (enhancing tumor, edema, necrosis).</p>
        </div>

        <div style={styles.gnnCard}>
          <div style={styles.nodeHeader}>
            <span style={{ ...styles.nodeDot, backgroundColor: '#6C5CE7' }} />
            <h4 style={styles.nodeTitle}>Biomarker & Genomic Nodes</h4>
          </div>
          <p style={styles.nodeDesc}>Molecular mutation and gene expression embeddings linked via co-expression and biological pathway edges.</p>
        </div>

        <div style={styles.gnnCard}>
          <div style={styles.nodeHeader}>
            <span style={{ ...styles.nodeDot, backgroundColor: '#A99AF5' }} />
            <h4 style={styles.nodeTitle}>Pathology Spatial Nodes</h4>
          </div>
          <p style={styles.nodeDesc}>Whole slide patch embeddings connected by spatial micro-environment cellular adjacency graphs.</p>
        </div>
      </div>

      <EmptyState 
        title="GNN Inference & Fusion Pipeline Shell"
        description="The GNN graph construction parameters and cross-modality attention modules are defined in Phase 1. Heterogeneous message-passing inference will execute in Phase 2+."
        icon="experiment"
        targetPhaseNote="PyTorch Geometric (PyG) Integration Targeted for Phase 2"
      />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
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
  gnnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '16px',
    marginBottom: '28px'
  },
  gnnCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '18px',
    boxShadow: 'var(--shadow-sm)'
  },
  nodeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px'
  },
  nodeDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%'
  },
  nodeTitle: {
    fontSize: '0.9rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  nodeDesc: {
    fontSize: '0.78rem',
    color: 'var(--dark-muted)',
    lineHeight: 1.45
  }
};
