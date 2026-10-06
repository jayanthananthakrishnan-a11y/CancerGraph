import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Sparkles, 
  Dna, 
  Database, 
  GitMerge, 
  Layers, 
  FlaskConical, 
  FileText, 
  ArrowRight,
  UserCheck,
  Cpu
} from 'lucide-react';

export const GliomaWorkspacePage: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Workspace Header Banner */}
      <div style={styles.headerCard}>
        <div style={styles.headerTop}>
          <div style={styles.iconBox}>
            <Brain size={28} color="#5BC7D8" />
          </div>
          <div>
            <h1 style={styles.title}>Glioma Workspace</h1>
            <p style={styles.subtitle}>Glioblastoma Multiforme (GBM) & Low-Grade Gliomas (LGG)</p>
          </div>
        </div>

        <p style={styles.description}>
          Research and AI-assisted analysis of glioma using medical imaging, clinical hazards, and genomic biomarkers.
        </p>

        <div style={styles.modalityBar}>
          <span style={styles.modalityLabel}>Supported Modalities:</span>
          <span style={styles.modalityPill}>MRI Axial Slices</span>
          <span style={styles.modalityPill}>3D Volumetric Masks</span>
          <span style={styles.modalityPill}>Clinical Hazards</span>
          <span style={styles.modalityPill}>Genomic Biomarkers</span>
        </div>
      </div>

      {/* Choice Section Header */}
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionHeading}>What would you like to explore?</h2>
        <p style={styles.sectionSub}>Select an entry point below to access analysis tools or research documentation.</p>
      </div>

      {/* 4 Primary Cards Grid (Progressive Disclosure Level 3 -> Level 4) */}
      <div style={styles.choiceGrid}>
        {/* CARD 1: AI ANALYSIS */}
        <div style={{ ...styles.choiceCard, borderColor: 'rgba(91, 199, 216, 0.4)' }}>
          <div style={styles.cardHeaderRow}>
            <div style={styles.cardIconBoxApp}>
              <Sparkles size={22} color="#5BC7D8" />
            </div>
            <span style={styles.appTag}>⚡ APPLICATION FUNCTIONALITY</span>
          </div>

          <h3 style={styles.cardTitle}>AI Analysis</h3>
          <p style={styles.cardDesc}>
            Use trained deep learning models for live brain MRI slice classification and patient feature vector inspection.
          </p>

          <div style={styles.actionList}>
            <Link to="/glioma/analysis/mri" style={styles.primaryActionBtn}>
              <Sparkles size={16} />
              <div style={{ flex: 1 }}>
                <span style={styles.btnTitle}>Live MRI Classification</span>
                <span style={styles.btnSub}>Run 4-class prediction on MRI slices</span>
              </div>
              <ArrowRight size={16} />
            </Link>

            <Link to="/glioma/analysis/patient" style={styles.secondaryActionBtn}>
              <UserCheck size={16} color="#5BC7D8" />
              <div style={{ flex: 1 }}>
                <span style={styles.btnTitleDark}>Patient Workbench</span>
                <span style={styles.btnSubDark}>Inspect intermediate 3,200D feature vectors</span>
              </div>
              <ArrowRight size={14} color="var(--dark-muted)" />
            </Link>
          </div>
        </div>

        {/* CARD 2: RESEARCH & METHODOLOGY */}
        <div style={{ ...styles.choiceCard, borderColor: 'rgba(108, 92, 231, 0.3)' }}>
          <div style={styles.cardHeaderRow}>
            <div style={styles.cardIconBoxResearch}>
              <Dna size={22} color="#6C5CE7" />
            </div>
            <span style={styles.researchTag}>🔬 RESEARCH PLATFORM</span>
          </div>

          <h3 style={styles.cardTitle}>Research & Methodology</h3>
          <p style={styles.cardDesc}>
            Explore model architecture flows, empirical evaluation benchmarks, registered models, and technical reports.
          </p>

          <div style={styles.miniLinkGrid}>
            <Link to="/glioma/research/overview" style={styles.miniLink}>
              <Dna size={15} color="#6C5CE7" />
              <span>Research Overview</span>
            </Link>
            <Link to="/glioma/research/architecture" style={styles.miniLink}>
              <GitMerge size={15} color="#6C5CE7" />
              <span>Pipeline Architecture</span>
            </Link>
            <Link to="/glioma/research/evaluation" style={styles.miniLink}>
              <Layers size={15} color="#6C5CE7" />
              <span>Empirical Evaluation</span>
            </Link>
            <Link to="/glioma/research/models" style={styles.miniLink}>
              <Cpu size={15} color="#6C5CE7" />
              <span>Registered Models</span>
            </Link>
            <Link to="/glioma/research/reports" style={{ ...styles.miniLink, gridColumn: 'span 2' }}>
              <FileText size={15} color="#6C5CE7" />
              <span>Reports & Documentation</span>
            </Link>
          </div>
        </div>

        {/* CARD 3: DATASETS */}
        <div style={styles.choiceCard}>
          <div style={styles.cardHeaderRow}>
            <div style={{ ...styles.cardIconBoxResearch, backgroundColor: 'rgba(49, 85, 181, 0.1)' }}>
              <Database size={22} color="#3155B5" />
            </div>
            <span style={{ ...styles.researchTag, color: '#3155B5', backgroundColor: 'rgba(49, 85, 181, 0.1)' }}>📊 DATASETS</span>
          </div>

          <h3 style={styles.cardTitle}>Datasets</h3>
          <p style={styles.cardDesc}>
            Inspect the 4 local datasets collected under Research/Glioma/datasets/ for clinical risk modeling and 2D slice features.
          </p>

          <div style={styles.cardFooter}>
            <Link to="/glioma/research/datasets" className="btn btn-secondary" style={styles.exploreLink}>
              <Database size={16} color="#3155B5" />
              <span>Explore Dataset Registry</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* CARD 4: EXPERIMENTS */}
        <div style={styles.choiceCard}>
          <div style={styles.cardHeaderRow}>
            <div style={{ ...styles.cardIconBoxResearch, backgroundColor: 'rgba(169, 154, 245, 0.12)' }}>
              <FlaskConical size={22} color="#6C5CE7" />
            </div>
            <span style={styles.researchTag}>🧪 EXPERIMENTS</span>
          </div>

          <h3 style={styles.cardTitle}>Experiments</h3>
          <p style={styles.cardDesc}>
            Review technical model evaluation runs, transfer-learning benchmarks, script outputs, and candidate audits.
          </p>

          <div style={styles.cardFooter}>
            <Link to="/glioma/research/experiments" className="btn btn-secondary" style={styles.exploreLink}>
              <FlaskConical size={16} color="#6C5CE7" />
              <span>Explore Experiment Runs</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1240px',
    margin: '0 auto'
  },
  headerCard: {
    backgroundColor: 'var(--deep-surface)',
    border: '1px solid var(--border-dark)',
    borderRadius: 'var(--radius-xl)',
    padding: '36px',
    color: '#FFFFFF',
    marginBottom: '36px',
    boxShadow: 'var(--shadow-dark)'
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '14px'
  },
  iconBox: {
    width: '52px',
    height: '52px',
    borderRadius: '12px',
    backgroundColor: 'rgba(91, 199, 216, 0.12)',
    border: '1px solid rgba(91, 199, 216, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 800,
    color: '#FFFFFF',
    lineHeight: 1.1
  },
  subtitle: {
    fontSize: '0.88rem',
    color: 'var(--cool-gray)',
    marginTop: '3px'
  },
  description: {
    fontSize: '0.96rem',
    color: '#D2D8E4',
    lineHeight: 1.6,
    marginBottom: '20px'
  },
  modalityBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    paddingTop: '18px',
    borderTop: '1px solid var(--border-dark)'
  },
  modalityLabel: {
    fontSize: '0.72rem',
    fontWeight: 800,
    color: 'var(--cool-gray)',
    letterSpacing: '0.05em'
  },
  modalityPill: {
    fontSize: '0.74rem',
    fontWeight: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: '#FFFFFF',
    padding: '3px 10px',
    borderRadius: '20px'
  },
  sectionHeader: {
    marginBottom: '24px'
  },
  sectionHeading: {
    fontSize: '1.35rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  sectionSub: {
    fontSize: '0.88rem',
    color: 'var(--dark-muted)',
    marginTop: '2px'
  },
  choiceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px'
  },
  choiceCard: {
    backgroundColor: '#FFFFFF',
    border: '2px solid var(--border)',
    borderRadius: 'var(--radius-xl)',
    padding: '28px',
    boxShadow: 'var(--shadow-md)',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  cardIconBoxApp: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: 'rgba(91, 199, 216, 0.12)',
    border: '1px solid rgba(91, 199, 216, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardIconBoxResearch: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: 'var(--violet-light)',
    border: '1px solid rgba(108, 92, 231, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  appTag: {
    fontSize: '0.65rem',
    fontWeight: 800,
    color: '#5BC7D8',
    backgroundColor: 'var(--deep-surface)',
    padding: '4px 8px',
    borderRadius: '4px',
    letterSpacing: '0.05em'
  },
  researchTag: {
    fontSize: '0.65rem',
    fontWeight: 800,
    color: 'var(--violet)',
    backgroundColor: 'var(--violet-light)',
    padding: '4px 8px',
    borderRadius: '4px',
    letterSpacing: '0.05em'
  },
  cardTitle: {
    fontSize: '1.3rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)',
    marginBottom: '6px'
  },
  cardDesc: {
    fontSize: '0.86rem',
    color: 'var(--dark-text)',
    lineHeight: 1.5,
    marginBottom: '20px',
    flex: 1
  },
  actionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  primaryActionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'var(--royal-blue)',
    color: '#FFFFFF',
    padding: '14px 18px',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none'
  },
  btnTitle: {
    fontSize: '0.9rem',
    fontWeight: 700,
    display: 'block'
  },
  btnSub: {
    fontSize: '0.72rem',
    opacity: 0.88,
    display: 'block'
  },
  secondaryActionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border)',
    color: 'var(--dark-text)',
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none'
  },
  btnTitleDark: {
    fontSize: '0.86rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    display: 'block'
  },
  btnSubDark: {
    fontSize: '0.72rem',
    color: 'var(--dark-muted)',
    display: 'block'
  },
  miniLinkGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px'
  },
  miniLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '10px 12px',
    color: 'var(--dark-text)',
    textDecoration: 'none',
    fontSize: '0.82rem',
    fontWeight: 600
  },
  cardFooter: {
    marginTop: 'auto'
  },
  exploreLink: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    fontWeight: 700,
    fontSize: '0.88rem'
  }
};
