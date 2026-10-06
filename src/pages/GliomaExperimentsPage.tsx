import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { CancerSubNav } from '../components/layout/CancerSubNav';
import { 
  FlaskConical, 
  CheckCircle2, 
  Clock, 
  FileCode,
  HardDrive
} from 'lucide-react';

export const GliomaExperimentsPage: React.FC = () => {
  const actualExperiments = [
    {
      id: 'EXP-GLIOMA-001',
      title: 'Brain Tumor Classifier (denseEfficient.h5) Technical Inference Test',
      type: 'Technical Model Evaluation & Feature Extraction',
      status: 'EXECUTED & VERIFIED',
      dataset: 'Dataset2 (Kaggle 4-Class Brain MRI, 7,200 images)',
      model: 'denseEfficient.h5 (~101.5 MB)',
      script: 'Research/Glioma/evaluation/brain_tumor_classifier/evaluate_dense_efficient.py',
      output: 'Research/Glioma/evaluation/results/dense_efficient_evaluation.json',
      findings: [
        'Model loading successful via tf_keras (TF_USE_LEGACY_KERAS=1)',
        'Input tensor shape: (224, 224, 3) RGB float arrays',
        'Output logit shape: (15,) softmax probabilities',
        'Verified feature extraction layers: concatenate_2 (3,200D), dense_15 (256D), dense_16 (128D)',
        'Core finding: Output vector is 15-dimensional while Dataset2 has 4 classes; 15-to-4 mapping required before reporting quantitative accuracy'
      ]
    },
    {
      id: 'EXP-GLIOMA-002',
      title: '3D Volumetric U-Net (OncoSense-3D-UNet) Asset & Compatibility Audit',
      type: '3D Volumetric Segmentation Benchmark Audit',
      status: 'ASSET VERIFIED',
      dataset: 'Dataset4_MU-Glioma-Post (Target Validation Cohort)',
      model: 'brats_3d_unet_kaggle_best.keras (~120 MB)',
      script: 'Research/Glioma/evaluation/oncosense/ (Pipeline Pending)',
      output: 'Model Checkpoint Verified on Disk',
      findings: [
        'Model file present under Research/Glioma/models/OncoSense-3D-UNet/',
        'Category A priority candidate for 3D multi-parametric volumetric segmentation',
        'Targeted for 3D spatial sub-region segmentation (Whole Tumor, Enhancing Tumor, Core) on local Dataset4 scans'
      ]
    },
    {
      id: 'EXP-GLIOMA-003',
      title: 'Kaggle Brain MRI Model Inventory & Patient Data Leakage Assessment',
      type: 'Systematic Model Inventory Audit',
      status: 'REPORT COMPLETED',
      dataset: 'Kaggle Model Inventory (7 Candidate Models)',
      model: 'Glioma_Model_Inventory.txt',
      script: 'Manual Systematic Audit & Review Protocol',
      output: 'Research/Glioma/reports/glioma-model-evaluation.md',
      findings: [
        'Identified severe redundancy: 6 out of 7 inventory models target identical 2D 4-class slice classification',
        'High risk of patient-level data leakage in 2D slice random splits',
        'Categorized candidate models: OncoSense-3D-UNet (Cat A), denseEfficient (Cat B), Xception (Cat C), rest set aside (Cat D)'
      ]
    }
  ];

  const plannedExperiments = [
    {
      id: 'EXP-GLIOMA-004 (Planned)',
      title: '15-to-4 Output Head Linear Mapping Probe',
      goal: 'Establish linear probe mapping between 15-class logit vector and 4-class Dataset2 labels to evaluate 4-class accuracy.'
    },
    {
      id: 'EXP-GLIOMA-005 (Planned)',
      title: '3D U-Net Volumetric Segmentation Benchmark on Dataset4',
      goal: 'Execute 3D multi-sequence MRI inference to generate whole tumor volume masks.'
    },
    {
      id: 'EXP-GLIOMA-006 (Planned)',
      title: 'Bimodal Feature Vector Fusion (Dataset1 Tabular + Dataset2 3,200D Vector)',
      goal: 'Evaluate early and intermediate graph fusion of 3,200D imaging embeddings with TCGA clinical hazards.'
    }
  ];

  return (
    <div>
      <CancerSubNav cancerType="glioma" />
      <SectionHeader 
        title="Glioma Empirical Experiments & Evaluation Runs"
        description="Authentic record of executed technical benchmarks, script outputs, and model evaluation runs under Research/Glioma/."
        badgeText="Empirical Run Log"
      />

      <div style={styles.sectionHeaderRow}>
        <h3 style={styles.sectionTitle}>Executed Technical Experiments</h3>
        <span style={styles.countBadge}>{actualExperiments.length} Runs Logged</span>
      </div>

      <div style={styles.grid}>
        {actualExperiments.map(exp => (
          <div key={exp.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.headerTitleRow}>
                <FlaskConical size={18} color="var(--royal-blue)" />
                <span style={styles.expId}>{exp.id}</span>
              </div>
              <span style={styles.statusBadge}>
                <CheckCircle2 size={12} />
                <span>{exp.status}</span>
              </span>
            </div>

            <h4 style={styles.expTitle}>{exp.title}</h4>
            <span style={styles.typeTag}>{exp.type}</span>

            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Dataset:</span>
                <span style={styles.infoVal}>{exp.dataset}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Model File:</span>
                <span style={styles.infoVal}>{exp.model}</span>
              </div>
            </div>

            <div style={styles.pathRow}>
              <div style={styles.pathBox}>
                <FileCode size={13} color="var(--cool-gray)" />
                <span style={styles.pathText}>{exp.script}</span>
              </div>
              <div style={styles.pathBox}>
                <HardDrive size={13} color="var(--cool-gray)" />
                <span style={styles.pathText}>{exp.output}</span>
              </div>
            </div>

            <div style={styles.findingsBox}>
              <span style={styles.findingsTitle}>Key Empirical Findings:</span>
              <ul style={styles.findingsList}>
                {exp.findings.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Planned Experiments Section */}
      <div style={{ marginTop: '36px' }}>
        <h3 style={styles.sectionTitle}>Planned Next-Stage Experiments</h3>
        <div style={styles.plannedGrid}>
          {plannedExperiments.map(pexp => (
            <div key={pexp.id} style={styles.plannedCard}>
              <div style={styles.plannedHeader}>
                <Clock size={16} color="#6366F1" />
                <span style={styles.plannedId}>{pexp.id}</span>
              </div>
              <h4 style={styles.plannedTitle}>{pexp.title}</h4>
              <p style={styles.plannedGoal}><strong>Research Goal:</strong> {pexp.goal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sectionHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '1.15rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  countBadge: {
    fontSize: '0.75rem',
    fontWeight: 700,
    backgroundColor: 'var(--royal-blue-light)',
    color: 'var(--royal-blue)',
    padding: '3px 10px',
    borderRadius: '12px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
    gap: '24px'
  },
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  expId: {
    fontSize: '0.85rem',
    fontWeight: 800,
    fontFamily: 'var(--font-mono)',
    color: 'var(--royal-blue)'
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.68rem',
    fontWeight: 800,
    backgroundColor: '#D1FAE5',
    color: '#065F46',
    padding: '4px 10px',
    borderRadius: '12px'
  },
  expTitle: {
    fontSize: '1.05rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  typeTag: {
    fontSize: '0.72rem',
    fontWeight: 600,
    backgroundColor: 'var(--cool-white)',
    color: 'var(--dark-muted)',
    padding: '4px 8px',
    borderRadius: '4px',
    alignSelf: 'flex-start'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    backgroundColor: 'var(--cool-white)',
    padding: '12px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-subtle)'
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  infoLabel: {
    fontSize: '0.68rem',
    color: 'var(--cool-gray)',
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  infoVal: {
    fontSize: '0.78rem',
    color: 'var(--dark-text)',
    fontWeight: 600
  },
  pathRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  pathBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--cool-white)',
    padding: '6px 10px',
    borderRadius: '4px',
    border: '1px solid var(--border-subtle)'
  },
  pathText: {
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--dark-muted)'
  },
  findingsBox: {
    backgroundColor: '#EFF6FF',
    border: '1px solid #BFDBFE',
    borderRadius: 'var(--radius-md)',
    padding: '12px 14px'
  },
  findingsTitle: {
    fontSize: '0.78rem',
    fontWeight: 700,
    color: '#1E40AF',
    display: 'block',
    marginBottom: '6px'
  },
  findingsList: {
    paddingLeft: '16px',
    margin: 0,
    fontSize: '0.78rem',
    color: '#1E3A8A',
    lineHeight: 1.5
  },
  plannedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
    gap: '16px'
  },
  plannedCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '18px',
    boxShadow: 'var(--shadow-sm)'
  },
  plannedHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px'
  },
  plannedId: {
    fontSize: '0.78rem',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    color: '#6366F1'
  },
  plannedTitle: {
    fontSize: '0.92rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)',
    marginBottom: '6px'
  },
  plannedGoal: {
    fontSize: '0.78rem',
    color: 'var(--dark-muted)',
    lineHeight: 1.45
  }
};
