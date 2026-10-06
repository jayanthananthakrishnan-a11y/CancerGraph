import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { EmptyState } from '../components/common/EmptyState';
import { FileText, Printer, Download } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  return (
    <div>
      <SectionHeader 
        title="Structured Clinical & Research Reports Architecture"
        description="Standardized reporting workspace generating verifiable clinical summaries with model lineage, evaluated modalities, and evidence trace."
        badgeText="Report Generator Shell"
      >
        <button className="btn btn-secondary btn-sm" disabled style={{ opacity: 0.7 }}>
          <Printer size={14} />
          <span>Print Spec</span>
        </button>
        <button className="btn btn-primary btn-sm" disabled style={{ opacity: 0.7 }}>
          <Download size={14} />
          <span>Export PDF Schema</span>
        </button>
      </SectionHeader>

      {/* Report Template Spec Card */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.headerTitle}>
            <FileText size={20} color="var(--royal-blue)" />
            <h3 style={styles.title}>CancerGraph Clinical Report Template Schema</h3>
          </div>
          <span style={styles.schemaBadge}>PDF / JSON Schema Specification</span>
        </div>

        <div style={styles.schemaGrid}>
          <div style={styles.schemaSection}>
            <h4 style={styles.secTitle}>1. Patient & Case Identifiers</h4>
            <ul style={styles.list}>
              <li>Patient Pseudonym ID / Case Reference</li>
              <li>Cancer Module (Glioma, Breast, Lung, Liver, Prostate)</li>
              <li>Anatomical Site & ICD Classification Code</li>
            </ul>
          </div>

          <div style={styles.schemaSection}>
            <h4 style={styles.secTitle}>2. Evaluated Input Modalities</h4>
            <ul style={styles.list}>
              <li>Imaging: MRI Sequences (T1, T1Gd, T2, FLAIR)</li>
              <li>Clinical: Demographics & KPS Baseline</li>
              <li>Omics: IDH1/2 & MGMT Methylation Status</li>
            </ul>
          </div>

          <div style={styles.schemaSection}>
            <h4 style={styles.secTitle}>3. Model Lineage & Versioning</h4>
            <ul style={styles.list}>
              <li>Model Architecture Identifier & Version Tag</li>
              <li>Multimodal Fusion Strategy (GNN Intermediate Fusion)</li>
              <li>Modality Availability Compatibility Hash</li>
            </ul>
          </div>

          <div style={styles.schemaSection}>
            <h4 style={styles.secTitle}>4. Analytical Outputs</h4>
            <ul style={styles.list}>
              <li>Subtype Classification & Class Probabilities</li>
              <li>3D Tumor Segmentation Sub-region Volumes</li>
              <li>Survival Hazard & Progression Risk Category</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <EmptyState 
          title="Report Generation Workspace Awaiting Ingested Results"
          description="Reports will be automatically compiled upon completion of patient inference runs in Phase 2+. Fabricated or synthetic reports are strictly excluded per Phase 1 specification."
          icon="report"
          targetPhaseNote="Clinical PDF & Sign-off Engine Targeted for Phase 2"
        />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: 'var(--shadow-sm)'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '14px',
    borderBottom: '1px solid var(--border-subtle)'
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)'
  },
  schemaBadge: {
    fontSize: '0.72rem',
    fontWeight: 700,
    padding: '4px 10px',
    borderRadius: '12px',
    backgroundColor: 'var(--royal-blue-light)',
    color: 'var(--royal-blue)'
  },
  schemaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px'
  },
  schemaSection: {
    backgroundColor: 'var(--cool-white)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '16px'
  },
  secTitle: {
    fontSize: '0.88rem',
    fontWeight: 700,
    color: 'var(--deep-indigo)',
    marginBottom: '10px'
  },
  list: {
    paddingLeft: '18px',
    fontSize: '0.8rem',
    color: 'var(--dark-muted)',
    lineHeight: 1.6
  }
};
