import React from 'react';
import ComingSoon from './ComingSoon';

const RedactPDF = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Redact PDF"
      description="Permanently remove sensitive information from PDF documents. Black out confidential data, personal information, or classified content."
      onBackClick={onBackClick}
    />
  );
};

export default RedactPDF; 