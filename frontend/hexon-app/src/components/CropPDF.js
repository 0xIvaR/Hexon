import React from 'react';
import ComingSoon from './ComingSoon';

const CropPDF = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Crop PDF"
      description="Crop PDF pages to remove unwanted margins, headers, footers, or content. Focus on the important parts of your documents."
      onBackClick={onBackClick}
    />
  );
};

export default CropPDF; 