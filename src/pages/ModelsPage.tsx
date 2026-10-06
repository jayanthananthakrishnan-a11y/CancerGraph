import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { MODEL_REGISTRY } from '../config/models';
import { ModelCard } from '../components/models/ModelCard';
import { ModalitySelector } from '../components/common/ModalitySelector';
import { evaluateModelCompatibility } from '../services/modalityEngine';
import { CANCER_REGISTRY } from '../config/cancers';
import type { ModalityCategory } from '../types/modality';
import { Filter } from 'lucide-react';

export const ModelsPage: React.FC = () => {
  const [selectedCancer, setSelectedCancer] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalities, setActiveModalities] = useState<ModalityCategory[]>([
    'clinical', 'imaging', 'genomics', 'radiomics', 'pathology'
  ]);

  const filteredModels = MODEL_REGISTRY.filter(m => {
    const matchesCancer = selectedCancer === 'all' || m.cancerTypeId === selectedCancer;
    const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
    return matchesCancer && matchesCat;
  });

  const evaluatedModels = filteredModels.map(m => evaluateModelCompatibility(activeModalities, m));

  return (
    <div>
      <SectionHeader 
        title="Model Registry Architecture"
        description="Single-modality vision/clinical models and multimodal GNN fusion architectures registered in CancerGraph."
        badgeText={`${MODEL_REGISTRY.length} Architectures Defined`}
      />

      {/* Interactive Modality Sandbox Header */}
      <div style={{ marginBottom: '24px' }}>
        <ModalitySelector 
          selectedModalities={activeModalities}
          onChange={setActiveModalities}
          title="Active Input Modalities (Dynamic Model Compatibility Filter)"
        />
      </div>

      {/* Filters */}
      <div style={styles.filterBar}>
        <div style={styles.filterGroup}>
          <Filter size={15} color="var(--dark-muted)" />
          <span style={styles.filterLabel}>Cancer Target:</span>
          <select 
            value={selectedCancer}
            onChange={(e) => setSelectedCancer(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Cancers</option>
            {CANCER_REGISTRY.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>Model Category:</span>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Categories</option>
            <option value="Vision Models">Vision Models</option>
            <option value="Clinical Feature Models">Clinical Feature Models</option>
            <option value="Genomic Models">Genomic Models</option>
            <option value="Graph Neural Networks (GNN)">Graph Neural Networks (GNN)</option>
            <option value="Multimodal Fusion Models">Multimodal Fusion Models</option>
          </select>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div style={styles.grid}>
        {evaluatedModels.map(item => (
          <ModelCard 
            key={item.model.id}
            model={item.model}
            compatibility={item}
          />
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  filterBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  filterLabel: {
    fontSize: '0.8rem',
    color: 'var(--dark-muted)',
    fontWeight: 600
  },
  select: {
    padding: '7px 12px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    backgroundColor: '#FFFFFF',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--dark-text)',
    outline: 'none',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '20px'
  }
};
