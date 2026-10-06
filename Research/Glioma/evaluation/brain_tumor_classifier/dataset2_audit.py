"""
Dataset2 Audit Script for CancerGraph Glioma Research Module
Target Directory: Research/Glioma/datasets/Dataset2
"""

import os
import glob
from PIL import Image
import json
from collections import Counter

dataset_dir = r"c:\Users\akris\OneDrive\Desktop\Multimodal_Cancer_Classification_BetaVersion\Research\Glioma\datasets\Dataset2"

subfolders = ['Training', 'Testing']
classes = ['glioma', 'meningioma', 'notumor', 'pituitary']

audit_report = {
    'dataset_name': 'Kaggle 4-Class Brain MRI Dataset (Dataset2)',
    'dataset_path': dataset_dir,
    'total_images': 0,
    'splits': {},
    'file_formats': {},
    'filename_patterns': {},
    'resolution_summary': {},
    'channel_summary': {},
    'data_leakage_assessment': ''
}

for split in subfolders:
    split_path = os.path.join(dataset_dir, split)
    split_info = {'total': 0, 'class_counts': {}}
    
    for cls in classes:
        cls_path = os.path.join(split_path, cls)
        if not os.path.exists(cls_path):
            continue
        
        files = glob.glob(os.path.join(cls_path, '*.*'))
        split_info['class_counts'][cls] = len(files)
        split_info['total'] += len(files)
        
        for f in files:
            audit_report['total_images'] += 1
            ext = os.path.splitext(f)[1].lower()
            audit_report['file_formats'][ext] = audit_report['file_formats'].get(ext, 0) + 1
            
            fname = os.path.basename(f)
            prefix = fname.split('_')[0] if '_' in fname else 'no_prefix'
            audit_report['filename_patterns'][prefix] = audit_report['filename_patterns'].get(prefix, 0) + 1
            
    audit_report['splits'][split] = split_info

# Sample resolutions and modes across all splits
sample_dims = Counter()
sample_modes = Counter()

for split in subfolders:
    for cls in classes:
        cls_path = os.path.join(dataset_dir, split, cls)
        files = glob.glob(os.path.join(cls_path, '*.*'))
        for f in files:
            with Image.open(f) as img:
                sample_dims[img.size] += 1
                sample_modes[img.mode] += 1

audit_report['resolution_summary'] = {
    'most_common_resolutions': {f"{w}x{h}": count for (w, h), count in sample_dims.most_common(10)},
    'total_unique_resolutions': len(sample_dims)
}
audit_report['channel_summary'] = dict(sample_modes)
audit_report['data_leakage_assessment'] = (
    "2D Kaggle Brain MRI datasets are constructed by extracting multiple 2D axial slice images "
    "from 3D patient MRI scans. Pre-defined Training/Testing splits in Dataset2 follow random "
    "slice allocation or augmented slice groupings (e.g., Tr-aug-me / Te-aug-me). Slices from "
    "the same patient 3D volume may appear in both Training and Testing splits, causing slice-level "
    "data leakage. Evaluation metrics on the test split evaluate slice-level classification accuracy "
    "under Kaggle benchmark conditions, which should be understood as ideal slice baseline metrics."
)

output_json_path = r"c:\Users\akris\OneDrive\Desktop\Multimodal_Cancer_Classification_BetaVersion\Research\Glioma\evaluation\results\dataset2_audit_report.json"
os.makedirs(os.path.dirname(output_json_path), exist_ok=True)

with open(output_json_path, 'w') as f:
    json.dump(audit_report, f, indent=2)

print(f"Dataset2 audit complete. Saved report to: {output_json_path}")
print(json.dumps(audit_report, indent=2))
