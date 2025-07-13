import React from 'react';
import ComingSoon from './ComingSoon';

const OrganizePDF = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Organize PDF"
      description="Reorganize your PDF pages by reordering, rotating, or rearranging them. Create a perfectly organized document structure."
      onBackClick={onBackClick}
    />
  );
};

export default OrganizePDF; 