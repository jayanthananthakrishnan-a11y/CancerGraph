import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Sparkles, 
  UserCheck, 
  Dna, 
  Database, 
  GitMerge, 
  Layers, 
  Cpu, 
  FlaskConical, 
  FileText,
  Brain,
  Ribbon,
  ArrowLeft,
  LayoutGrid
} from 'lucide-react';

interface CancerSubNavProps {
  cancerType: 'glioma' | 'breast';
}

export const CancerSubNav: React.FC<CancerSubNavProps> = ({ cancerType }) => {
  if (cancerType === 'glioma') {
    return (
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <div style={styles.titleGroup}>
            <div style={styles.iconBadge}>
              <Brain size={20} color="#0284C7" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={styles.cancerTitle}>Glioma Workspace</h2>
                <Link to="/glioma" style={styles.overviewBadgeLink} title="Go to Glioma Workspace Landing">
                  <LayoutGrid size={12} />
                  <span>Workspace Landing</span>
                </Link>
              </div>
              <p style={styles.cancerSubtitle}>Glioblastoma Multiforme (GBM) & Low-Grade Gliomas (LGG)</p>
            </div>
          </div>

          <Link to="/" style={styles.backHomeBtn}>
            <ArrowLeft size={14} />
            <span>All Cancers</span>
          </Link>
        </div>

        <div style={styles.navBar}>
          {/* APPLICATION / DETECTION GROUP */}
          <div style={styles.navGroup}>
            <span style={styles.groupLabel}>AI APPLICATION</span>
            <div style={styles.linkRow}>
              <NavLink 
                to="/glioma/analysis/mri" 
                style={({ isActive }) => ({
                  ...styles.tabLink,
                  ...styles.appTab,
                  ...(isActive ? styles.tabActiveApp : {})
                })}
              >
                <Sparkles size={15} color="#0284C7" />
                <span>Live MRI Classification</span>
                <span style={styles.liveTag}>LIVE</span>
              </NavLink>

              <NavLink 
                to="/glioma/analysis/patient" 
                style={({ isActive }) => ({
                  ...styles.tabLink,
                  ...styles.appTab,
                  ...(isActive ? styles.tabActiveApp : {})
                })}
              >
                <UserCheck size={15} color="#0284C7" />
                <span>Patient Workbench</span>
              </NavLink>
            </div>
          </div>

          <div style={styles.divider} />

          {/* BTP RESEARCH PLATFORM GROUP */}
          <div style={styles.navGroupFlex}>
            <span style={styles.groupLabel}>BTP RESEARCH PLATFORM</span>
            <div style={styles.linkRow}>
              <NavLink 
                to="/glioma/research/overview" 
                style={({ isActive }) => ({
                  ...styles.tabLink,
                  ...(isActive ? styles.tabActiveResearch : {})
                })}
              >
                <Dna size={14} />
                <span>Overview</span>
              </NavLink>

              <NavLink 
                to="/glioma/research/datasets" 
                style={({ isActive }) => ({
                  ...styles.tabLink,
                  ...(isActive ? styles.tabActiveResearch : {})
                })}
              >
                <Database size={14} />
                <span>Datasets</span>
              </NavLink>

              <NavLink 
                to="/glioma/research/architecture" 
                style={({ isActive }) => ({
                  ...styles.tabLink,
                  ...(isActive ? styles.tabActiveResearch : {})
                })}
              >
                <GitMerge size={14} />
                <span>Architecture</span>
              </NavLink>

              <NavLink 
                to="/glioma/research/evaluation" 
                style={({ isActive }) => ({
                  ...styles.tabLink,
                  ...(isActive ? styles.tabActiveResearch : {})
                })}
              >
                <Layers size={14} />
                <span>Evaluation</span>
              </NavLink>

              <NavLink 
                to="/glioma/research/models" 
                style={({ isActive }) => ({
                  ...styles.tabLink,
                  ...(isActive ? styles.tabActiveResearch : {})
                })}
              >
                <Cpu size={14} />
                <span>Models</span>
              </NavLink>

              <NavLink 
                to="/glioma/research/experiments" 
                style={({ isActive }) => ({
                  ...styles.tabLink,
                  ...(isActive ? styles.tabActiveResearch : {})
                })}
              >
                <FlaskConical size={14} />
                <span>Experiments</span>
              </NavLink>

              <NavLink 
                to="/glioma/research/reports" 
                style={({ isActive }) => ({
                  ...styles.tabLink,
                  ...(isActive ? styles.tabActiveResearch : {})
                })}
              >
                <FileText size={14} />
                <span>Reports</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // BREAST CANCER SUB NAV
  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div style={styles.titleGroup}>
          <div style={{ ...styles.iconBadge, backgroundColor: 'rgba(219, 39, 119, 0.08)', borderColor: 'rgba(219, 39, 119, 0.2)' }}>
            <Ribbon size={20} color="#DB2777" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={styles.cancerTitle}>Breast Cancer Workspace</h2>
              <Link to="/breast-cancer" style={styles.overviewBadgeLink} title="Go to Breast Cancer Workspace Landing">
                <LayoutGrid size={12} />
                <span>Workspace Landing</span>
              </Link>
            </div>
            <p style={styles.cancerSubtitle}>Invasive Ductal & Lobular Carcinoma (BreakHis / BUSI)</p>
          </div>
        </div>

        <Link to="/" style={styles.backHomeBtn}>
          <ArrowLeft size={14} />
          <span>All Cancers</span>
        </Link>
      </div>

      <div style={styles.navBar}>
        {/* APPLICATION / DETECTION GROUP */}
        <div style={styles.navGroup}>
          <span style={styles.groupLabel}>AI APPLICATION</span>
          <div style={styles.linkRow}>
            <NavLink 
              to="/breast-cancer/analysis" 
              style={({ isActive }) => ({
                ...styles.tabLink,
                ...styles.appTabBreast,
                ...(isActive ? styles.tabActiveAppBreast : {})
              })}
            >
              <Sparkles size={15} color="#DB2777" />
              <span>Diagnostic Workspace</span>
            </NavLink>
          </div>
        </div>

        <div style={styles.divider} />

        {/* BTP RESEARCH PLATFORM GROUP */}
        <div style={styles.navGroupFlex}>
          <span style={styles.groupLabel}>BTP RESEARCH PLATFORM</span>
          <div style={styles.linkRow}>
            <NavLink 
              to="/breast-cancer/research/overview" 
              style={({ isActive }) => ({
                ...styles.tabLink,
                ...(isActive ? styles.tabActiveResearch : {})
              })}
            >
              <Dna size={14} />
              <span>Overview</span>
            </NavLink>

            <NavLink 
              to="/breast-cancer/research/datasets" 
              style={({ isActive }) => ({
                ...styles.tabLink,
                ...(isActive ? styles.tabActiveResearch : {})
              })}
            >
              <Database size={14} />
              <span>Datasets</span>
            </NavLink>

            <NavLink 
              to="/breast-cancer/research/architecture" 
              style={({ isActive }) => ({
                ...styles.tabLink,
                ...(isActive ? styles.tabActiveResearch : {})
              })}
            >
              <GitMerge size={14} />
              <span>Architecture</span>
            </NavLink>

            <NavLink 
              to="/breast-cancer/research/experiments" 
              style={({ isActive }) => ({
                ...styles.tabLink,
                ...(isActive ? styles.tabActiveResearch : {})
              })}
            >
              <FlaskConical size={14} />
              <span>Experiments</span>
            </NavLink>

            <NavLink 
              to="/breast-cancer/research/findings" 
              style={({ isActive }) => ({
                ...styles.tabLink,
                ...(isActive ? styles.tabActiveResearch : {})
              })}
            >
              <FileText size={14} />
              <span>Findings & Reports</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    padding: '16px 20px 14px 20px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '14px'
  },
  titleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  iconBadge: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    backgroundColor: 'rgba(2, 132, 199, 0.08)',
    border: '1px solid rgba(2, 132, 199, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancerTitle: {
    fontSize: '1.15rem',
    fontWeight: 800,
    color: '#0F172A',
    margin: 0
  },
  overviewBadgeLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.68rem',
    fontWeight: 600,
    color: '#64748B',
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    padding: '2px 8px',
    borderRadius: '6px',
    textDecoration: 'none'
  },
  cancerSubtitle: {
    fontSize: '0.76rem',
    color: '#64748B',
    marginTop: '2px',
    margin: 0
  },
  backHomeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.78rem',
    fontWeight: 600,
    color: '#475569',
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    padding: '6px 12px',
    borderRadius: '8px',
    textDecoration: 'none'
  },
  navBar: {
    display: 'flex',
    alignItems: 'stretch',
    gap: '14px',
    paddingTop: '12px',
    borderTop: '1px solid #F1F5F9',
    overflowX: 'auto'
  },
  navGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  navGroupFlex: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1
  },
  groupLabel: {
    fontSize: '0.6rem',
    fontWeight: 800,
    letterSpacing: '0.06em',
    color: '#94A3B8'
  },
  linkRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  divider: {
    width: '1px',
    backgroundColor: '#E2E8F0',
    margin: '0 4px'
  },
  tabLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 10px',
    borderRadius: '6px',
    color: '#334155',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontWeight: 500,
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap'
  },
  appTab: {
    backgroundColor: 'rgba(2, 132, 199, 0.06)',
    borderColor: 'rgba(2, 132, 199, 0.2)',
    fontWeight: 600,
    color: '#0369A1'
  },
  appTabBreast: {
    backgroundColor: 'rgba(219, 39, 119, 0.06)',
    borderColor: 'rgba(219, 39, 119, 0.2)',
    fontWeight: 600,
    color: '#BE185D'
  },
  liveTag: {
    fontSize: '0.58rem',
    fontWeight: 800,
    backgroundColor: '#0284C7',
    color: '#FFFFFF',
    padding: '1px 4px',
    borderRadius: '3px'
  },
  tabActiveApp: {
    backgroundColor: '#0284C7',
    color: '#FFFFFF',
    borderColor: '#0284C7',
    fontWeight: 700
  },
  tabActiveAppBreast: {
    backgroundColor: '#DB2777',
    color: '#FFFFFF',
    borderColor: '#DB2777',
    fontWeight: 700
  },
  tabActiveResearch: {
    backgroundColor: '#0F172A',
    color: '#FFFFFF',
    borderColor: '#0F172A',
    fontWeight: 600
  }
};
