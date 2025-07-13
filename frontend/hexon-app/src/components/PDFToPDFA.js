import React from 'react';
import ComingSoon from './ComingSoon';

const PDFToPDFA = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="PDF to PDF/A"
      description="Convert regular PDF documents to PDF/A format for long-term archival. Ensure your documents meet archival standards and compliance requirements."
      onBackClick={onBackClick}
    />
  );
};

export default PDFToPDFA; 