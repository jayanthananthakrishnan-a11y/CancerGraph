import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { CancerSubNav } from '../../components/layout/CancerSubNav';
import { ShieldAlert, GitMerge, Database, Layers } from 'lucide-react';

export const BreastCancerOverviewPage: React.FC = () => {
  return (
    <div>
      <CancerSubNav cancerType="breast" />
      <SectionHeader
        title="Breast Cancer Research Prototype"
        description="Cross-modal transfer learning under unpaired & missing-modality conditions"
        badgeText="RESEARCH"
      />

      {/* Core Research Goal Banner */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <GitMerge color="#5BC7D8" size={24} />
          <h2 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0 }}>Primary Research Goal</h2>
        </div>
        <p style={{ color: '#9AA4B5', lineHeight: '1.6', fontSize: '0.95rem' }}>
          Investigate whether representations, discriminative information, or learned knowledge from one breast cancer 
          modality (e.g., FNA nuclear morphometry or microscopic histopathology) can improve classification using 
          another modality (e.g., 2D ultrasound imaging) when complete patient-aligned multimodal data are unavailable.
        </p>
      </div>

      {/* Research Scope Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '24px' }}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Database size={20} color="#3155B5" />
            <h3 style={{ fontSize: '1.05rem', color: '#FFFFFF', margin: 0 }}>Audited Dataset Landscape</h3>
          </div>
          <p style={{ color: '#9AA4B5', fontSize: '0.88rem', lineHeight: '1.5' }}>
            8 public breast cancer datasets covering 6 distinct modalities: FNA nuclear morphometry, clinical blood markers,
            microscopic histopathology, 2D ultrasound, scanned film mammography, and multi-omics RNA/mutations.
          </p>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <ShieldAlert size={20} color="#E5A638" />
            <h3 style={{ fontSize: '1.05rem', color: '#FFFFFF', margin: 0 }}>Strict Unpaired Data Safeguard</h3>
          </div>
          <p style={{ color: '#9AA4B5', fontSize: '0.88rem', lineHeight: '1.5' }}>
            Datasets originate from disjoint patient cohorts across institutions. Direct patient-to-patient pairing is 
            strictly prohibited. Transfer is evaluated via <strong>label-aligned representation transfer</strong>.
          </p>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Layers size={20} color="#22C55E" />
            <h3 style={{ fontSize: '1.05rem', color: '#FFFFFF', margin: 0 }}>Resource-Bounded Execution</h3>
          </div>
          <p style={{ color: '#9AA4B5', fontSize: '0.88rem', lineHeight: '1.5' }}>
            All experiments operate under deterministic prototype limits (max 50 samples/class, max 100–200 total samples, seed 42).
            Zero full-dataset processing or memory-heavy array loading.
          </p>
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
