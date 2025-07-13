import React from 'react';
import ComingSoon from './ComingSoon';

const OCRPDF = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="OCR PDF"
      description="Convert scanned PDFs and images to searchable text. Extract text from documents using advanced Optical Character Recognition technology."
      onBackClick={onBackClick}
    />
  );
};

export default OCRPDF; 