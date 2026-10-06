import React from 'react';
import type { ModalityCategory } from '../../types/modality';

interface ModalityBadgeProps {
  modality: ModalityCategory | string;
  size?: 'sm' | 'md';
}

export const ModalityBadge: React.FC<ModalityBadgeProps> = ({ modality, size = 'md' }) => {
  const mLower = modality.toLowerCase() as ModalityCategory;

  let badgeClass = 'badge-gray';
  let label = modality;

  switch (mLower) {
    case 'imaging':
      badgeClass = 'badge-cyan';
      label = 'Imaging';
      break;
    case 'clinical':
      badgeClass = 'badge-royal';
      label = 'Clinical';
      break;
    case 'genomics':
      badgeClass = 'badge-violet';
      label = 'Genomics';
      break;
    case 'pathology':
      badgeClass = 'badge-lavender';
      label = 'Pathology';
      break;
    case 'radiomics':
      badgeClass = 'badge-gray';
      label = 'Radiomics';
      break;
  }

  return (
    <span className={`badge ${badgeClass}`} style={size === 'sm' ? { fontSize: '0.7rem', padding: '2px 8px' } : {}}>
      {label}
    </span>
  );
};
