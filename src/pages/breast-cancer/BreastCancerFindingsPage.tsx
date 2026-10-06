import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { CancerSubNav } from '../../components/layout/CancerSubNav';
import { Award } from 'lucide-react';

export const BreastCancerFindingsPage: React.FC = () => {
  const findings = [
    {
      id: 'Finding 1',
      title: 'Label-Aligned Latent Subspace Transfer Under Low-Sample Constraints',
      evidence: 'MODEL-DERIVED',
      color: '#3155B5',
      observation: 'Transferring class-discriminant latent subspace projections from source modalities (FNA Morphometry or Histopathology) to ultrasound imaging (BUSI) yielded a modest ROC-AUC gain (+0.0100) under N=50/class constraints.',
      math: 'Latent subspace projection regularizes target decision boundaries along principal discriminant axes, preserving centroid separation ratio: (||μ1 - μ0||) / σ_within.',
      limitation: 'Modest improvement (+0.01 AUC) due to lack of patient-level pairing across distinct institution cohorts.'
    },
    {
      id: 'Finding 2',
      title: 'Class-Discriminant Feature Dominance in FNA Morphometry vs Clinical Markers',
      evidence: 'STATISTICALLY SUPPORTED',
      color: '#22C55E',
      observation: 'FNA-derived nuclear morphometry (WDBC) exhibits significantly stronger univariate feature-to-outcome correlations (up to r = 0.7935) compared to clinical blood markers (Coimbra max r = 0.4157).',
      math: 'Variance in diagnostic state Y is more strongly aligned with local cellular geometry X_morph than systemic metabolic parameters X_clinical.',
      limitation: 'Coimbra clinical parameters evaluated on a small single-center cohort (116 subjects).'
    },
    {
      id: 'Finding 3',
      title: 'Cross-Modal Representation Centroid Separation',
      evidence: 'OBSERVED',
      color: '#E5A638',
      observation: 'Latent feature representations across distinct modalities exhibit consistent malignant-vs-benign centroid separation, with morphometry displaying the highest separation distance (5.81 vs ultrasound 1.45).',
      math: 'High-separability source spaces serve as anchor domains for guiding target representation learning in lower-separability visual modalities.',
      limitation: 'Centroid distances depend on spatial texture feature extraction pipelines.'
    }
  ];

  return (
    <div>
      <CancerSubNav cancerType="breast" />
      <SectionHeader
        title="Research Findings & Evidence"
        description="Empirical observations, mathematical interpretations, and evidence classifications"
        badgeText="FINDINGS"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        {findings.map((f, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: f.color }}>{f.id}</span>
              <span style={{ ...badgeStyle, backgroundColor: `${f.color}20`, borderColor: `${f.color}50`, color: f.color }}>
                <Award size={12} /> {f.evidence}
              </span>
            </div>

            <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', margin: '0 0 10px 0' }}>{f.title}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: '#9AA4B5' }}>
              <div><strong style={{ color: '#D2D8E4' }}>Observation:</strong> {f.observation}</div>
              <div><strong style={{ color: '#D2D8E4' }}>Mathematical Intuition:</strong> <code style={{ color: '#5BC7D8' }}>{f.math}</code></div>
              <div><strong style={{ color: '#E5A638' }}>Limitation:</strong> {f.limitation}</div>
            </div>
          </div>
        ))}
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

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '0.7rem',
  fontWeight: 800,
  padding: '2px 8px',
  borderRadius: '4px',
  border: '1px solid'
};
