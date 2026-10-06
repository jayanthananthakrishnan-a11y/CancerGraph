import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { DATASET_REGISTRY } from '../config/datasets';
import { DatasetCard } from '../components/datasets/DatasetCard';
import { CANCER_REGISTRY } from '../config/cancers';
import { Search, Plus } from 'lucide-react';

export const DatasetsPage: React.FC = () => {
  const [selectedCancer, setSelectedCancer] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDatasets = DATASET_REGISTRY.filter(ds => {
    const matchesCancer = selectedCancer === 'all' || ds.cancerTypeId === selectedCancer;
    const matchesSearch = ds.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ds.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCancer && matchesSearch;
  });

  return (
    <div>
      <SectionHeader 
        title="Dataset Registry Architecture"
        description="Dataset schemas and multi-modal cohort definitions linked to cancer modules and modality requirements."
        badgeText={`${DATASET_REGISTRY.length} Schemas Registered`}
      >
        <button className="btn btn-primary btn-sm" style={{ opacity: 0.8, cursor: 'not-allowed' }} title="Dataset registration enabled in Phase 2+">
          <Plus size={14} />
          <span>Register Dataset Schema</span>
        </button>
      </SectionHeader>

      {/* Filters */}
      <div style={styles.filterBar}>
        <div style={styles.searchBox}>
          <Search size={16} color="var(--cool-gray)" />
          <input 
            type="text" 
            placeholder="Search datasets by cohort name or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>Cancer Target:</span>
          <select 
            value={selectedCancer}
            onChange={(e) => setSelectedCancer(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Cancers ({DATASET_REGISTRY.length})</option>
            {CANCER_REGISTRY.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dataset Grid */}
      <div style={styles.grid}>
        {filteredDatasets.map(ds => (
          <DatasetCard key={ds.id} dataset={ds} />
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  filterBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '16px',
    flexWrap: 'wrap'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '8px 14px',
    width: '340px',
    boxShadow: 'var(--shadow-sm)'
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: '0.85rem',
    width: '100%',
    color: 'var(--dark-text)',
    fontFamily: 'var(--font-main)'
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '20px'
  }
};
