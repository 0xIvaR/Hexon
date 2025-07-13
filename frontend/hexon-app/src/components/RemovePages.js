import React from 'react';
import ComingSoon from './ComingSoon';

const RemovePages = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Remove Pages"
      description="Remove specific pages from your PDF document. Select page ranges or individual pages to delete and create a new PDF without them."
      onBackClick={onBackClick}
    />
  );
};

export default RemovePages; 