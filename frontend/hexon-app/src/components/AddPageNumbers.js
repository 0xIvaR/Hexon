import React from 'react';
import ComingSoon from './ComingSoon';

const AddPageNumbers = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Add Page Numbers"
      description="Add page numbers to your PDF documents. Choose from different numbering styles, positions, and formatting options to match your document needs."
      onBackClick={onBackClick}
    />
  );
};

export default AddPageNumbers; 