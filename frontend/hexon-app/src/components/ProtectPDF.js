import React from 'react';
import ComingSoon from './ComingSoon';

const ProtectPDF = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Protect PDF"
      description="Add password protection and encryption to your PDF documents. Secure sensitive information with user and owner passwords."
      onBackClick={onBackClick}
    />
  );
};

export default ProtectPDF; 