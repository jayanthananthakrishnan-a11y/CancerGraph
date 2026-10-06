import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Ribbon, 
  ArrowRight, 
  Sparkles, 
  Activity,
  Dna,
  Layers,
  Clock
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Platform Hero Banner */}
      <div style={styles.heroCard}>
        <div style={styles.brandBadge}>
          <Sparkles size={14} color="#5BC7D8" />
          <span>CANCERGRAPH BIOMEDICAL AI</span>
        </div>
        <h1 style={styles.heroTitle}>Multimodal Cancer AI Platform</h1>
        <p style={styles.heroSubtitle}>
          An integrated platform for exploring AI-assisted cancer analysis using medical imaging 
          and multimodal clinical information.
        </p>
        <p style={styles.heroDescription}>
          Select a cancer domain below to launch live detection models or explore research methodologies.
        </p>
      </div>

      {/* EXPLORE CANCER TYPES */}
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionHeading}>Explore Cancer Types</h2>
        <p style={styles.sectionSub}>Choose a cancer domain to enter its dedicated analysis and research workspace.</p>
      </div>

      <div style={styles.grid}>
        {/* GLIOMA CARD (Active) */}
        <div style={{ ...styles.card, borderColor: 'rgba(91, 199, 216, 0.4)' }}>
          <div style={styles.cardHeader}>
            <div style={styles.iconCircleGlioma}>
              <Brain size={26} color="#5BC7D8" />
            </div>
            <span style={styles.statusActive}>● Available</span>
          </div>

          <h3 style={styles.cardTitle}>Glioma</h3>
          <span style={styles.cardSub}>Brain & Central Nervous System</span>
          <p style={styles.cardDesc}>
            AI-assisted brain tumor classification and multimodal research. Includes live 4-class MRI axial slice prediction and patient feature vector analysis.
          </p>

          <div style={styles.tagRow}>
            <span style={styles.tagItem}>AI Analysis</span>
            <span style={styles.tagItem}>Multimodal Research</span>
          </div>

          <div style={styles.cardFooter}>
            <Link to="/glioma" className="btn btn-primary" style={styles.exploreBtnGlioma}>
              <span>Explore Glioma</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* BREAST CANCER CARD (Active) */}
        <div style={{ ...styles.card, borderColor: 'rgba(108, 92, 231, 0.4)' }}>
          <div style={styles.cardHeader}>
            <div style={styles.iconCircleBreast}>
              <Ribbon size={26} color="#A99AF5" />
            </div>
            <span style={styles.statusActive}>● Available</span>
          </div>

          <h3 style={styles.cardTitle}>Breast Cancer</h3>
          <span style={styles.cardSub}>Histopathology & Mammography</span>
          <p style={styles.cardDesc}>
            Cross-modal transfer learning research across microscopic histopathology, 2D ultrasound, fine needle aspiration morphometry, and scanned mammography.
          </p>

          <div style={styles.tagRow}>
            <span style={styles.tagItem}>AI Analysis</span>
            <span style={styles.tagItem}>Transfer Research</span>
          </div>

          <div style={styles.cardFooter}>
            <Link to="/breast-cancer" className="btn btn-primary" style={styles.exploreBtnBreast}>
              <span>Explore Breast Cancer</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* LUNG CANCER CARD (Under Development) */}
        <div style={{ ...styles.card, ...styles.cardPlanned }}>
          <div style={styles.cardHeader}>
            <div style={styles.iconCirclePlanned}>
              <Activity size={24} color="var(--cool-gray)" />
            </div>
            <span style={styles.statusPlanned}>Under Development</span>
          </div>

          <h3 style={styles.cardTitlePlanned}>Lung Cancer</h3>
          <span style={styles.cardSub}>Chest CT & EGFR/KRAS Biomarkers</span>
          <p style={styles.cardDescPlanned}>
            Planned research module for low-dose volumetric chest CT imaging and clinical biomarker modeling.
          </p>

          <div style={styles.cardFooter}>
            <button disabled style={styles.disabledBtn}>
              <Clock size={14} />
              <span>Under Development</span>
            </button>
          </div>
        </div>

        {/* PROSTATE CANCER CARD (Under Development) */}
        <div style={{ ...styles.card, ...styles.cardPlanned }}>
          <div style={styles.cardHeader}>
            <div style={styles.iconCirclePlanned}>
              <Layers size={24} color="var(--cool-gray)" />
            </div>
            <span style={styles.statusPlanned}>Under Development</span>
          </div>

          <h3 style={styles.cardTitlePlanned}>Prostate Cancer</h3>
          <span style={styles.cardSub}>mpMRI & PSA Clinical Metrics</span>
          <p style={styles.cardDescPlanned}>
            Planned research domain for multiparametric MRI (mpMRI) and biopsy Gleason scoring.
          </p>

          <div style={styles.cardFooter}>
            <button disabled style={styles.disabledBtn}>
              <Clock size={14} />
              <span>Under Development</span>
            </button>
          </div>
        </div>

        {/* LIVER CANCER CARD (Under Development) */}
        <div style={{ ...styles.card, ...styles.cardPlanned }}>
          <div style={styles.cardHeader}>
            <div style={styles.iconCirclePlanned}>
              <Dna size={24} color="var(--cool-gray)" />
            </div>
            <span style={styles.statusPlanned}>Under Development</span>
          </div>

          <h3 style={styles.cardTitlePlanned}>Liver Cancer</h3>
          <span style={styles.cardSub}>Multi-phase CT & DCE-MRI</span>
          <p style={styles.cardDescPlanned}>
            Planned research domain for multi-phase contrast CT and liver tumor localization.
          </p>

          <div style={styles.cardFooter}>
            <button disabled style={styles.disabledBtn}>
              <Clock size={14} />
              <span>Under Development</span>
            </button>
          </div>
        </div>

        {/* COLORECTAL CANCER CARD (Under Development) */}
        <div style={{ ...styles.card, ...styles.cardPlanned }}>
          <div style={styles.cardHeader}>
            <div style={styles.iconCirclePlanned}>
              <Activity size={24} color="var(--cool-gray)" />
            </div>
            <span style={styles.statusPlanned}>Under Development</span>
          </div>

          <h3 style={styles.cardTitlePlanned}>Colorectal Cancer</h3>
          <span style={styles.cardSub}>Whole Slide Histopathology & MSI</span>
          <p style={styles.cardDescPlanned}>
            Planned domain for digital pathology tissue slide segmentation and microsatellite instability.
          </p>

          <div style={styles.cardFooter}>
            <button disabled style={styles.disabledBtn}>
              <Clock size={14} />
              <span>Under Development</span>
            </button>
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
  heroCard: {
    backgroundColor: 'var(--deep-surface)',
    border: '1px solid var(--border-dark)',
    borderRadius: 'var(--radius-xl)',
    padding: '36px',
    color: '#FFFFFF',
    marginBottom: '36px',
    boxShadow: 'var(--shadow-dark)',
    backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(91, 199, 216, 0.15) 0%, transparent 60%)'
  },
  brandBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(91, 199, 216, 0.12)',
    border: '1px solid rgba(91, 199, 216, 0.3)',
    color: '#5BC7D8',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.72rem',
    fontWeight: 800,
    letterSpacing: '0.06em',
    marginBottom: '16px'
  },
  heroTitle: {
    fontSize: '2.1rem',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    marginBottom: '10px',
    color: '#FFFFFF',
    lineHeight: 1.2
  },
  heroSubtitle: {
    fontSize: '1.05rem',
    color: '#D2D8E4',
    lineHeight: 1.5,
    maxWidth: '850px',
    marginBottom: '12px'
  },
  heroDescription: {
    fontSize: '0.88rem',
    color: 'var(--cool-gray)',
    lineHeight: 1.5
  },
  sectionHeader: {
    marginBottom: '24px'
  },
  sectionHeading: {
    fontSize: '1.4rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)'
  },
  sectionSub: {
    fontSize: '0.88rem',
    color: 'var(--dark-muted)',
    marginTop: '3px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px'
  },
  card: {
    backgroundColor: '#FFFFFF',
    border: '2px solid var(--border)',
    borderRadius: 'var(--radius-xl)',
    padding: '28px',
    boxShadow: 'var(--shadow-md)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.2s ease'
  },
  cardPlanned: {
    backgroundColor: '#FAFBFD',
    borderColor: 'var(--border-subtle)',
    opacity: 0.85
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  iconCircleGlioma: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: 'rgba(91, 199, 216, 0.12)',
    border: '1px solid rgba(91, 199, 216, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconCircleBreast: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: 'rgba(108, 92, 231, 0.12)',
    border: '1px solid rgba(108, 92, 231, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconCirclePlanned: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: 'var(--cool-gray-light)',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusActive: {
    fontSize: '0.72rem',
    fontWeight: 700,
    color: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.25)',
    padding: '3px 10px',
    borderRadius: '12px'
  },
  statusPlanned: {
    fontSize: '0.7rem',
    fontWeight: 600,
    color: 'var(--dark-muted)',
    backgroundColor: 'var(--cool-gray-light)',
    padding: '3px 8px',
    borderRadius: '10px'
  },
  cardTitle: {
    fontSize: '1.35rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)',
    marginBottom: '2px'
  },
  cardTitlePlanned: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: 'var(--dark-muted)',
    marginBottom: '2px'
  },
  cardSub: {
    fontSize: '0.78rem',
    color: 'var(--dark-muted)',
    fontStyle: 'italic',
    marginBottom: '12px',
    display: 'block'
  },
  cardDesc: {
    fontSize: '0.86rem',
    color: 'var(--dark-text)',
    lineHeight: 1.5,
    marginBottom: '18px',
    flex: 1
  },
  cardDescPlanned: {
    fontSize: '0.82rem',
    color: 'var(--dark-muted)',
    lineHeight: 1.45,
    marginBottom: '18px',
    flex: 1
  },
  tagRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '20px'
  },
  tagItem: {
    fontSize: '0.72rem',
    fontWeight: 700,
    color: 'var(--royal-blue)',
    backgroundColor: 'var(--royal-blue-light)',
    border: '1px solid rgba(49, 85, 181, 0.18)',
    padding: '3px 8px',
    borderRadius: '6px'
  },
  cardFooter: {
    marginTop: 'auto'
  },
  exploreBtnGlioma: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: 'var(--royal-blue)',
    borderColor: 'var(--royal-blue)',
    color: '#FFFFFF',
    padding: '12px 18px',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.92rem',
    fontWeight: 700,
    textDecoration: 'none'
  },
  exploreBtnBreast: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: 'var(--violet)',
    borderColor: 'var(--violet)',
    color: '#FFFFFF',
    padding: '12px 18px',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.92rem',
    fontWeight: 700,
    textDecoration: 'none'
  },
  disabledBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    backgroundColor: 'var(--cool-gray-light)',
    border: '1px solid var(--border)',
    color: 'var(--dark-muted)',
    padding: '10px 14px',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.82rem',
    fontWeight: 600,
    cursor: 'not-allowed'
  }
};
