import React from 'react';
import ComingSoon from './ComingSoon';

const RotatePDF = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Rotate PDF"
      description="Rotate PDF pages to the correct orientation. Fix upside-down or sideways pages and adjust the viewing angle of your documents."
      onBackClick={onBackClick}
    />
  );
};

export default RotatePDF; 