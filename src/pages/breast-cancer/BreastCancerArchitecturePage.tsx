import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { CancerSubNav } from '../../components/layout/CancerSubNav';
import { Layers, ShieldAlert, Cpu } from 'lucide-react';

export const BreastCancerArchitecturePage: React.FC = () => {
  return (
    <div>
      <CancerSubNav cancerType="breast" />
      <SectionHeader
        title="Proposed CancerGraph Architecture"
        description="Future architectural proposal emerging organically from empirical findings"
        badgeText="ARCHITECTURE"
      />

      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span style={badgeStyle}>PROPOSED / FUTURE ARCHITECTURAL HYPOTHESIS</span>
        </div>

        <p style={{ color: '#9AA4B5', fontSize: '0.92rem', lineHeight: '1.6' }}>
          Based on empirical findings showing that cross-dataset patient cohorts are unpaired, a 
          <strong>Heterogeneous Multimodal Concept Graph</strong> is proposed. Instead of enforcing fake patient-to-patient 
          edges, the architecture connects sample nodes to canonical diagnostic prototype nodes, regularizing 
          unpaired representations across modalities.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '20px' }}>
          <div style={subCardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5BC7D8', marginBottom: '6px' }}>
              <Layers size={18} />
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#FFFFFF' }}>Diagnostic Prototype Nodes</h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#9AA4B5' }}>
              Represent canonical disease states (Benign, Malignant, ER+, HER2+). Class centroids act as shared alignment targets.
            </p>
          </div>

          <div style={subCardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3155B5', marginBottom: '6px' }}>
              <Cpu size={18} />
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#FFFFFF' }}>Heterogeneous Message Passing</h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#9AA4B5' }}>
              Sample representations aggregate class prototype messages: h_v = σ(W_self h_v + W_proto μ_proto).
            </p>
          </div>

          <div style={subCardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E5A638', marginBottom: '6px' }}>
              <ShieldAlert size={18} />
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#FFFFFF' }}>Missing-Modality Handling</h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#9AA4B5' }}>
              Status: <code>FUTURE WORK</code>. Missing input modalities infer targets by passing messages through active prototype nodes.
            </p>
          </div>
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

const subCardStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid var(--border-dark)',
  borderRadius: '8px',
  padding: '16px'
};

const badgeStyle: React.CSSProperties = {
  backgroundColor: 'rgba(229, 166, 56, 0.15)',
  border: '1px solid rgba(229, 166, 56, 0.3)',
  color: '#E5A638',
  fontSize: '0.72rem',
  fontWeight: 800,
  padding: '3px 8px',
  borderRadius: '4px'
};
