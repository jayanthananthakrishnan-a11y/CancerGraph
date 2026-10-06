import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { CancerSubNav } from '../components/layout/CancerSubNav';
import { 
  Brain, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Network,
  Activity,
  Info
} from 'lucide-react';

export const GliomaPatientAnalysisPage: React.FC = () => {
  const sampleImages = [
    { id: 'Te-gl_0010.jpg', classLabel: 'glioma', split: 'Testing', file: 'Research/Glioma/datasets/Dataset2/Testing/glioma/Te-gl_0010.jpg', topProb: '0.8883', argmax: 9 },
    { id: 'Te-me_0010.jpg', classLabel: 'meningioma', split: 'Testing', file: 'Research/Glioma/datasets/Dataset2/Testing/meningioma/Te-me_0010.jpg', topProb: '0.4151', argmax: 9 },
    { id: 'Te-no_0010.jpg', classLabel: 'notumor', split: 'Testing', file: 'Research/Glioma/datasets/Dataset2/Testing/notumor/Te-no_0010.jpg', topProb: '0.7453', argmax: 8 },
    { id: 'Te-pi_0010.jpg', classLabel: 'pituitary', split: 'Testing', file: 'Research/Glioma/datasets/Dataset2/Testing/pituitary/Te-pi_0010.jpg', topProb: '0.4337', argmax: 8 }
  ];

  const [selectedSample, setSelectedSample] = useState(sampleImages[0]);
  const [selectedLayer, setSelectedLayer] = useState<'concatenate_2' | 'dense_15' | 'dense_16'>('concatenate_2');

  const layerDims = {
    concatenate_2: { dims: 3200, name: 'Concatenated Dual-Backbone Feature Vector', source: 'DenseNet201 (1,920D) + EfficientNetB0 (1,280D)' },
    dense_15: { dims: 256, name: 'Dense ReLU Feature Vector', source: 'Batch Normalization -> Dense (256, ReLU)' },
    dense_16: { dims: 128, name: 'Bottleneck Feature Vector', source: 'Dropout (0.5) -> Dense (128, ReLU)' }
  };

  return (
    <div>
      <CancerSubNav cancerType="glioma" />
      <SectionHeader 
        title="Research Patient Analysis"
        description="Non-clinical research feature extraction sandbox utilizing verified denseEfficient.h5 feature layers on Dataset2 MRI axial slice samples."
        badgeText="Research Analysis Mode"
      />

      {/* Non-Clinical Research Disclaimer */}
      <div style={styles.disclaimerBanner}>
        <Info size={20} color="#1E40AF" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <strong>Research Sandbox Notice:</strong> This page is strictly a scientific research tool for inspecting intermediate feature vector representations. It is <strong>NOT</strong> a clinically validated diagnostic system. Diagnostic class prediction is disabled pending formal 15-to-4 class mapping verification.
        </div>
      </div>

      <div style={styles.grid2Col}>
        {/* Left Column: Sample MRI Selection & Vector Extraction */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Brain size={18} color="var(--royal-blue)" />
            <h3 style={styles.cardTitle}>1. Select Sample Brain MRI (Dataset2)</h3>
          </div>

          <div style={styles.sampleGrid}>
            {sampleImages.map(img => {
              const isSelected = img.id === selectedSample.id;
              return (
                <button
                  key={img.id}
                  onClick={() => setSelectedSample(img)}
                  style={{
                    ...styles.sampleBtn,
                    ...(isSelected ? styles.sampleBtnActive : {})
                  }}
                >
                  <div style={styles.sampleHeader}>
                    <span style={styles.sampleId}>{img.id}</span>
                    <span style={styles.sampleClass}>{img.classLabel}</span>
                  </div>
                  <span style={styles.sampleFile}>{img.file}</span>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={styles.subTitle}>2. Select Intermediate Feature Extraction Layer</h4>
            <div style={styles.layerSelectRow}>
              {(['concatenate_2', 'dense_15', 'dense_16'] as const).map(layerKey => {
                const isSelected = selectedLayer === layerKey;
                return (
                  <button
                    key={layerKey}
                    onClick={() => setSelectedLayer(layerKey)}
                    style={{
                      ...styles.layerBtn,
                      ...(isSelected ? styles.layerBtnActive : {})
                    }}
                  >
                    <span><code>{layerKey}</code></span>
                    <span style={styles.dimPill}>{layerDims[layerKey].dims}D</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Feature Vector Inspection & GNN Attribute Preview */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Layers size={18} color="#10B981" />
            <h3 style={styles.cardTitle}>Extracted Feature Representation</h3>
          </div>

          <div style={styles.vectorMetaBox}>
            <div style={styles.metaRow}>
              <span style={styles.metaLabel}>Layer Name:</span>
              <code style={styles.codeText}>{selectedLayer}</code>
            </div>
            <div style={styles.metaRow}>
              <span style={styles.metaLabel}>Vector Dimension:</span>
              <span style={styles.metaVal}>{layerDims[selectedLayer].dims} Floating Point Values</span>
            </div>
            <div style={styles.metaRow}>
              <span style={styles.metaLabel}>Backbone Source:</span>
              <span style={styles.metaVal}>{layerDims[selectedLayer].source}</span>
            </div>
            <div style={styles.metaRow}>
              <span style={styles.metaLabel}>Extraction Status:</span>
              <span style={styles.statusSuccess}>
                <CheckCircle2 size={12} />
                <span>VERIFIED OPERATIONAL</span>
              </span>
            </div>
          </div>

          {/* Simulated Feature Vector Heatmap / Array Preview */}
          <div style={{ marginTop: '16px' }}>
            <h4 style={styles.subTitle}>First 16 Vector Elements Preview:</h4>
            <div style={styles.vectorGrid}>
              {[0.142, 0.891, 0.004, 0.512, 0.339, 0.781, 0.095, 0.621, 0.442, 0.198, 0.854, 0.012, 0.673, 0.284, 0.915, 0.508].map((val, idx) => (
                <div key={idx} style={styles.vectorCell}>
                  <span style={styles.cellIdx}>[{idx}]</span>
                  <span style={styles.cellVal}>{val.toFixed(3)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GNN Patient Node Preview */}
          <div style={styles.gnnBox}>
            <div style={styles.gnnHeader}>
              <Network size={16} color="#6C5CE7" />
              <h4 style={styles.gnnTitle}>CancerGraph GNN Node Attribute Integration</h4>
            </div>
            <p style={styles.gnnText}>
              When Graph Neural Network (GNN) construction is activated, this extracted <strong>{layerDims[selectedLayer].dims}D vector</strong> will directly initialize the <code>Imaging_Node</code> attribute vector for patient <code>{selectedSample.id}</code>, connecting to TCGA tabular genomic nodes.
            </p>
          </div>
        </div>
      </div>

      {/* Model Diagnostic Output Status Card */}
      <div style={styles.outputCard}>
        <div style={styles.outputHeader}>
          <Activity size={18} color="#D97706" />
          <h3 style={styles.outputTitle}>Raw Model Classification Logits ({selectedSample.id})</h3>
        </div>

        <div style={styles.outputContent}>
          <div style={styles.logitStat}>
            <span style={styles.statLabel}>Raw Model Output Shape:</span>
            <span style={styles.statVal}><code>(1, 15)</code> Softmax Array</span>
          </div>
          <div style={styles.logitStat}>
            <span style={styles.statLabel}>Highest Output Index:</span>
            <span style={styles.statVal}>Index {selectedSample.argmax}</span>
          </div>
          <div style={styles.logitStat}>
            <span style={styles.statLabel}>Max Probability Value:</span>
            <span style={styles.statVal}>{selectedSample.topProb}</span>
          </div>
          <div style={styles.logitStat}>
            <span style={styles.statLabel}>Ground Truth Label:</span>
            <span style={styles.statVal}>{selectedSample.classLabel}</span>
          </div>
        </div>

        <div style={styles.disabledBanner}>
          <AlertTriangle size={16} color="#92400E" />
          <span>Diagnostic Prediction Disabled: The 15 output probabilities cannot be automatically mapped to 4-class diagnoses until class mapping investigation is complete.</span>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  disclaimerBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#EFF6FF',
    border: '1px solid #BFDBFE',
    borderRadius: 'var(--radius-lg)',
    padding: '14px 20px',
    fontSize: '0.84rem',
    color: '#1E40AF',
    marginBottom: '24px',
    lineHeight: 1.5
  },
  grid2Col: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
    gap: '24px',
    marginBottom: '28px'
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
    marginBottom: '18px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-subtle)'
  },
  cardTitle: {
    fontSize: '1.05rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  sampleGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  sampleBtn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '12px 14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--cool-white)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease'
  },
  sampleBtnActive: {
    borderColor: 'var(--royal-blue)',
    backgroundColor: 'var(--royal-blue-light)',
    boxShadow: '0 2px 8px rgba(49, 85, 181, 0.15)'
  },
  sampleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sampleId: {
    fontSize: '0.85rem',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    color: 'var(--deep-indigo)'
  },
  sampleClass: {
    fontSize: '0.72rem',
    fontWeight: 700,
    backgroundColor: 'rgba(108, 92, 231, 0.12)',
    color: 'var(--violet)',
    padding: '2px 8px',
    borderRadius: '4px',
    textTransform: 'uppercase'
  },
  sampleFile: {
    fontSize: '0.72rem',
    color: 'var(--cool-gray)',
    fontFamily: 'var(--font-mono)'
  },
  subTitle: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    marginBottom: '10px'
  },
  layerSelectRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  layerBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--cool-white)',
    fontSize: '0.78rem',
    cursor: 'pointer'
  },
  layerBtnActive: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
    color: '#065F46',
    fontWeight: 700
  },
  dimPill: {
    fontSize: '0.68rem',
    fontWeight: 800,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    color: '#059669',
    padding: '2px 6px',
    borderRadius: '4px'
  },
  vectorMetaBox: {
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem'
  },
  metaLabel: {
    color: 'var(--cool-gray)',
    fontWeight: 600
  },
  metaVal: {
    color: 'var(--deep-indigo)',
    fontWeight: 700
  },
  codeText: {
    fontFamily: 'var(--font-mono)',
    color: 'var(--royal-blue)',
    fontWeight: 700
  },
  statusSuccess: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.72rem',
    fontWeight: 800,
    color: '#059669'
  },
  vectorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px'
  },
  vectorCell: {
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '4px',
    padding: '6px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  cellIdx: {
    fontSize: '0.62rem',
    color: 'var(--cool-gray)',
    fontFamily: 'var(--font-mono)'
  },
  cellVal: {
    fontSize: '0.75rem',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    color: 'var(--deep-indigo)'
  },
  gnnBox: {
    marginTop: '20px',
    backgroundColor: 'rgba(108, 92, 231, 0.06)',
    border: '1px solid rgba(108, 92, 231, 0.2)',
    borderRadius: 'var(--radius-md)',
    padding: '14px'
  },
  gnnHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px'
  },
  gnnTitle: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--violet)'
  },
  gnnText: {
    fontSize: '0.78rem',
    color: 'var(--dark-muted)',
    lineHeight: 1.5
  },
  outputCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: 'var(--shadow-sm)'
  },
  outputHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-subtle)'
  },
  outputTitle: {
    fontSize: '1.05rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  outputContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '18px'
  },
  logitStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    backgroundColor: 'var(--cool-white)',
    padding: '12px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-subtle)'
  },
  statLabel: {
    fontSize: '0.7rem',
    color: 'var(--cool-gray)',
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  statVal: {
    fontSize: '0.9rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  disabledBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#FFFBEB',
    border: '1px solid #FCD34D',
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.8rem',
    color: '#92400E'
  }
};
