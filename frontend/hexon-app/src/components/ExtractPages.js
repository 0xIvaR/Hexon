import React from 'react';
import ComingSoon from './ComingSoon';

const ExtractPages = ({ onBackClick }) => {
  return (
    <ComingSoon 
      title="Extract Pages"
      description="Extract specific pages from your PDF document to create a new PDF file. Perfect for creating summaries or sharing specific sections."
      onBackClick={onBackClick}
    />
  );
};

export default ExtractPages; 