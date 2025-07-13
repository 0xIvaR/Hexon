import React from 'react';
import ComingSoon from './ComingSoon';

const ScanToPDF = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Scan to PDF"
      description="Scan physical documents using your camera or scanner and convert them directly to PDF format with automatic edge detection and enhancement."
      onBackClick={onBackClick}
    />
  );
};

export default ScanToPDF; 