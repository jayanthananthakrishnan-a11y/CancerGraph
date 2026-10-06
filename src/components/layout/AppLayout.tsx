import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div style={styles.layoutWrapper}>
      <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      <div 
        style={{
          ...styles.mainContainer,
          marginLeft: isCollapsed ? '72px' : '250px'
        }}
      >
        <Header isCollapsed={isCollapsed} onToggleSidebar={toggleSidebar} />
        <main style={styles.contentArea}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  layoutWrapper: {
    display: 'flex',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#F8FAFC'
  },
  mainContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    transition: 'margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  contentArea: {
    flex: 1,
    padding: '32px',
    maxWidth: '1360px',
    margin: '0 auto',
    width: '100%'
  }
};
