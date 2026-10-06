import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { CANCER_REGISTRY } from '../config/cancers';
import { CancerCard } from '../components/cancers/CancerCard';
import { Search, Filter } from 'lucide-react';

export const CancersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');

  const filteredCancers = CANCER_REGISTRY.filter(cancer => {
    const matchesSearch = cancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cancer.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cancer.anatomicalSite.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedPhase === 'all') return matchesSearch;
    if (selectedPhase === 'phase2') return matchesSearch && cancer.phase === 2;
    if (selectedPhase === 'planned') return matchesSearch && cancer.phase > 2;
    return matchesSearch;
  });

  return (
    <div>
      <SectionHeader 
        title="Cancer Registry Architecture"
        description="Independent cancer modules integrated into CancerGraph's extensible multi-cancer shell."
        badgeText="5 Registered Modules"
      />

      {/* Filter and Search Bar */}
      <div style={styles.filterBar}>
        <div style={styles.searchBox}>
          <Search size={16} color="var(--cool-gray)" />
          <input 
            type="text" 
            placeholder="Filter cancers by name, site, or biomarkers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filterGroup}>
          <Filter size={15} color="var(--dark-muted)" />
          <span style={styles.filterLabel}>Target Phase:</span>
          <button 
            style={{
              ...styles.filterBtn,
              ...(selectedPhase === 'all' ? styles.filterBtnActive : {})
            }}
            onClick={() => setSelectedPhase('all')}
          >
            All Cancers (5)
          </button>
          <button 
            style={{
              ...styles.filterBtn,
              ...(selectedPhase === 'phase2' ? styles.filterBtnActive : {})
            }}
            onClick={() => setSelectedPhase('phase2')}
          >
            Phase 2 Target (Glioma)
          </button>
          <button 
            style={{
              ...styles.filterBtn,
              ...(selectedPhase === 'planned' ? styles.filterBtnActive : {})
            }}
            onClick={() => setSelectedPhase('planned')}
          >
            Phase 3–6 Roadmap
          </button>
        </div>
      </div>

      {/* Grid of Cancers */}
      <div style={styles.grid}>
        {filteredCancers.map(cancer => (
          <CancerCard key={cancer.id} cancer={cancer} />
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
  filterBtn: {
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    backgroundColor: '#FFFFFF',
    fontSize: '0.78rem',
    fontWeight: 600,
    color: 'var(--dark-muted)',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  filterBtnActive: {
    backgroundColor: 'var(--royal-blue)',
    color: '#FFFFFF',
    borderColor: 'var(--royal-blue)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '20px'
  }
};
