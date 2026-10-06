import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { CANCER_REGISTRY } from '../config/cancers';
import { MODEL_REGISTRY } from '../config/models';
import { ModalitySelector } from '../components/common/ModalitySelector';
import { evaluateModelCompatibility } from '../services/modalityEngine';
import type { ModalityCategory } from '../types/modality';
import { ModelCard } from '../components/models/ModelCard';
import { EmptyState } from '../components/common/EmptyState';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const PatientAnalysisPage: React.FC = () => {
  const [selectedCancer, setSelectedCancer] = useState<string>('glioma');
  const [activeModalities, setActiveModalities] = useState<ModalityCategory[]>([
    'clinical', 'imaging'
  ]);

  const cancerModels = MODEL_REGISTRY.filter(m => m.cancerTypeId === selectedCancer);
  const evaluatedModels = cancerModels.map(m => evaluateModelCompatibility(activeModalities, m));
  
  const compatibleModels = evaluatedModels.filter(e => e.isCompatible);
  const disabledModels = evaluatedModels.filter(e => !e.isCompatible);

  const activeCancer = CANCER_REGISTRY.find(c => c.id === selectedCancer);

  return (
    <div>
      <SectionHeader 
        title="Patient Analysis Architecture Sandbox"
        description="Test modality availability and dynamic model compatibility evaluation for patient-level clinical decision support."
        badgeText="Core Architectural Sandbox"
      />

      {/* Cancer Selection Tabs */}
      <div style={styles.cancerTabs}>
        <span style={styles.tabLabel}>Target Cancer:</span>
        {CANCER_REGISTRY.map(c => {
          const isActive = c.id === selectedCancer;
          return (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCancer(c.id);
              }}
              style={{
                ...styles.cancerTab,
                ...(isActive ? styles.cancerTabActive : {})
              }}
            >
              <span>{c.name}</span>
              {c.id === 'glioma' && <span style={styles.p2Badge}>P2 Target</span>}
            </button>
          );
        })}
      </div>

      {/* Modality Selector Box */}
      <div style={{ marginBottom: '28px' }}>
        <ModalitySelector 
          selectedModalities={activeModalities}
          onChange={setActiveModalities}
          title={`Patient Available Data Sources (${activeCancer?.name})`}
        />
      </div>

      {/* Results Header: Compatible vs Disabled Summary */}
      <div style={styles.summaryRow}>
        <div style={styles.compatPill}>
          <CheckCircle2 size={16} color="#047857" />
          <span>{compatibleModels.length} Compatible Models Enabled</span>
        </div>
        <div style={styles.disabledPill}>
          <AlertCircle size={16} color="#B91C1C" />
          <span>{disabledModels.length} Models Disabled (Missing Modalities)</span>
        </div>
      </div>

      {/* Models Grid */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={styles.subTitle}>Enabled & Compatible Models for Current Patient Data</h3>
        <p style={styles.subDesc}>The models below possess all required input modalities present in the selected patient dataset.</p>

        {compatibleModels.length > 0 ? (
          <div style={styles.grid}>
            {compatibleModels.map(item => (
              <ModelCard 
                key={item.model.id}
                model={item.model}
                compatibility={item}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No Models Compatible with Current Patient Modalities"
            description="Select additional patient modalities above (e.g. Clinical or Imaging) to enable single-stream or multimodal decision models."
            icon="info"
          />
        )}
      </div>

      {/* Disabled Models Section */}
      {disabledModels.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={styles.subTitle}>Disabled Models (Missing Required Patient Data)</h3>
          <p style={styles.subDesc}>These models cannot execute until the missing input modalities are provided.</p>

          <div style={styles.grid}>
            {disabledModels.map(item => (
              <ModelCard 
                key={item.model.id}
                model={item.model}
                compatibility={item}
              />
            ))}
          </div>
        </div>
      )}

      {/* Execution Pipeline Shell Empty State */}
      <EmptyState 
        title="Patient Analysis & Inference Execution Shell"
        description="Patient DICOM loading, genomic variant parsing, and model inference will connect in Phase 2+. For Phase 1, the modality compatibility engine dynamically controls model availability."
        icon="model"
        targetPhaseNote="Patient Ingestion Engine Targeted for Phase 2 (Glioma)"
      />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  cancerTabs: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  tabLabel: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--dark-muted)'
  },
  cancerTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    backgroundColor: '#FFFFFF',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--dark-text)',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  cancerTabActive: {
    backgroundColor: 'var(--deep-indigo)',
    color: '#FFFFFF',
    borderColor: 'var(--deep-indigo)'
  },
  p2Badge: {
    fontSize: '0.65rem',
    padding: '2px 6px',
    borderRadius: '4px',
    backgroundColor: 'var(--violet)',
    color: '#FFFFFF',
    fontWeight: 700
  },
  summaryRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px'
  },
  compatPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#ECFDF5',
    border: '1px solid #A7F3D0',
    borderRadius: 'var(--radius-md)',
    padding: '10px 16px',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#047857'
  },
  disabledPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#FEF2F2',
    border: '1px solid #FCA5A5',
    borderRadius: 'var(--radius-md)',
    padding: '10px 16px',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#B91C1C'
  },
  subTitle: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  subDesc: {
    fontSize: '0.8rem',
    color: 'var(--dark-muted)',
    marginBottom: '16px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '20px'
  }
};
