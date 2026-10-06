import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { CancerSubNav } from '../../components/layout/CancerSubNav';
import { Layers } from 'lucide-react';

export const BreastCancerDatasetsPage: React.FC = () => {
  const datasets = [
    { name: 'Wisconsin Diagnostic (WDBC)', modality: 'Tabular FNA Nuclear Morphometry', samples: '569 rows (30 features)', status: 'Candidate Source', pairing: 'Unpaired (Cross-dataset)' },
    { name: 'Breast Cancer Coimbra', modality: 'Tabular Clinical Blood Markers', samples: '116 rows (9 features)', status: 'Candidate Source', pairing: 'Unpaired (Cross-dataset)' },
    { name: 'BUSI (Breast Ultrasound)', modality: '2D Ultrasound Imaging + Masks', samples: '780 images (3 classes)', status: 'Primary Target', pairing: 'Intra-dataset Image+Mask' },
    { name: 'BreakHis Histopathology', modality: 'Microscopic Histopathology (40X-400X)', samples: '7,909 slide images', status: 'Candidate Source', pairing: 'Intra-dataset Multi-mag' },
    { name: 'METABRIC', modality: 'Multi-omics (RNA + Mutation) + Clinical', samples: '1,904 patients (693 features)', status: 'Planned Omics', pairing: 'Intra-dataset Multi-omics' },
    { name: 'CBIS-DDSM Mammography', modality: 'Scanned Film Mammography', samples: '3,103 cases + ROIs', status: 'Planned Mammography', pairing: 'Intra-dataset Multi-view' },
    { name: 'IDC Breast Histopathology', modality: '100x100 Histology Patches', samples: '277,524 patches', status: 'Large Dataset (Deferred)', pairing: 'Unpaired (Cross-dataset)' },
    { name: 'VinDr-Mammo', modality: 'Full-Field Digital Mammography', samples: '~5,000 FFDM studies', status: 'Large Dataset (Deferred)', pairing: 'Intra-dataset Multi-view' },
  ];

  return (
    <div>
      <CancerSubNav cancerType="breast" />
      <SectionHeader
        title="Breast Cancer Dataset Registry"
        description="Metadata-first audit of 8 available datasets across 6 biomedical modalities"
        badgeText="DATASETS"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {datasets.map((d, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#FFFFFF', margin: 0, fontWeight: 700 }}>{d.name}</h3>
              <span style={statusBadge}>{d.status}</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#9AA4B5', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div><strong style={{ color: '#D2D8E4' }}>Modality:</strong> {d.modality}</div>
              <div><strong style={{ color: '#D2D8E4' }}>Samples / Features:</strong> {d.samples}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#5BC7D8' }}>
                <Layers size={14} />
                <span><strong>Pairing:</strong> {d.pairing}</span>
              </div>
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
  padding: '20px'
};

const statusBadge: React.CSSProperties = {
  backgroundColor: 'rgba(91, 199, 216, 0.15)',
  border: '1px solid rgba(91, 199, 216, 0.3)',
  color: '#5BC7D8',
  fontSize: '0.7rem',
  fontWeight: 700,
  padding: '2px 8px',
  borderRadius: '4px'
};
