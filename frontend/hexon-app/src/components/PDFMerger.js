import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import {
  CloudUpload,
  PictureAsPdf,
  Delete,
  Download,
  Merge
} from '@mui/icons-material';
import axios from 'axios';

const PDFMerger = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
    setError('');
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await axios.post('http://localhost:5000/merge', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data.path);
    } catch (err) {
      setError('Error merging PDFs. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setFiles([]);
    setResult(null);
    setError('');
  };

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
            color: 'primary.main'
          }}
        >
          PDF Merger
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            fontSize: { xs: '0.875rem', sm: '1rem' },
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          Combine multiple PDF files into a single document
        </Typography>
      </Box>

      {/* Upload Area */}
      <Paper
        sx={{
          p: { xs: 4, sm: 6, md: 8 },
          mb: 3,
          border: '2px dashed',
          borderColor: files.length > 0 ? 'primary.main' : '#ccc',
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          backgroundColor: files.length > 0 ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
          minHeight: { xs: 200, sm: 250, md: 300 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(25, 118, 210, 0.15)'
          }
        }}
        component="label"
        elevation={0}
      >
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        {/* Upload Icon Container */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: '50%',
            backgroundColor: files.length > 0 ? 'rgba(25, 118, 210, 0.1)' : 'rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s ease',
          }}
        >
          <CloudUpload 
            sx={{ 
              fontSize: { xs: 48, sm: 56, md: 64 }, 
              color: files.length > 0 ? 'primary.main' : 'text.secondary',
              transition: 'all 0.3s ease',
            }} 
          />
        </Box>
        
        {/* Main Text */}
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
            fontWeight: 600,
            color: 'text.primary',
            mb: 1
          }}
        >
          Drop PDF files here or click to browse
        </Typography>
        
        {/* Description Text */}
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            fontSize: { xs: '0.875rem', sm: '1rem' },
            maxWidth: 400,
            lineHeight: 1.5
          }}
        >
          Select multiple PDF files to merge into a single document
        </Typography>
        
        {/* Visual Enhancement - Dashed Border Animation */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 3,
            pointerEvents: 'none',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              borderRadius: 3,
              padding: 2,
              background: 'linear-gradient(45deg, transparent, rgba(25, 118, 210, 0.1), transparent)',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }
          }}
        />
      </Paper>

      {/* Selected Files */}
      {files.length > 0 && (
        <Paper sx={{ mb: 3, borderRadius: 2 }} elevation={1}>
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1
          }}>
            <Typography 
              variant="h6"
              sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >
              Selected Files ({files.length})
            </Typography>
            <Button 
              onClick={clearAll} 
              size="small"
              variant="outlined"
              color="error"
            >
              Clear All
            </Button>
          </Box>
          <Divider />
          <List sx={{ py: 0 }}>
            {files.map((file, index) => (
              <ListItem 
                key={index}
                sx={{ 
                  py: 1.5,
                  px: 2,
                  '&:not(:last-child)': {
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <PictureAsPdf color="error" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 500,
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        wordBreak: 'break-word'
                      }}
                    >
                      {file.name}
                    </Typography>
                  }
                  secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                />
                <Chip 
                  label={`#${index + 1}`} 
                  size="small" 
                  color="primary"
                  variant="outlined"
                  sx={{ mr: 1, minWidth: 45 }} 
                />
                <IconButton 
                  onClick={() => removeFile(index)} 
                  color="error"
                  size="small"
                >
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Success Alert */}
      {result && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <Typography sx={{ flexGrow: 1 }}>
              PDF merged successfully!
            </Typography>
            <Button
              variant="contained"
              startIcon={<Download />}
              href={`http://localhost:5000${result}`}
              download
              size="small"
              sx={{ alignSelf: { xs: 'center', sm: 'auto' } }}
            >
              Download
            </Button>
          </Stack>
        </Alert>
      )}

      {/* Action Button */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        mt: 4
      }}>
        <Button
          variant="contained"
          onClick={mergePDFs}
          disabled={files.length < 2 || loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Merge />}
          size="large"
          sx={{ 
            py: 1.5,
            px: 4,
            borderRadius: 3,
            textTransform: 'none',
            fontSize: { xs: '1rem', sm: '1.125rem' },
            fontWeight: 600,
            minWidth: 200,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
              transform: 'translateY(-1px)'
            }
          }}
        >
          {loading ? 'Merging...' : 'Merge PDFs'}
        </Button>
      </Box>
    </Box>
  );
};

export default PDFMerger; 