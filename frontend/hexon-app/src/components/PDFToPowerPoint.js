import React from 'react';
import ComingSoon from './ComingSoon';

const PDFToPowerPoint = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="PDF to PowerPoint"
      description="Convert PDF documents to PowerPoint presentations. Transform static PDFs into editable slides while maintaining visual elements."
      onBackClick={onBackClick}
    />
  );
};

export default PDFToPowerPoint; 