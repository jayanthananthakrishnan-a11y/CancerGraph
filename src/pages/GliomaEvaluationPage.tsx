import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { CancerSubNav } from '../components/layout/CancerSubNav';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ArrowRight
} from 'lucide-react';

export const GliomaEvaluationPage: React.FC = () => {
  const sampleResults = [
    { filename: 'Te-gl_0010.jpg', trueLabel: 'glioma', shape: '(15,)', argmax: 'Index 9', topProb: '0.8883 (88.83%)' },
    { filename: 'Te-gl_0012.jpg', trueLabel: 'glioma', shape: '(15,)', argmax: 'Index 9', topProb: '0.8241 (82.41%)' },
    { filename: 'Te-me_0010.jpg', trueLabel: 'meningioma', shape: '(15,)', argmax: 'Index 9', topProb: '0.4151 (41.51%)' },
    { filename: 'Te-me_0012.jpg', trueLabel: 'meningioma', shape: '(15,)', argmax: 'Index 9', topProb: '0.4632 (46.32%)' },
    { filename: 'Te-no_0010.jpg', trueLabel: 'notumor', shape: '(15,)', argmax: 'Index 8', topProb: '0.7453 (74.53%)' },
    { filename: 'Te-no_0012.jpg', trueLabel: 'notumor', shape: '(15,)', argmax: 'Index 8', topProb: '0.5401 (54.01%)' },
    { filename: 'Te-pi_0010.jpg', trueLabel: 'pituitary', shape: '(15,)', argmax: 'Index 8', topProb: '0.4337 (43.37%)' },
    { filename: 'Te-pi_0012.jpg', trueLabel: 'pituitary', shape: '(15,)', argmax: 'Index 8', topProb: '0.4859 (48.59%)' }
  ];

  return (
    <div>
      <CancerSubNav cancerType="glioma" />
      <SectionHeader 
        title="Glioma Model Empirical Evaluation"
        description="Technical evaluation artifacts and empirical findings for denseEfficient.h5 on Dataset2 (Research/Glioma/evaluation/)."
        badgeText="Empirical Findings"
      />

      {/* Warning Box: 15-Class Discrepancy & Next Step */}
      <div style={styles.warningBanner}>
        <AlertTriangle size={24} color="#D97706" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={styles.warningTitle}>CRITICAL TECHNICAL FINDING & BLOCKER</div>
          <p style={styles.warningText}>
            The <code>denseEfficient.h5</code> model produces a <strong>15-dimensional softmax output vector</strong>, whereas <code>Dataset2</code> contains <strong>4 target classes</strong> (<code>glioma</code>, <code>meningioma</code>, <code>notumor</code>, <code>pituitary</code>). Because the 15 output indices are not yet mapped to the 4 ground truth classes, <strong>quantitative 4-class accuracy cannot yet be claimed</strong>.
          </p>
          <div style={styles.nextStepBox}>
            <ArrowRight size={14} color="#D97706" />
            <span>Next-Step Action Required: <strong>Class mapping investigation required.</strong></span>
          </div>
        </div>
      </div>

      {/* Model Spec Overview */}
      <div style={styles.grid2Col}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Cpu size={18} color="var(--royal-blue)" />
            <h3 style={styles.cardTitle}>Model & Environment Specifications</h3>
          </div>
          <ul style={styles.specList}>
            <li><strong>Model File:</strong> <code>Research/Glioma/models/Brain Tumor Classifier/denseEfficient.h5</code> (~101.5 MB)</li>
            <li><strong>Evaluated Dataset:</strong> <code>Research/Glioma/datasets/Dataset2</code> (7,200 images total)</li>
            <li><strong>Evaluation Script:</strong> <code>Research/Glioma/evaluation/brain_tumor_classifier/evaluate_dense_efficient.py</code></li>
            <li><strong>Output Log File:</strong> <code>Research/Glioma/evaluation/results/dense_efficient_evaluation.json</code></li>
            <li><strong>Python & TF Version:</strong> Python 3.11.9, TensorFlow 2.21.0, <code>tf_keras</code> (2.21.0)</li>
            <li><strong>Framework Requirement:</strong> Setting <code>os.environ["TF_USE_LEGACY_KERAS"] = "1"</code> or importing <code>tf_keras</code> is required because layer names contain slashes (e.g. <code>conv1/conv</code>).</li>
            <li><strong>Total Parameters:</strong> 23,238,642 (860,687 trainable, 22,377,955 non-trainable)</li>
            <li><strong>Input Format:</strong> <code>(None, 224, 224, 3)</code> RGB float image tensor</li>
            <li><strong>Output Format:</strong> <code>(None, 15)</code> softmax probabilities</li>
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Layers size={18} color="#10B981" />
            <h3 style={styles.cardTitle}>Verified Feature Vector Extraction for GNN</h3>
          </div>
          <p style={styles.cardDesc}>
            While final diagnostic classification is under evaluation, intermediate feature vector extraction is <strong>fully verified and operational</strong> for CancerGraph patient graph nodes:
          </p>
          <div style={styles.layerList}>
            <div style={styles.layerBox}>
              <div style={styles.layerHeader}>
                <CheckCircle2 size={14} color="#10B981" />
                <span>Layer: <code>concatenate_2</code></span>
                <span style={styles.dimBadge}>3,200-dimensional</span>
              </div>
              <p style={styles.layerDesc}>Combined DenseNet201 (1,920D) + EfficientNetB0 (1,280D) feature vector. Primary candidate for imaging node attribute initialization in CancerGraph GNN.</p>
            </div>

            <div style={styles.layerBox}>
              <div style={styles.layerHeader}>
                <CheckCircle2 size={14} color="#10B981" />
                <span>Layer: <code>dense_15</code></span>
                <span style={styles.dimBadge}>256-dimensional</span>
              </div>
              <p style={styles.layerDesc}>Dense ReLU projection vector following batch normalization.</p>
            </div>

            <div style={styles.layerBox}>
              <div style={styles.layerHeader}>
                <CheckCircle2 size={14} color="#10B981" />
                <span>Layer: <code>dense_16</code></span>
                <span style={styles.dimBadge}>128-dimensional</span>
              </div>
              <p style={styles.layerDesc}>Bottleneck feature vector prior to classification head.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Empirical Batch Prediction Table */}
      <div style={{ marginTop: '28px' }}>
        <h3 style={styles.sectionTitle}>Empirical Batch Inference Execution Log (Dataset2 Testing Split)</h3>
        <p style={styles.sectionDesc}>Actual output vector log from executing <code>evaluate_dense_efficient.py</code> against representative Dataset2 test samples.</p>

        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Sample Image</th>
                <th style={styles.th}>Ground Truth Label</th>
                <th style={styles.th}>Model Output Shape</th>
                <th style={styles.th}>Argmax Output Index</th>
                <th style={styles.th}>Top Class Probability</th>
                <th style={styles.th}>Interpretation Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleResults.map((row, idx) => (
                <tr key={idx} style={idx % 2 === 0 ? styles.trEven : {}}>
                  <td style={styles.tdMonospace}>{row.filename}</td>
                  <td style={styles.tdBold}>{row.trueLabel}</td>
                  <td style={styles.tdMonospace}>{row.shape}</td>
                  <td style={styles.tdMonospace}>{row.argmax}</td>
                  <td style={styles.tdMonospace}>{row.topProb}</td>
                  <td style={styles.tdBadge}>
                    <span style={styles.pendingBadge}>15-to-4 Mapping Pending</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  warningBanner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    backgroundColor: '#FFFBEB',
    border: '2px solid #F59E0B',
    borderRadius: 'var(--radius-lg)',
    padding: '20px 24px',
    marginBottom: '28px',
    boxShadow: 'var(--shadow-sm)'
  },
  warningTitle: {
    fontSize: '0.88rem',
    fontWeight: 800,
    color: '#B45309',
    letterSpacing: '0.04em',
    marginBottom: '6px'
  },
  warningText: {
    fontSize: '0.85rem',
    color: '#92400E',
    lineHeight: 1.55,
    marginBottom: '10px'
  },
  nextStepBox: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    color: '#B45309'
  },
  grid2Col: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
    gap: '24px'
  },
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: 'var(--shadow-sm)'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-subtle)'
  },
  cardTitle: {
    fontSize: '1.05rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  cardDesc: {
    fontSize: '0.82rem',
    color: 'var(--dark-muted)',
    lineHeight: 1.5,
    marginBottom: '16px'
  },
  specList: {
    paddingLeft: '18px',
    margin: 0,
    fontSize: '0.82rem',
    color: 'var(--dark-text)',
    lineHeight: 1.7,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  layerList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  layerBox: {
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '12px'
  },
  layerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.82rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    marginBottom: '4px'
  },
  dimBadge: {
    fontSize: '0.68rem',
    fontWeight: 700,
    backgroundColor: '#D1FAE5',
    color: '#065F46',
    padding: '2px 8px',
    borderRadius: '10px',
    marginLeft: 'auto'
  },
  layerDesc: {
    fontSize: '0.78rem',
    color: 'var(--dark-muted)',
    lineHeight: 1.45
  },
  sectionTitle: {
    fontSize: '1.15rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  sectionDesc: {
    fontSize: '0.82rem',
    color: 'var(--dark-muted)',
    marginBottom: '16px'
  },
  tableCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '0.82rem'
  },
  th: {
    backgroundColor: 'var(--cool-white)',
    color: 'var(--deep-indigo)',
    fontWeight: 700,
    padding: '12px 16px',
    borderBottom: '1px solid var(--border)'
  },
  tdMonospace: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.78rem',
    color: 'var(--dark-text)',
    padding: '12px 16px',
    borderBottom: '1px solid var(--border-subtle)'
  },
  tdBold: {
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    padding: '12px 16px',
    borderBottom: '1px solid var(--border-subtle)'
  },
  tdBadge: {
    padding: '12px 16px',
    borderBottom: '1px solid var(--border-subtle)'
  },
  trEven: {
    backgroundColor: 'rgba(248, 250, 252, 0.6)'
  },
  pendingBadge: {
    fontSize: '0.7rem',
    fontWeight: 700,
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    padding: '3px 8px',
    borderRadius: '4px'
  }
};
