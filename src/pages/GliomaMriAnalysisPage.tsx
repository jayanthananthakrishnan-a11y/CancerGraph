import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { CancerSubNav } from '../components/layout/CancerSubNav';
import { 
  Brain, 
  Upload, 
  Play, 
  AlertTriangle, 
  Server, 
  Info,
  RefreshCw,
  Cpu,
  CheckCircle
} from 'lucide-react';

interface InferenceResult {
  model_name: string;
  model_version: string;
  classes: string[];
  predicted_class: string;
  predicted_index: number;
  confidence: number;
  probabilities: Record<string, number>;
  disclaimer: string;
}

interface SampleItem {
  name: string;
  id: string;
  classLabel: string;
  path: string;
}

export const GliomaMriAnalysisPage: React.FC = () => {
  const sampleImages: SampleItem[] = [
    {
      name: 'Sample Glioma (Te-gl_10.jpg)',
      id: 'glioma-sample',
      classLabel: 'glioma',
      path: 'Research/Glioma/datasets/Dataset2/Testing/glioma/Te-gl_10.jpg'
    },
    {
      name: 'Sample Meningioma (Te-me_10.jpg)',
      id: 'meningioma-sample',
      classLabel: 'meningioma',
      path: 'Research/Glioma/datasets/Dataset2/Testing/meningioma/Te-me_10.jpg'
    },
    {
      name: 'Sample No Tumor (Te-no_10.jpg)',
      id: 'notumor-sample',
      classLabel: 'notumor',
      path: 'Research/Glioma/datasets/Dataset2/Testing/notumor/Te-no_10.jpg'
    },
    {
      name: 'Sample Pituitary (Te-pi_10.jpg)',
      id: 'pituitary-sample',
      classLabel: 'pituitary',
      path: 'Research/Glioma/datasets/Dataset2/Testing/pituitary/Te-pi_10.jpg'
    }
  ];

  const [selectedSample, setSelectedSample] = useState<SampleItem>(sampleImages[0]);
  const [customImageDataUrl, setCustomImageDataUrl] = useState<string | null>(null);
  const [activeImageDataUrl, setActiveImageDataUrl] = useState<string | null>(null);

  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<InferenceResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const API_BASE = 'http://127.0.0.1:5000';

  const fetchSampleImageData = async (samplePath: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/sample_image?path=${encodeURIComponent(samplePath)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.data_url) {
          setActiveImageDataUrl(data.data_url);
        }
      }
    } catch {
      // Server offline; placeholder will show until server connects
    }
  };

  const checkApiHealth = async () => {
    setApiStatus('checking');
    try {
      const res = await fetch(`${API_BASE}/api/health`);
      if (res.ok) {
        setApiStatus('online');
        if (!customImageDataUrl && selectedSample) {
          fetchSampleImageData(selectedSample.path);
        }
      } else {
        setApiStatus('offline');
      }
    } catch {
      setApiStatus('offline');
    }
  };

  useEffect(() => {
    checkApiHealth();
  }, []);

  const handleSampleSelect = (sample: SampleItem) => {
    setSelectedSample(sample);
    setCustomImageDataUrl(null);
    setActiveImageDataUrl(null);
    setResult(null);
    setErrorMsg(null);
    fetchSampleImageData(sample.path);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string;
      setCustomImageDataUrl(dataUrl);
      setActiveImageDataUrl(dataUrl);
      setResult(null);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const runInference = async () => {
    setLoading(true);
    setErrorMsg(null);

    const payload: Record<string, string> = {};
    if (customImageDataUrl) {
      payload.image = customImageDataUrl;
    } else {
      payload.image_path = selectedSample.path;
      if (activeImageDataUrl) {
        payload.image = activeImageDataUrl;
      }
    }

    try {
      const response = await fetch(`${API_BASE}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || `Inference server returned status ${response.status}`);
      }

      setResult(responseData);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to connect to local Python inference server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CancerSubNav cancerType="glioma" />
      <SectionHeader 
        title="Interactive Glioma MRI Analysis (4-Class Classification)"
        description="Functional end-to-end ML inference prototype connected to local trained model glioma_dataset2_classifier.keras."
        badgeText="Functional ML Prototype"
      />

      {/* Backend API Server Status Banner */}
      <div style={styles.apiBanner}>
        <div style={styles.apiStatusLeft}>
          <Server size={18} color={apiStatus === 'online' ? '#10B981' : '#F59E0B'} />
          <div>
            <span style={styles.apiStatusTitle}>Local Python Inference API Status:</span>
            <span style={{
              ...styles.apiStatusPill,
              backgroundColor: apiStatus === 'online' ? '#D1FAE5' : '#FEF3C7',
              color: apiStatus === 'online' ? '#065F46' : '#92400E'
            }}>
              {apiStatus === 'online' ? 'ONLINE (http://127.0.0.1:5000)' : apiStatus === 'checking' ? 'CHECKING...' : 'OFFLINE (Run inference_api.py)'}
            </span>
          </div>
        </div>
        <button onClick={checkApiHealth} className="btn btn-secondary btn-sm">
          <RefreshCw size={14} />
          <span>Ping API Server</span>
        </button>
      </div>

      <div style={styles.grid2Col}>
        {/* Left Column: Image Selection & Preview */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Brain size={18} color="var(--royal-blue)" />
            <h3 style={styles.cardTitle}>1. Select or Upload Brain MRI Slice</h3>
          </div>

          {/* Sample Images Selection */}
          <div style={{ marginBottom: '16px' }}>
            <span style={styles.inputLabel}>Pre-loaded Dataset2 Test Samples:</span>
            <div style={styles.sampleList}>
              {sampleImages.map(s => {
                const isSelected = !customImageDataUrl && selectedSample.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSampleSelect(s)}
                    style={{
                      ...styles.sampleBtn,
                      ...(isSelected ? styles.sampleBtnActive : {})
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                      <span style={styles.sampleBtnTitle}>{s.name}</span>
                      {isSelected && <CheckCircle size={14} color="var(--royal-blue)" style={{ marginLeft: 'auto' }} />}
                    </div>
                    <span style={styles.sampleBtnPath}>{s.path}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* File Upload Option */}
          <div style={{ marginBottom: '20px' }}>
            <span style={styles.inputLabel}>Or Upload Local MRI File (.jpg, .png):</span>
            <label style={styles.fileUploadLabel}>
              <Upload size={16} color="var(--royal-blue)" />
              <span>Choose Image File...</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                style={{ display: 'none' }}
              />
            </label>
            {customImageDataUrl && (
              <span style={styles.customFileNotice}>Custom image file loaded</span>
            )}
          </div>

          {/* MRI Image Preview */}
          <div style={styles.previewBox}>
            <span style={styles.previewTitle}>
              {customImageDataUrl ? 'Uploaded MRI Image Preview:' : `Selected Dataset2 Image Preview (${selectedSample.classLabel}):`}
            </span>
            <div style={styles.previewImgContainer}>
              {activeImageDataUrl ? (
                <img 
                  src={activeImageDataUrl} 
                  alt="Selected Brain MRI" 
                  style={styles.previewImg}
                />
              ) : (
                <div style={styles.noImgBox}>
                  <Brain size={32} color="var(--cool-gray)" />
                  <span style={{ fontSize: '0.75rem', color: 'var(--cool-gray)', marginTop: '8px' }}>
                    {apiStatus === 'online' ? 'Loading slice preview...' : selectedSample.path}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Run Inference Button */}
          <button 
            onClick={runInference} 
            className="btn btn-violet"
            style={{ width: '100%', marginTop: '20px' }}
            disabled={loading}
          >
            {loading ? <RefreshCw size={16} className="spin" /> : <Play size={16} />}
            <span>{loading ? 'Running Local ML Inference...' : 'Execute Model Inference'}</span>
          </button>
        </div>

        {/* Right Column: Real Model Prediction Results */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Cpu size={18} color="#10B981" />
            <h3 style={styles.cardTitle}>2. Trained Model Inference Output</h3>
          </div>

          {errorMsg && (
            <div style={styles.errorBox}>
              <AlertTriangle size={18} color="#B91C1C" />
              <div>
                <strong>Inference Server Diagnostic Notice:</strong>
                <p style={{ marginTop: '4px', fontSize: '0.8rem' }}>{errorMsg}</p>
                <div style={styles.cmdInstruction}>
                  To start local Python inference server, run:<br />
                  <code>python Research/Glioma/evaluation/brain_tumor_classifier/inference_api.py</code>
                </div>
              </div>
            </div>
          )}

          {result ? (
            <div>
              {/* Model Version & Metadata */}
              <div style={styles.modelMetaBox}>
                <div style={styles.metaRow}>
                  <span style={styles.metaLabel}>Trained Model:</span>
                  <code style={styles.codeVal}>{result.model_name}</code>
                </div>
                <div style={styles.metaRow}>
                  <span style={styles.metaLabel}>Architecture:</span>
                  <span style={styles.metaVal}>{result.model_version}</span>
                </div>
              </div>

              {/* Predicted Class Highlight Badge */}
              <div style={styles.predictionCard}>
                <span style={styles.predTag}>Predicted Class Output:</span>
                <h2 style={styles.predClassTitle}>{result.predicted_class.toUpperCase()}</h2>
                <span style={styles.confidenceText}>Confidence: {(result.confidence * 100).toFixed(2)}%</span>
              </div>

              {/* 4-Class Probabilities Breakdown */}
              <div style={{ marginTop: '20px' }}>
                <h4 style={styles.probSectionTitle}>Actual 4-Class Softmax Probability Breakdown:</h4>
                <div style={styles.probList}>
                  {Object.entries(result.probabilities).map(([clsName, probVal]) => {
                    const isTop = clsName === result.predicted_class;
                    const percentage = (probVal * 100).toFixed(2);
                    return (
                      <div key={clsName} style={styles.probItem}>
                        <div style={styles.probHeader}>
                          <span style={{
                            ...styles.probName,
                            fontWeight: isTop ? 800 : 600,
                            color: isTop ? 'var(--deep-indigo)' : 'var(--dark-text)'
                          }}>
                            {clsName} {isTop && <span style={styles.topTag}>Predicted Target</span>}
                          </span>
                          <span style={styles.probValText}>{percentage}% ({probVal.toFixed(4)})</span>
                        </div>
                        <div style={styles.barTrack}>
                          <div style={{
                            ...styles.barFill,
                            width: `${percentage}%`,
                            backgroundColor: isTop ? '#6C5CE7' : '#94A3B8'
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mandatory Non-Clinical Research Disclaimer */}
              <div style={styles.researchDisclaimer}>
                <Info size={16} color="#1E40AF" />
                <span><strong>Research classification — not a clinical diagnosis.</strong> This metric is generated strictly for baseline algorithm evaluation on Dataset2.</span>
              </div>
            </div>
          ) : (
            <div style={styles.awaitingBox}>
              <Brain size={48} color="var(--cool-gray)" style={{ opacity: 0.5 }} />
              <h4 style={styles.awaitingTitle}>Awaiting Model Execution</h4>
              <p style={styles.awaitingDesc}>
                Select an MRI slice on the left and click <strong>Execute Model Inference</strong> to send the image to <code>glioma_dataset2_classifier.keras</code> and retrieve actual class probabilities.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  apiBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '14px 20px',
    marginBottom: '24px',
    boxShadow: 'var(--shadow-sm)'
  },
  apiStatusLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  apiStatusTitle: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    marginRight: '8px'
  },
  apiStatusPill: {
    fontSize: '0.72rem',
    fontWeight: 800,
    padding: '3px 10px',
    borderRadius: '12px'
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
    marginBottom: '18px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-subtle)'
  },
  cardTitle: {
    fontSize: '1.05rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  inputLabel: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    display: 'block',
    marginBottom: '8px'
  },
  sampleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  sampleBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2px',
    padding: '10px 12px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--cool-white)',
    cursor: 'pointer',
    textAlign: 'left'
  },
  sampleBtnActive: {
    borderColor: 'var(--royal-blue)',
    backgroundColor: 'var(--royal-blue-light)'
  },
  sampleBtnTitle: {
    fontSize: '0.82rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  sampleBtnPath: {
    fontSize: '0.7rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--cool-gray)'
  },
  fileUploadLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '9px 16px',
    borderRadius: 'var(--radius-md)',
    border: '1px dashed var(--royal-blue)',
    backgroundColor: 'var(--royal-blue-light)',
    color: 'var(--royal-blue)',
    fontWeight: 600,
    fontSize: '0.82rem',
    cursor: 'pointer'
  },
  customFileNotice: {
    fontSize: '0.75rem',
    color: '#059669',
    fontWeight: 700,
    marginLeft: '10px'
  },
  previewBox: {
    backgroundColor: 'var(--deep-surface)',
    borderRadius: 'var(--radius-md)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  previewTitle: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--cool-gray)'
  },
  previewImgContainer: {
    width: '180px',
    height: '180px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid var(--border-dark)',
    backgroundColor: '#0F172A'
  },
  previewImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  noImgBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    textAlign: 'center'
  },
  errorBox: {
    display: 'flex',
    gap: '12px',
    backgroundColor: '#FEF2F2',
    border: '1px solid #FCA5A5',
    borderRadius: 'var(--radius-md)',
    padding: '16px',
    fontSize: '0.82rem',
    color: '#991B1B',
    lineHeight: 1.5
  },
  cmdInstruction: {
    marginTop: '8px',
    backgroundColor: '#FFFFFF',
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #F87171',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: '#7F1D1D'
  },
  modelMetaBox: {
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '16px'
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
  codeVal: {
    fontFamily: 'var(--font-mono)',
    fontWeight: 700,
    color: 'var(--royal-blue)'
  },
  metaVal: {
    color: 'var(--deep-indigo)',
    fontWeight: 700
  },
  predictionCard: {
    backgroundColor: 'var(--deep-surface)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px',
    color: '#FFFFFF',
    textAlign: 'center',
    boxShadow: 'var(--shadow-dark)',
    backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(108, 92, 231, 0.25) 0%, transparent 70%)'
  },
  predTag: {
    fontSize: '0.72rem',
    fontWeight: 700,
    color: 'var(--cool-gray)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
  },
  predClassTitle: {
    fontSize: '1.8rem',
    fontWeight: 800,
    color: '#5BC7D8',
    margin: '4px 0 8px 0',
    letterSpacing: '-0.02em'
  },
  confidenceText: {
    fontSize: '0.82rem',
    fontWeight: 700,
    color: '#A99AF5',
    backgroundColor: 'rgba(108, 92, 231, 0.2)',
    padding: '3px 10px',
    borderRadius: '10px'
  },
  probSectionTitle: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    marginBottom: '12px'
  },
  probList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  probItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  probHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.82rem'
  },
  probName: {
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  topTag: {
    fontSize: '0.65rem',
    fontWeight: 800,
    backgroundColor: '#6C5CE7',
    color: '#FFFFFF',
    padding: '1px 6px',
    borderRadius: '4px'
  },
  probValText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    color: 'var(--dark-muted)',
    fontWeight: 700
  },
  barTrack: {
    height: '8px',
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  barFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  researchDisclaimer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#EFF6FF',
    border: '1px solid #BFDBFE',
    borderRadius: 'var(--radius-md)',
    padding: '12px 14px',
    fontSize: '0.78rem',
    color: '#1E40AF',
    marginTop: '20px',
    lineHeight: 1.45
  },
  awaitingBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center'
  },
  awaitingTitle: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    marginTop: '12px',
    marginBottom: '6px'
  },
  awaitingDesc: {
    fontSize: '0.82rem',
    color: 'var(--dark-muted)',
    maxWidth: '340px',
    lineHeight: 1.5
  }
};
