import React from 'react';
import ComingSoon from './ComingSoon';

const PDFToWord = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="PDF to Word"
      description="Convert PDF documents to editable Word format. Preserve formatting, images, and layout while making your content fully editable."
      onBackClick={onBackClick}
    />
  );
};

export default PDFToWord; 