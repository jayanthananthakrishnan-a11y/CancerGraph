import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { ShieldCheck, Search, PanelLeftOpen } from 'lucide-react';

interface HeaderProps {
  isCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isCollapsed, onToggleSidebar }) => {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        {isCollapsed && onToggleSidebar && (
          <button onClick={onToggleSidebar} style={styles.expandBtn} title="Expand Sidebar">
            <PanelLeftOpen size={18} color="#64748B" />
          </button>
        )}
        <Breadcrumbs />
      </div>

      <div style={styles.right}>
        <div style={styles.searchBox}>
          <Search size={14} color="#94A3B8" />
          <input 
            type="text" 
            placeholder="Search platform (cancers, models, modalities)..." 
            style={styles.searchInput} 
            readOnly
          />
        </div>

        <div style={styles.statusPill}>
          <ShieldCheck size={14} color="#0284C7" />
          <span>Inference API Active</span>
        </div>
      </div>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    height: '64px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E2E8F0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 28px',
    position: 'sticky',
    top: 0,
    zIndex: 90
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  expandBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center'
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    padding: '6px 12px',
    width: '280px'
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontSize: '0.8rem',
    color: '#1E293B',
    width: '100%'
  },
  statusPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(2, 132, 199, 0.08)',
    border: '1px solid rgba(2, 132, 199, 0.2)',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#0284C7'
  }
};
