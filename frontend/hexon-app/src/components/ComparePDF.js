import React from 'react';
import ComingSoon from './ComingSoon';

const ComparePDF = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Compare PDF"
      description="Compare two PDF documents to identify differences. Highlight changes, additions, and deletions between document versions."
      onBackClick={onBackClick}
    />
  );
};

export default ComparePDF; 