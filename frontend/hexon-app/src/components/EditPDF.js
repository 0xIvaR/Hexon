import React from 'react';
import ComingSoon from './ComingSoon';

const EditPDF = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Edit PDF"
      description="Edit text, images, and other content in your PDF documents. Make changes directly to your PDFs without converting to other formats."
      onBackClick={onBackClick}
    />
  );
};

export default EditPDF; 