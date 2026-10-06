import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Ribbon, 
  Sparkles, 
  Dna, 
  Database, 
  GitMerge, 
  FlaskConical, 
  FileText, 
  ArrowRight
} from 'lucide-react';

export const BreastCancerWorkspacePage: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Workspace Header Banner */}
      <div style={styles.headerCard}>
        <div style={styles.headerTop}>
          <div style={styles.iconBox}>
            <Ribbon size={28} color="#A99AF5" />
          </div>
          <div>
            <h1 style={styles.title}>Breast Cancer Workspace</h1>
            <p style={styles.subtitle}>Invasive Ductal & Lobular Carcinoma (BreakHis / BUSI)</p>
          </div>
        </div>

        <p style={styles.description}>
          Cross-modal transfer learning research under unpaired & missing-modality conditions across 
          microscopic histopathology, 2D ultrasound, fine needle aspiration (FNA) nuclear morphometry, and scanned mammography.
        </p>

        <div style={styles.modalityBar}>
          <span style={styles.modalityLabel}>Supported Modalities:</span>
          <span style={styles.modalityPill}>Histopathology (40X-400X)</span>
          <span style={styles.modalityPill}>2D Ultrasound (BUSI)</span>
          <span style={styles.modalityPill}>FNA Morphometry</span>
          <span style={styles.modalityPill}>Mammography (CBIS-DDSM)</span>
        </div>
      </div>

      {/* Choice Section Header */}
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionHeading}>What would you like to explore?</h2>
        <p style={styles.sectionSub}>Select an entry point below to access diagnostic workspace tools or transfer learning research.</p>
      </div>

      {/* Choice Cards Grid */}
      <div style={styles.choiceGrid}>
        {/* CARD 1: AI ANALYSIS */}
        <div style={{ ...styles.choiceCard, borderColor: 'rgba(108, 92, 231, 0.4)' }}>
          <div style={styles.cardHeaderRow}>
            <div style={styles.cardIconBoxApp}>
              <Sparkles size={22} color="#A99AF5" />
            </div>
            <span style={styles.appTag}>⚡ APPLICATION FUNCTIONALITY</span>
          </div>

          <h3 style={styles.cardTitle}>Diagnostic Workspace</h3>
          <p style={styles.cardDesc}>
            Access cross-modal transfer learning diagnostic tools for ultrasound and histopathology subtyping.
          </p>

          <div style={styles.actionList}>
            <Link to="/breast-cancer/analysis" style={styles.primaryActionBtn}>
              <Sparkles size={16} />
              <div style={{ flex: 1 }}>
                <span style={styles.btnTitle}>Open Diagnostic Workspace</span>
                <span style={styles.btnSub}>Cross-modal transfer analysis workspace</span>
              </div>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* CARD 2: RESEARCH & EVIDENCE */}
        <div style={{ ...styles.choiceCard, borderColor: 'rgba(49, 85, 181, 0.3)' }}>
          <div style={styles.cardHeaderRow}>
            <div style={styles.cardIconBoxResearch}>
              <Dna size={22} color="#6C5CE7" />
            </div>
            <span style={styles.researchTag}>🔬 RESEARCH PLATFORM</span>
          </div>

          <h3 style={styles.cardTitle}>Research & Methodology</h3>
          <p style={styles.cardDesc}>
            Explore dataset audits, proposed architecture, transfer learning experiments, and empirical findings.
          </p>

          <div style={styles.miniLinkGrid}>
            <Link to="/breast-cancer/research/overview" style={styles.miniLink}>
              <Dna size={15} color="#6C5CE7" />
              <span>Research Overview</span>
            </Link>
            <Link to="/breast-cancer/research/datasets" style={styles.miniLink}>
              <Database size={15} color="#6C5CE7" />
              <span>Dataset Registry</span>
            </Link>
            <Link to="/breast-cancer/research/architecture" style={styles.miniLink}>
              <GitMerge size={15} color="#6C5CE7" />
              <span>Architecture</span>
            </Link>
            <Link to="/breast-cancer/research/experiments" style={styles.miniLink}>
              <FlaskConical size={15} color="#6C5CE7" />
              <span>Experiments</span>
            </Link>
            <Link to="/breast-cancer/research/findings" style={{ ...styles.miniLink, gridColumn: 'span 2' }}>
              <FileText size={15} color="#6C5CE7" />
              <span>Findings & Evidence</span>
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
    backgroundColor: 'rgba(108, 92, 231, 0.15)',
    border: '1px solid rgba(108, 92, 231, 0.3)',
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
    backgroundColor: 'rgba(108, 92, 231, 0.12)',
    border: '1px solid rgba(108, 92, 231, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardIconBoxResearch: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: 'var(--royal-blue-light)',
    border: '1px solid rgba(49, 85, 181, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  appTag: {
    fontSize: '0.65rem',
    fontWeight: 800,
    color: '#A99AF5',
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
    backgroundColor: 'var(--violet)',
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
  }
};
