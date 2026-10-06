import { GitMerge, FileText, ArrowRight, Check } from 'lucide-react';
import type { ModalityCategory } from '../../types/modality';

interface MultimodalWorkflowDiagramProps {
  activeModalities?: ModalityCategory[];
}

export const MultimodalWorkflowDiagram: React.FC<MultimodalWorkflowDiagramProps> = ({
  activeModalities = ['clinical', 'imaging', 'genomics', 'pathology', 'radiomics']
}) => {
  const isModalityActive = (m: ModalityCategory) => activeModalities.includes(m);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>CancerGraph Multimodal Pipeline Architecture</h3>
          <p style={styles.subtitle}>Modality-aware feature extraction, heterogeneous GNN graph fusion, and clinical decision output</p>
        </div>
        <span style={styles.badge}>Phase 1 Architectural Blueprint</span>
      </div>

      <div style={styles.workflowGrid}>
        {/* Stage 1: Input Modalities */}
        <div style={styles.stageCard}>
          <div style={styles.stageHeader}>
            <span style={styles.stageStep}>STEP 1</span>
            <h4 style={styles.stageTitle}>Input Modalities</h4>
          </div>

          <div style={styles.inputList}>
            <div style={{ ...styles.inputPill, opacity: isModalityActive('clinical') ? 1 : 0.4 }}>
              <span style={{ ...styles.dot, backgroundColor: '#3155B5' }} />
              <span style={styles.inputText}>Clinical Records</span>
              {isModalityActive('clinical') && <Check size={12} color="#3155B5" />}
            </div>
            <div style={{ ...styles.inputPill, opacity: isModalityActive('imaging') ? 1 : 0.4 }}>
              <span style={{ ...styles.dot, backgroundColor: '#5BC7D8' }} />
              <span style={styles.inputText}>Imaging (MRI/CT)</span>
              {isModalityActive('imaging') && <Check size={12} color="#5BC7D8" />}
            </div>
            <div style={{ ...styles.inputPill, opacity: isModalityActive('genomics') ? 1 : 0.4 }}>
              <span style={{ ...styles.dot, backgroundColor: '#6C5CE7' }} />
              <span style={styles.inputText}>Genomics & Omics</span>
              {isModalityActive('genomics') && <Check size={12} color="#6C5CE7" />}
            </div>
            <div style={{ ...styles.inputPill, opacity: isModalityActive('pathology') ? 1 : 0.4 }}>
              <span style={{ ...styles.dot, backgroundColor: '#A99AF5' }} />
              <span style={styles.inputText}>Digital Pathology</span>
              {isModalityActive('pathology') && <Check size={12} color="#A99AF5" />}
            </div>
            <div style={{ ...styles.inputPill, opacity: isModalityActive('radiomics') ? 1 : 0.4 }}>
              <span style={{ ...styles.dot, backgroundColor: '#9AA4B5' }} />
              <span style={styles.inputText}>Radiomics Features</span>
              {isModalityActive('radiomics') && <Check size={12} color="#9AA4B5" />}
            </div>
          </div>
        </div>

        <div style={styles.arrowCol}>
          <ArrowRight size={20} color="var(--royal-blue)" />
        </div>

        {/* Stage 2: Feature Encoders */}
        <div style={styles.stageCard}>
          <div style={styles.stageHeader}>
            <span style={styles.stageStep}>STEP 2</span>
            <h4 style={styles.stageTitle}>Modality Encoders</h4>
          </div>

          <div style={styles.encoderBox}>
            <div style={styles.encoderItem}>Tabular MLP Encoder</div>
            <div style={styles.encoderItem}>3D Vision ConvNeXt/Swin</div>
            <div style={styles.encoderItem}>Genomic Transformer</div>
            <div style={styles.encoderItem}>WSI Attention MIL</div>
            <div style={styles.encoderItem}>Radiomics Feature Mapping</div>
          </div>
        </div>

        <div style={styles.arrowCol}>
          <ArrowRight size={20} color="var(--violet)" />
        </div>

        {/* Stage 3: Multimodal Fusion & GNN */}
        <div style={{ ...styles.stageCard, ...styles.stageCardDark }}>
          <div style={styles.stageHeader}>
            <span style={{ ...styles.stageStep, color: '#A99AF5' }}>STEP 3</span>
            <h4 style={{ ...styles.stageTitle, color: '#FFFFFF' }}>GNN & Multimodal Fusion</h4>
          </div>

          <div style={styles.gnnInnerBox}>
            <GitMerge size={24} color="#6C5CE7" />
            <span style={styles.gnnTitle}>Heterogeneous Graph Transformer</span>
            <p style={styles.gnnDesc}>Constructs patient-tissue-biomarker interaction graphs dynamically evaluating active modality nodes.</p>
          </div>
        </div>

        <div style={styles.arrowCol}>
          <ArrowRight size={20} color="var(--soft-cyan)" />
        </div>

        {/* Stage 4: Research & Clinical Output */}
        <div style={styles.stageCard}>
          <div style={styles.stageHeader}>
            <span style={styles.stageStep}>STEP 4</span>
            <h4 style={styles.stageTitle}>Outputs & Reports</h4>
          </div>

          <div style={styles.outputGrid}>
            <div style={styles.outputPill}>Detection & Localization</div>
            <div style={styles.outputPill}>Subtype Classification</div>
            <div style={styles.outputPill}>Risk Assessment</div>
            <div style={styles.outputPill}>3D Segmentation Mask</div>
            <div style={styles.reportPill}>
              <FileText size={12} color="#3155B5" />
              <span>Structured Clinical Report</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: 'var(--shadow-sm)',
    margin: '20px 0'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px'
  },
  title: {
    fontSize: '1.05rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  subtitle: {
    fontSize: '0.8rem',
    color: 'var(--dark-muted)',
    marginTop: '2px'
  },
  badge: {
    fontSize: '0.72rem',
    fontWeight: 700,
    padding: '4px 10px',
    borderRadius: '12px',
    backgroundColor: 'var(--royal-blue-light)',
    color: 'var(--royal-blue)',
    border: '1px solid rgba(49, 85, 181, 0.2)'
  },
  workflowGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr auto 1.2fr auto 1fr',
    alignItems: 'center',
    gap: '10px'
  },
  stageCard: {
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '14px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  stageCardDark: {
    backgroundColor: 'var(--deep-surface)',
    borderColor: 'var(--border-dark)'
  },
  stageHeader: {
    marginBottom: '10px'
  },
  stageStep: {
    fontSize: '0.62rem',
    fontWeight: 800,
    color: 'var(--royal-blue)',
    letterSpacing: '0.05em'
  },
  stageTitle: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  inputList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  inputPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '5px 8px',
    borderRadius: '6px',
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border-subtle)',
    fontSize: '0.74rem'
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%'
  },
  inputText: {
    flex: 1,
    fontWeight: 600,
    color: 'var(--dark-text)'
  },
  arrowCol: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  encoderBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  encoderItem: {
    fontSize: '0.72rem',
    fontWeight: 600,
    padding: '6px',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border-subtle)',
    color: 'var(--dark-muted)',
    textAlign: 'center'
  },
  gnnInnerBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '8px',
    padding: '12px 6px'
  },
  gnnTitle: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#FFFFFF'
  },
  gnnDesc: {
    fontSize: '0.7rem',
    color: '#9AA4B5',
    lineHeight: 1.35
  },
  outputGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  outputPill: {
    fontSize: '0.72rem',
    fontWeight: 600,
    padding: '5px 8px',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    color: 'var(--dark-text)'
  },
  reportPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.72rem',
    fontWeight: 700,
    padding: '6px 8px',
    borderRadius: '4px',
    backgroundColor: 'var(--royal-blue-light)',
    border: '1px solid rgba(49, 85, 181, 0.2)',
    color: 'var(--royal-blue)'
  }
};
