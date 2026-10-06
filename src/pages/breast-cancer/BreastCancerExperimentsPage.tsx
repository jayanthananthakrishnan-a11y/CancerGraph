import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { CancerSubNav } from '../../components/layout/CancerSubNav';
import { getBreastCancerData } from '../../services/breastCancerData';
import { TrendingUp, CheckCircle } from 'lucide-react';

export const BreastCancerExperimentsPage: React.FC = () => {
  const { experiments } = getBreastCancerData();

  return (
    <div>
      <CancerSubNav cancerType="breast" />
      <SectionHeader
        title="Cross-Modal Transfer Experiments"
        description="Controlled low-sample baseline vs transfer model evaluations"
        badgeText="EXPERIMENTS"
      />

      {/* Experiments Results Table */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={20} color="#5BC7D8" />
          Controlled Empirical Results (Target: BUSI Ultrasound, N=50/class)
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Experiment ID</th>
                <th style={thStyle}>Source Modality</th>
                <th style={thStyle}>Target Modality</th>
                <th style={thStyle}>Baseline AUC</th>
                <th style={thStyle}>Transfer AUC</th>
                <th style={thStyle}>AUC Delta</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {experiments.map((exp) => (
                <tr key={exp.experiment_id} style={trStyle}>
                  <td style={tdStyle}><code style={{ color: '#5BC7D8' }}>{exp.experiment_id}</code></td>
                  <td style={tdStyle}>{exp.source_modality}</td>
                  <td style={tdStyle}>{exp.target_modality}</td>
                  <td style={tdStyle}>{exp.target_only_baseline.metrics.roc_auc.toFixed(4)}</td>
                  <td style={tdStyle}>{exp.transfer_results.metrics.roc_auc.toFixed(4)}</td>
                  <td style={{ ...tdStyle, color: exp.metric_deltas.roc_auc >= 0 ? '#22C55E' : '#EF4444', fontWeight: 700 }}>
                    {exp.metric_deltas.roc_auc >= 0 ? '+' : ''}{exp.metric_deltas.roc_auc.toFixed(4)}
                  </td>
                  <td style={tdStyle}>
                    <span style={statusTag}>
                      <CheckCircle size={12} /> COMPLETED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--deep-surface)',
  border: '1px solid var(--border-dark)',
  borderRadius: '12px',
  padding: '24px'
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
  fontSize: '0.88rem'
};

const thStyle: React.CSSProperties = {
  color: 'var(--cool-gray)',
  borderBottom: '1px solid var(--border-dark)',
  padding: '12px 10px',
  fontWeight: 700
};

const trStyle: React.CSSProperties = {
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
};

const tdStyle: React.CSSProperties = {
  padding: '12px 10px',
  color: '#D2D8E4'
};

const statusTag: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '0.7rem',
  fontWeight: 700,
  backgroundColor: 'rgba(34, 197, 94, 0.15)',
  color: '#22C55E',
  padding: '2px 8px',
  borderRadius: '4px'
};
