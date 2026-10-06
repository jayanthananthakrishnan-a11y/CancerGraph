import React from 'react';
import { Info, Cpu, Database, FileText, FlaskConical } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'info' | 'model' | 'dataset' | 'report' | 'experiment';
  actionLabel?: string;
  onAction?: () => void;
  targetPhaseNote?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'info',
  actionLabel,
  onAction,
  targetPhaseNote
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'model': return <Cpu size={32} color="var(--violet)" />;
      case 'dataset': return <Database size={32} color="var(--soft-cyan)" />;
      case 'report': return <FileText size={32} color="var(--royal-blue)" />;
      case 'experiment': return <FlaskConical size={32} color="var(--lavender)" />;
      default: return <Info size={32} color="var(--royal-blue)" />;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.iconCircle}>
        {getIcon()}
      </div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>

      {targetPhaseNote && (
        <div style={styles.phaseNote}>
          <span style={styles.phaseDot} />
          <span>{targetPhaseNote}</span>
        </div>
      )}

      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction} style={{ marginTop: '16px' }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '48px 24px',
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
    margin: '20px 0'
  },
  iconCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    marginBottom: '8px'
  },
  description: {
    fontSize: '0.875rem',
    color: 'var(--dark-muted)',
    maxWidth: '520px',
    lineHeight: 1.5
  },
  phaseNote: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '16px',
    padding: '6px 12px',
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '20px',
    fontSize: '0.75rem',
    color: 'var(--royal-blue)',
    fontWeight: 600
  },
  phaseDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--royal-blue)'
  }
};
