import React from 'react';
import ComingSoon from './ComingSoon';

const UnlockPDF = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Unlock PDF"
      description="Remove password protection from PDF documents. Unlock encrypted PDFs when you have the correct password to make them freely accessible."
      onBackClick={onBackClick}
    />
  );
};

export default UnlockPDF; 