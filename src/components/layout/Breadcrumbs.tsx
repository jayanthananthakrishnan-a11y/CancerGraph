import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { CANCER_REGISTRY } from '../../config/cancers';
import { MODALITY_REGISTRY } from '../../config/modalities';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // If on home landing page, don't show trailing breadcrumbs
  if (pathnames.length === 0 || pathnames[0] === 'landing' || pathnames[0] === 'cancers') {
    return (
      <nav style={styles.breadcrumbNav} aria-label="Breadcrumb">
        <Link to="/" style={styles.homeLink}>
          <Home size={14} style={{ marginRight: '6px' }} />
          <span>Home</span>
        </Link>
      </nav>
    );
  }

  const formatBreadcrumb = (part: string, index: number, array: string[]) => {
    if (array[index - 1] === 'cancers' || array[index - 1] === 'planned-domains') {
      const cancer = CANCER_REGISTRY.find(c => c.id === part);
      return cancer ? cancer.name.replace(' (Planned)', '') : part;
    }

    if (array[index - 1] === 'modalities') {
      const modality = MODALITY_REGISTRY.find(m => m.id === part);
      return modality ? modality.name : part;
    }

    const titleMap: Record<string, string> = {
      dashboard: 'Dashboard',
      glioma: 'Glioma Workspace',
      'breast-cancer': 'Breast Cancer Workspace',
      analysis: 'AI Application',
      research: 'BTP Research',
      mri: 'Live MRI Detection',
      patient: 'Patient Workbench',
      overview: 'Overview',
      datasets: 'Dataset Registry',
      architecture: 'Model Architecture',
      evaluation: 'Empirical Evaluation',
      models: 'Registered Models',
      experiments: 'Experiments',
      reports: 'Reports & Findings',
      findings: 'Findings',
      modalities: 'Diagnostic Modalities',
      'planned-domains': 'Planned Roadmap'
    };

    return titleMap[part] || part.charAt(0).toUpperCase() + part.slice(1);
  };

  return (
    <nav style={styles.breadcrumbNav} aria-label="Breadcrumb">
      <Link to="/" style={styles.homeLink}>
        <Home size={14} />
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = formatBreadcrumb(value, index, pathnames);

        return (
          <React.Fragment key={to}>
            <ChevronRight size={13} color="var(--cool-gray)" />
            {isLast ? (
              <span style={styles.current}>{label}</span>
            ) : (
              <Link to={to} style={styles.link}>
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

const styles: Record<string, React.CSSProperties> = {
  breadcrumbNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.8rem',
    color: 'var(--dark-muted)'
  },
  homeLink: {
    color: 'var(--dark-muted)',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontWeight: 500
  },
  link: {
    color: 'var(--dark-muted)',
    textDecoration: 'none',
    fontWeight: 500
  },
  current: {
    color: 'var(--deep-indigo)',
    fontWeight: 700
  }
};
