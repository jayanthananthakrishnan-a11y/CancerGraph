import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/common/SectionHeader';
import { CancerSubNav } from '../components/layout/CancerSubNav';
import { 
  CheckCircle2, 
  Clock, 
  Layers, 
  Database, 
  Cpu, 
  GitMerge, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const GliomaOverviewPage: React.FC = () => {
  return (
    <div>
      <CancerSubNav cancerType="glioma" />
      <SectionHeader 
        title="Glioma Multimodal AI Research Module"
        description="Core research workspace for Glioblastoma Multiforme (GBM) & Low-Grade Glioma (LGG) multimodal feature extraction, 3D volumetric segmentation, empirical model validation, and Graph Neural Network (GNN) modeling."
        badgeText="Active Primary Research Module"
      >
        <Link to="/glioma/evaluation" className="btn btn-primary">
          <Cpu size={16} />
          <span>View Empirical Model Evaluation</span>
        </Link>
        <Link to="/glioma/architecture" className="btn btn-violet">
          <GitMerge size={16} />
          <span>Research Pipeline Architecture</span>
        </Link>
      </SectionHeader>

      {/* Objective Card */}
      <div style={styles.heroCard}>
        <div style={styles.heroBadgeRow}>
          <div style={styles.heroBadge}>
            <ShieldCheck size={14} color="#5BC7D8" />
            <span>Honest Academic Research State — Zero Synthetic Data</span>
          </div>
          <span style={styles.phaseTag}>Phase 1 Active Target</span>
        </div>

        <h2 style={styles.heroTitle}>Research Objectives</h2>
        <div style={styles.grid2Col}>
          <div style={styles.objectiveBox}>
            <h3 style={styles.boxTitle}>Glioma Research Objective</h3>
            <p style={styles.boxText}>
              To establish a validated, reproducible pipeline for extracting multi-scale imaging embeddings (2D slice features & 3D volumetric segmentation masks) and pairing them with clinical hazards and TCGA tabular genomics for Glioma subtyping and risk assessment.
            </p>
          </div>
          <div style={styles.objectiveBox}>
            <h3 style={styles.boxTitle}>CancerGraph Platform Objective</h3>
            <p style={styles.boxText}>
              To construct a heterogeneous patient graph architecture where modality-specific feature extractors form graph node attributes, enabling Graph Neural Networks (GNNs) to model non-linear cross-modality biological interactions.
            </p>
          </div>
        </div>
      </div>

      {/* Status Matrix */}
      <div style={{ marginTop: '28px' }}>
        <h3 style={styles.sectionHeading}>Current Implementation & Research Status</h3>
        <p style={styles.sectionSubheading}>Clear breakdown of validated project assets, active evaluations, and future development stages.</p>

        <div style={styles.statusGrid}>
          {/* IMPLEMENTED */}
          <div style={{ ...styles.statusCard, borderColor: '#10B981' }}>
            <div style={{ ...styles.statusHeader, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#059669' }}>
              <CheckCircle2 size={18} />
              <h4 style={styles.statusTitle}>IMPLEMENTED & VERIFIED</h4>
            </div>
            <ul style={styles.statusList}>
              <li>
                <strong>Glioma Datasets Collected:</strong> 4 local datasets in <code>Research/Glioma/datasets/</code> (Dataset1, Dataset2, Dataset3, Dataset4).
              </li>
              <li>
                <strong>Model Inventory Created:</strong> Structured audit of 7 Kaggle candidate models categorized into baseline priorities (A–D).
              </li>
              <li>
                <strong>Brain Tumor Classifier Obtained:</strong> Dual-backbone <code>denseEfficient.h5</code> (~101.5 MB) downloaded and stored on disk.
              </li>
              <li>
                <strong>3D U-Net Model Obtained:</strong> <code>brats_3d_unet_kaggle_best.keras</code> (~120 MB) stored for volumetric segmentation.
              </li>
              <li>
                <strong>2D Model Loading Verified:</strong> Successfully loaded via <code>tf_keras</code> using legacy Keras compatibility mode (<code>TF_USE_LEGACY_KERAS=1</code>).
              </li>
              <li>
                <strong>2D Inference Execution Verified:</strong> Technical execution of inference on Dataset2 axial RGB slices.
              </li>
              <li>
                <strong>Feature Vector Extraction Verified:</strong> Successfully extracted intermediate representations at <code>concatenate_2</code> (3,200D), <code>dense_15</code> (256D), and <code>dense_16</code> (128D).
              </li>
            </ul>
          </div>

          {/* IN EVALUATION */}
          <div style={{ ...styles.statusCard, borderColor: '#F59E0B' }}>
            <div style={{ ...styles.statusHeader, backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#D97706' }}>
              <AlertTriangle size={18} />
              <h4 style={styles.statusTitle}>IN EVALUATION</h4>
            </div>
            <ul style={styles.statusList}>
              <li>
                <strong>15-Class Output Interpretation:</strong> Resolving discrepancy between model’s 15-class output head (<code>dense_17</code>) and Dataset2’s 4-class taxonomy (glioma, meningioma, notumor, pituitary).
              </li>
              <li>
                <strong>Quantitative Accuracy Validation:</strong> Postponed claiming 4-class classification accuracy until output mapping matrix is formally established.
              </li>
              <li>
                <strong>2D Slice Data Leakage Audit:</strong> Assessing patient-level slice distribution in Kaggle datasets to prevent inflated validation metrics.
              </li>
              <li>
                <strong>3D U-Net Evaluation Pipeline:</strong> Configuring volumetric inference runner for <code>brats_3d_unet_kaggle_best.keras</code> against Dataset4 (MU-Glioma-Post).
              </li>
            </ul>
          </div>

          {/* PLANNED */}
          <div style={{ ...styles.statusCard, borderColor: '#6366F1' }}>
            <div style={{ ...styles.statusHeader, backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#4F46E5' }}>
              <Clock size={18} />
              <h4 style={styles.statusTitle}>PLANNED RESEARCH STAGES</h4>
            </div>
            <ul style={styles.statusList}>
              <li>
                <strong>Multimodal Feature Alignment:</strong> Aligning extracted 3,200D imaging embeddings with TCGA genomic mutation matrices and clinical hazards.
              </li>
              <li>
                <strong>Patient Graph Construction:</strong> Building heterogeneous graph nodes (Patient, MRI Slice/Volume, Somatic Gene Mutation).
              </li>
              <li>
                <strong>GNN Architecture & Training:</strong> Designing Heterogeneous Graph Attention Network (HGT) for node and graph classification.
              </li>
              <li>
                <strong>Multimodal Risk Prediction:</strong> Integrated multi-task predictions for tumor grade, recurrence risk, and survival trajectory.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Asset Inventory Quick Stats */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={styles.sectionHeading}>Glioma Research Asset Summary</h3>
        <div style={styles.statsGrid}>
          <Link to="/glioma/datasets" style={styles.statCard}>
            <Database size={24} color="#6C5CE7" />
            <div>
              <span style={styles.statNumber}>4 Local Datasets</span>
              <span style={styles.statLabel}>Dataset1 (TCGA), Dataset2 (7,200 2D slices), Dataset3 (Binary), Dataset4 (3D Volumetric)</span>
            </div>
            <ArrowRight size={16} color="var(--cool-gray)" style={{ marginLeft: 'auto' }} />
          </Link>

          <Link to="/glioma/models" style={styles.statCard}>
            <Cpu size={24} color="#5BC7D8" />
            <div>
              <span style={styles.statNumber}>2 Pretrained Weights</span>
              <span style={styles.statLabel}>denseEfficient.h5 (2D Dual-Backbone) & brats_3d_unet_kaggle_best.keras (3D UNet)</span>
            </div>
            <ArrowRight size={16} color="var(--cool-gray)" style={{ marginLeft: 'auto' }} />
          </Link>

          <Link to="/glioma/evaluation" style={styles.statCard}>
            <Layers size={24} color="#10B981" />
            <div>
              <span style={styles.statNumber}>3 Verified Embeddings</span>
              <span style={styles.statLabel}>3,200D (concatenate_2), 256D (dense_15), 128D (dense_16) intermediate vectors</span>
            </div>
            <ArrowRight size={16} color="var(--cool-gray)" style={{ marginLeft: 'auto' }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  heroCard: {
    backgroundColor: 'var(--deep-surface)',
    border: '1px solid var(--border-dark)',
    borderRadius: 'var(--radius-xl)',
    padding: '28px',
    color: '#FFFFFF',
    boxShadow: 'var(--shadow-dark)',
    backgroundImage: 'radial-gradient(circle at 95% 10%, rgba(108, 92, 231, 0.18) 0%, transparent 60%)'
  },
  heroBadgeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '10px'
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
    fontWeight: 700
  },
  phaseTag: {
    fontSize: '0.72rem',
    fontWeight: 700,
    color: '#A99AF5',
    backgroundColor: 'rgba(108, 92, 231, 0.25)',
    padding: '4px 10px',
    borderRadius: '6px'
  },
  heroTitle: {
    fontSize: '1.4rem',
    fontWeight: 800,
    color: '#FFFFFF',
    marginBottom: '16px'
  },
  grid2Col: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '20px'
  },
  objectiveBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: 'var(--radius-md)',
    padding: '18px'
  },
  boxTitle: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#5BC7D8',
    marginBottom: '8px'
  },
  boxText: {
    fontSize: '0.85rem',
    color: '#D2D8E4',
    lineHeight: 1.55
  },
  sectionHeading: {
    fontSize: '1.15rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  sectionSubheading: {
    fontSize: '0.82rem',
    color: 'var(--dark-muted)',
    marginBottom: '20px'
  },
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
    gap: '20px'
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)'
  },
  statusHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 18px'
  },
  statusTitle: {
    fontSize: '0.85rem',
    fontWeight: 800,
    letterSpacing: '0.04em'
  },
  statusList: {
    padding: '18px 20px',
    fontSize: '0.82rem',
    color: 'var(--dark-text)',
    lineHeight: 1.6,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    margin: 0,
    listStyleType: 'disc',
    paddingLeft: '34px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '16px'
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    textDecoration: 'none',
    boxShadow: 'var(--shadow-sm)',
    transition: 'all 0.15s ease'
  },
  statNumber: {
    fontSize: '0.98rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)',
    display: 'block'
  },
  statLabel: {
    fontSize: '0.78rem',
    color: 'var(--dark-muted)',
    marginTop: '2px',
    display: 'block'
  }
};
