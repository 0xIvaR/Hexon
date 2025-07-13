import React from 'react';
import ComingSoon from './ComingSoon';

const SignPDF = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Sign PDF"
      description="Add digital signatures to your PDF documents. Create legally binding electronic signatures for contracts, agreements, and official documents."
      onBackClick={onBackClick}
    />
  );
};

export default SignPDF; 