import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  Dna, 
  Database, 
  FlaskConical, 
  Brain, 
  Sparkles, 
  Ribbon, 
  ArrowLeft, 
  PanelLeftClose,
  PanelLeftOpen,
  LayoutGrid
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const path = location.pathname;

  const isGlioma = path.startsWith('/glioma');
  const isBreast = path.startsWith('/breast-cancer');

  const sidebarWidth = isCollapsed ? '72px' : '260px';

  return (
    <aside 
      style={{
        ...styles.sidebar,
        width: sidebarWidth
      }}
    >
      {/* Brand Header / Collapse Toggle */}
      <div style={styles.brandHeader}>
        {!isCollapsed ? (
          <div style={styles.brandTitleArea}>
            <div style={styles.brandLogo}>
              <Brain size={20} color="#5BC7D8" />
            </div>
            <div>
              <span style={styles.brandTitle}>CANCERGRAPH</span>
              <span style={styles.brandSubtitle}>Multimodal AI Platform</span>
            </div>
          </div>
        ) : (
          <div style={styles.brandLogo}>
            <Brain size={20} color="#5BC7D8" />
          </div>
        )}

        <button 
          onClick={onToggle} 
          style={styles.toggleBtn}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <PanelLeftOpen size={16} color="#9AA4B5" /> : <PanelLeftClose size={16} color="#9AA4B5" />}
        </button>
      </div>

      {/* WORKSPACE MODE 1: GLIOMA CANCER */}
      {isGlioma && (
        <div style={styles.navContainer}>
          <div style={styles.backBox}>
            <Link to="/" style={styles.backLink} title="Back to Platform Home">
              <ArrowLeft size={15} color="#5BC7D8" />
              {!isCollapsed && <span>Back to Home</span>}
            </Link>
          </div>

          {!isCollapsed && (
            <div style={styles.workspaceTagGlioma}>
              <Brain size={14} color="#5BC7D8" />
              <span>Glioma Workspace</span>
            </div>
          )}

          <nav style={styles.navList}>
            <NavLink 
              to="/glioma" 
              end
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {})
              })}
              title="Overview"
            >
              <LayoutGrid size={17} />
              {!isCollapsed && <span>Overview</span>}
            </NavLink>

            <NavLink 
              to="/glioma/analysis/mri" 
              style={({ isActive }) => ({
                ...styles.navItem,
                ...styles.appItemGlioma,
                ...(isActive ? styles.appItemActiveGlioma : {})
              })}
              title="Live MRI Classification"
            >
              <Sparkles size={17} color="#5BC7D8" />
              {!isCollapsed && (
                <>
                  <span style={{ flex: 1 }}>AI Analysis</span>
                  <span style={styles.badgeLive}>LIVE</span>
                </>
              )}
            </NavLink>

            <NavLink 
              to="/glioma/research/overview" 
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {})
              })}
              title="Research"
            >
              <Dna size={17} />
              {!isCollapsed && <span>Research</span>}
            </NavLink>

            <NavLink 
              to="/glioma/research/datasets" 
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {})
              })}
              title="Datasets"
            >
              <Database size={17} />
              {!isCollapsed && <span>Datasets</span>}
            </NavLink>

            <NavLink 
              to="/glioma/research/experiments" 
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {})
              })}
              title="Experiments"
            >
              <FlaskConical size={17} />
              {!isCollapsed && <span>Experiments</span>}
            </NavLink>
          </nav>
        </div>
      )}

      {/* WORKSPACE MODE 2: BREAST CANCER */}
      {isBreast && (
        <div style={styles.navContainer}>
          <div style={styles.backBox}>
            <Link to="/" style={styles.backLink} title="Back to Platform Home">
              <ArrowLeft size={15} color="#A99AF5" />
              {!isCollapsed && <span>Back to Home</span>}
            </Link>
          </div>

          {!isCollapsed && (
            <div style={styles.workspaceTagBreast}>
              <Ribbon size={14} color="#A99AF5" />
              <span>Breast Cancer</span>
            </div>
          )}

          <nav style={styles.navList}>
            <NavLink 
              to="/breast-cancer" 
              end
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {})
              })}
              title="Overview"
            >
              <LayoutGrid size={17} />
              {!isCollapsed && <span>Overview</span>}
            </NavLink>

            <NavLink 
              to="/breast-cancer/analysis" 
              style={({ isActive }) => ({
                ...styles.navItem,
                ...styles.appItemBreast,
                ...(isActive ? styles.appItemActiveBreast : {})
              })}
              title="Diagnostic Workspace"
            >
              <Sparkles size={17} color="#A99AF5" />
              {!isCollapsed && <span>AI Analysis</span>}
            </NavLink>

            <NavLink 
              to="/breast-cancer/research/overview" 
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {})
              })}
              title="Research"
            >
              <Dna size={17} />
              {!isCollapsed && <span>Research</span>}
            </NavLink>

            <NavLink 
              to="/breast-cancer/research/datasets" 
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {})
              })}
              title="Datasets"
            >
              <Database size={17} />
              {!isCollapsed && <span>Datasets</span>}
            </NavLink>

            <NavLink 
              to="/breast-cancer/research/experiments" 
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {})
              })}
              title="Experiments"
            >
              <FlaskConical size={17} />
              {!isCollapsed && <span>Experiments</span>}
            </NavLink>
          </nav>
        </div>
      )}

      {/* WORKSPACE MODE 3: MINIMAL GLOBAL NAVIGATION */}
      {!isGlioma && !isBreast && (
        <div style={styles.navContainer}>
          {!isCollapsed && <div style={styles.navHeaderLabel}>NAVIGATION</div>}

          <nav style={styles.navList}>
            <NavLink 
              to="/" 
              end
              style={({ isActive }) => ({
                ...styles.globalNavItem,
                ...(isActive ? styles.globalNavItemActive : {})
              })}
              title="Home"
            >
              <Home size={18} />
              {!isCollapsed && <span>Home</span>}
            </NavLink>

            <NavLink 
              to="/glioma" 
              style={({ isActive }) => ({
                ...styles.globalNavItem,
                ...(isActive ? styles.globalNavItemActive : {})
              })}
              title="Explore Glioma"
            >
              <Brain size={18} color="#5BC7D8" />
              {!isCollapsed && <span>Explore Glioma</span>}
            </NavLink>

            <NavLink 
              to="/breast-cancer" 
              style={({ isActive }) => ({
                ...styles.globalNavItem,
                ...(isActive ? styles.globalNavItemActive : {})
              })}
              title="Explore Breast Cancer"
            >
              <Ribbon size={18} color="#A99AF5" />
              {!isCollapsed && <span>Explore Breast Cancer</span>}
            </NavLink>
          </nav>
        </div>
      )}

      {/* Footer Info */}
      {!isCollapsed && (
        <div style={styles.footer}>
          <span style={styles.footerText}>CancerGraph v2.0 • Medical AI</span>
        </div>
      )}
    </aside>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    height: '100vh',
    backgroundColor: 'var(--deep-surface)',
    borderRight: '1px solid var(--border-dark)',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    overflowX: 'hidden'
  },
  brandHeader: {
    height: '64px',
    padding: '0 16px',
    borderBottom: '1px solid var(--border-dark)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  brandTitleArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  brandLogo: {
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    backgroundColor: 'rgba(91, 199, 216, 0.12)',
    border: '1px solid rgba(91, 199, 216, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  brandTitle: {
    fontSize: '0.98rem',
    fontWeight: 800,
    color: '#FFFFFF',
    letterSpacing: '0.04em',
    lineHeight: 1.1,
    display: 'block'
  },
  brandSubtitle: {
    fontSize: '0.68rem',
    color: 'var(--cool-gray)',
    display: 'block'
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navContainer: {
    padding: '16px 12px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  backBox: {
    marginBottom: '12px'
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#D2D8E4',
    textDecoration: 'none',
    fontSize: '0.82rem',
    fontWeight: 600,
    padding: '7px 10px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)'
  },
  workspaceTagGlioma: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.72rem',
    fontWeight: 800,
    color: '#5BC7D8',
    backgroundColor: 'rgba(91, 199, 216, 0.12)',
    padding: '5px 10px',
    borderRadius: '6px',
    marginBottom: '14px',
    border: '1px solid rgba(91, 199, 216, 0.25)'
  },
  workspaceTagBreast: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.72rem',
    fontWeight: 800,
    color: '#A99AF5',
    backgroundColor: 'rgba(169, 154, 245, 0.15)',
    padding: '5px 10px',
    borderRadius: '6px',
    marginBottom: '14px',
    border: '1px solid rgba(169, 154, 245, 0.3)'
  },
  navHeaderLabel: {
    fontSize: '0.64rem',
    fontWeight: 800,
    letterSpacing: '0.08em',
    color: 'var(--cool-gray)',
    padding: '0 8px 8px 8px'
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  globalNavItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '11px 14px',
    borderRadius: '10px',
    color: '#D2D8E4',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 600,
    marginBottom: '4px',
    transition: 'all 0.15s ease'
  },
  globalNavItemActive: {
    backgroundColor: 'var(--royal-blue)',
    color: '#FFFFFF',
    boxShadow: '0 4px 14px rgba(49, 85, 181, 0.35)'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 12px',
    borderRadius: '8px',
    color: '#D2D8E4',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: 500,
    marginBottom: '2px',
    transition: 'all 0.15s ease'
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    color: '#FFFFFF',
    fontWeight: 600
  },
  appItemGlioma: {
    backgroundColor: 'rgba(91, 199, 216, 0.1)',
    border: '1px solid rgba(91, 199, 216, 0.25)',
    fontWeight: 600,
    color: '#5BC7D8'
  },
  appItemActiveGlioma: {
    backgroundColor: 'var(--royal-blue)',
    color: '#FFFFFF',
    fontWeight: 700
  },
  appItemBreast: {
    backgroundColor: 'rgba(169, 154, 245, 0.12)',
    border: '1px solid rgba(169, 154, 245, 0.25)',
    fontWeight: 600,
    color: '#A99AF5'
  },
  appItemActiveBreast: {
    backgroundColor: 'var(--violet)',
    color: '#FFFFFF',
    fontWeight: 700
  },
  badgeLive: {
    fontSize: '0.6rem',
    fontWeight: 800,
    backgroundColor: '#5BC7D8',
    color: '#0F172A',
    padding: '1px 6px',
    borderRadius: '4px',
    letterSpacing: '0.04em'
  },
  footer: {
    padding: '14px 16px',
    borderTop: '1px solid var(--border-dark)',
    textAlign: 'center'
  },
  footerText: {
    fontSize: '0.68rem',
    color: 'var(--cool-gray)',
    fontWeight: 500
  }
};
