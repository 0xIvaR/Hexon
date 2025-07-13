import React from 'react';
import ComingSoon from './ComingSoon';

const AddWatermark = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Add Watermark"
      description="Add text or image watermarks to your PDF documents. Protect your content with custom watermarks, logos, or copyright notices."
      onBackClick={onBackClick}
    />
  );
};

export default AddWatermark; 