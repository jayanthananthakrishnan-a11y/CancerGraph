import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { CancerSubNav } from '../components/layout/CancerSubNav';
import { 
  UserCheck, 
  Layers, 
  Settings, 
  Cpu, 
  GitMerge, 
  Network, 
  Activity, 
  CheckCircle2, 
  Clock,
  ArrowDown
} from 'lucide-react';

export const GliomaArchitecturePage: React.FC = () => {
  const pipelineSteps = [
    {
      step: 1,
      title: 'Patient / Research Cohort Ingestion',
      status: 'IMPLEMENTED',
      icon: UserCheck,
      desc: 'Collection of local Glioma research cohorts (Dataset1 TCGA, Dataset2 Kaggle 2D, Dataset3 Binary, Dataset4 MU-Glioma-Post).',
      details: ['Tabular clinical records', '2D axial RGB MRI slice images', '3D multi-parametric volumes (T1, T1ce, T2, FLAIR)', 'TCGA somatic gene mutation profiles']
    },
    {
      step: 2,
      title: 'Modality Data Sources',
      status: 'IMPLEMENTED',
      icon: Layers,
      desc: 'Separation into independent modality input streams.',
      details: ['Clinical Demographics & KPS', 'Imaging Slices & Volumes', 'Genomic Mutation Panels', 'Post-Op Volumetric Metrics']
    },
    {
      step: 3,
      title: 'Modality-Specific Preprocessing',
      status: 'IMPLEMENTED',
      icon: Settings,
      desc: 'Standardized array formatting and spatial normalization.',
      details: ['Image slice resizing to (224, 224, 3) RGB float arrays', 'Volumetric intensity normalization & skull stripping', 'Categorical genomic encoding']
    },
    {
      step: 4,
      title: 'Model-Specific Feature Extraction',
      status: 'IMPLEMENTED',
      icon: Cpu,
      desc: 'Extracting bottleneck feature representations from verified pretrained backbones.',
      details: ['denseEfficient.h5 Dual-Backbone: 3,200D (concatenate_2), 256D (dense_15), 128D (dense_16)', 'OncoSense-3D-UNet: 3D spatial segmentation mask extraction']
    },
    {
      step: 5,
      title: 'Multimodal Feature Representation',
      status: 'IN EVALUATION',
      icon: GitMerge,
      desc: 'Unifying multi-dimensional feature vectors into a standardized patient node attribute space.',
      details: ['15-to-4 class mapping verification', 'Feature normalization & alignment across modalities', 'Dimension reduction & embedding audit']
    },
    {
      step: 6,
      title: 'Graph Construction',
      status: 'PLANNED',
      icon: Network,
      desc: 'Constructing heterogeneous patient-tissue-genomic graph structures.',
      details: ['Patient Nodes (Clinical attributes)', 'Imaging Nodes (Extracted 3,200D feature vectors)', 'Genomic Nodes (IDH1/2, MGMT, 1p/19q)', 'Inter-node relational edges']
    },
    {
      step: 7,
      title: 'Graph Neural Network (GNN)',
      status: 'PLANNED',
      icon: GitMerge,
      desc: 'Message passing across heterogeneous graph edges.',
      details: ['Heterogeneous Graph Attention (HGT) layer', 'Non-linear cross-modality feature fusion', 'Node & graph embedding propagation']
    },
    {
      step: 8,
      title: 'Glioma Prediction & Risk Analysis',
      status: 'PLANNED',
      icon: Activity,
      desc: 'Multimodal downstream inference.',
      details: ['Integrated tumor subtype classification', '3D volumetric resection mask overlay', 'Overall survival hazard & progression risk']
    }
  ];

  return (
    <div>
      <CancerSubNav cancerType="glioma" />
      <SectionHeader 
        title="Glioma Multimodal Research Pipeline Architecture"
        description="End-to-end research flow explaining data ingestion, feature extraction, graph construction, and GNN propagation for academic evaluation."
        badgeText="Pipeline Architecture"
      />

      <div style={styles.legendCard}>
        <h4 style={styles.legendTitle}>Implementation Stage Legend:</h4>
        <div style={styles.legendRow}>
          <span style={styles.badgeImplemented}>
            <CheckCircle2 size={12} />
            <span>IMPLEMENTED</span>
          </span>
          <span style={styles.badgeEvaluation}>
            <Clock size={12} />
            <span>IN EVALUATION</span>
          </span>
          <span style={styles.badgePlanned}>
            <Clock size={12} />
            <span>PLANNED</span>
          </span>
        </div>
      </div>

      <div style={styles.flowContainer}>
        {pipelineSteps.map((item, index) => {
          const StepIcon = item.icon;
          const isEvaluation = item.status === 'IN EVALUATION';
          const isPlanned = item.status === 'PLANNED';

          let statusBadgeClass = styles.badgeImplemented;
          let borderColor = '#10B981';

          if (isEvaluation) {
            statusBadgeClass = styles.badgeEvaluation;
            borderColor = '#F59E0B';
          } else if (isPlanned) {
            statusBadgeClass = styles.badgePlanned;
            borderColor = '#6366F1';
          }

          return (
            <React.Fragment key={item.step}>
              <div style={{ ...styles.stepCard, borderLeftColor: borderColor }}>
                <div style={styles.stepHeader}>
                  <div style={styles.stepNumIcon}>
                    <span style={styles.stepNum}>{item.step}</span>
                    <StepIcon size={20} color="var(--royal-blue)" />
                  </div>
                  <div>
                    <h3 style={styles.stepTitle}>{item.title}</h3>
                  </div>
                  <span style={statusBadgeClass}>{item.status}</span>
                </div>

                <p style={styles.stepDesc}>{item.desc}</p>

                <div style={styles.detailBox}>
                  <span style={styles.detailLabel}>Key Components / Deliverables:</span>
                  <ul style={styles.detailList}>
                    {item.details.map((d, dIdx) => (
                      <li key={dIdx}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {index < pipelineSteps.length - 1 && (
                <div style={styles.arrowRow}>
                  <ArrowDown size={20} color="var(--cool-gray)" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  legendCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '16px 20px',
    marginBottom: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
    boxShadow: 'var(--shadow-sm)'
  },
  legendTitle: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  legendRow: {
    display: 'flex',
    gap: '12px'
  },
  badgeImplemented: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.72rem',
    fontWeight: 800,
    backgroundColor: '#D1FAE5',
    color: '#065F46',
    padding: '4px 10px',
    borderRadius: '12px'
  },
  badgeEvaluation: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.72rem',
    fontWeight: 800,
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    padding: '4px 10px',
    borderRadius: '12px'
  },
  badgePlanned: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.72rem',
    fontWeight: 800,
    backgroundColor: '#E0E7FF',
    color: '#3730A3',
    padding: '4px 10px',
    borderRadius: '12px'
  },
  flowContainer: {
    maxWidth: '840px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column'
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderLeftWidth: '6px',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: 'var(--shadow-sm)'
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '12px',
    flexWrap: 'wrap'
  },
  stepNumIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  stepNum: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'var(--royal-blue-light)',
    color: 'var(--royal-blue)',
    fontWeight: 800,
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepTitle: {
    fontSize: '1.1rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  stepDesc: {
    fontSize: '0.88rem',
    color: 'var(--dark-text)',
    lineHeight: 1.55,
    marginBottom: '14px'
  },
  detailBox: {
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '12px 16px'
  },
  detailLabel: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--cool-gray)',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '6px'
  },
  detailList: {
    paddingLeft: '18px',
    margin: 0,
    fontSize: '0.8rem',
    color: 'var(--dark-muted)',
    lineHeight: 1.5
  },
  arrowRow: {
    display: 'flex',
    justifyContent: 'center',
    padding: '12px 0'
  }
};
