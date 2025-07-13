import React from 'react';
import ComingSoon from './ComingSoon';

const PDFToExcel = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="PDF to Excel"
      description="Convert PDF documents containing tables and data to Excel spreadsheets. Extract tabular data and make it editable and analyzable."
      onBackClick={onBackClick}
    />
  );
};

export default PDFToExcel; 