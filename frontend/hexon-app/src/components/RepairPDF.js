import React from 'react';
import ComingSoon from './ComingSoon';

const RepairPDF = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Repair PDF"
      description="Fix corrupted or damaged PDF files. Our advanced repair tool can recover content from files that won't open or display properly."
      onBackClick={onBackClick}
    />
  );
};

export default RepairPDF; 