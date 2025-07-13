import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Construction, ArrowBack } from '@mui/icons-material';

const ComingSoon = ({ title, description, onBackClick }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '60vh',
      p: 3
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 6, 
          textAlign: 'center', 
          maxWidth: '500px',
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
      >
        <Construction 
          sx={{ 
            fontSize: '4rem', 
            color: 'primary.main', 
            mb: 2,
            animation: 'pulse 2s infinite'
          }} 
        />
        
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            color: 'text.primary',
            mb: 2
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ mb: 3 }}
        >
          Coming Soon!
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ mb: 4, lineHeight: 1.6 }}
        >
          {description || "We're working hard to bring you this feature. Stay tuned for updates!"}
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={onBackClick}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2 30%, #1BA3D3 90%)',
            }
          }}
        >
          Back to Home
        </Button>
      </Paper>
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </Box>
  );
};

export default ComingSoon; 