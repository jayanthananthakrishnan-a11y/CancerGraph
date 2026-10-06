import React from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
  badgeText?: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  badgeText,
  children
}) => {
  return (
    <div style={styles.header}>
      <div>
        <div style={styles.titleRow}>
          <h2 style={styles.title}>{title}</h2>
          {badgeText && (
            <span style={styles.badge}>{badgeText}</span>
          )}
        </div>
        <p style={styles.description}>{description}</p>
      </div>

      {children && (
        <div style={styles.actions}>
          {children}
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--border)'
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 800,
    color: 'var(--deep-indigo)',
    letterSpacing: '-0.02em'
  },
  badge: {
    backgroundColor: 'var(--violet-light)',
    color: 'var(--violet)',
    border: '1px solid rgba(108, 92, 231, 0.25)',
    padding: '3px 10px',
    borderRadius: '12px',
    fontSize: '0.72rem',
    fontWeight: 700
  },
  description: {
    fontSize: '0.875rem',
    color: 'var(--dark-muted)',
    marginTop: '4px',
    maxWidth: '750px',
    lineHeight: 1.5
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  }
};
