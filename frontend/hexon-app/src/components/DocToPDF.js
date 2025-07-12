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
  CircularProgress,
  Alert,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import {
  CloudUpload,
  Description,
  Download,
  Transform
} from '@mui/icons-material';
import axios from 'axios';

const DocToPDF = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const acceptedTypes = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/msword', // .doc
    'application/vnd.oasis.opendocument.text', // .odt
    'text/plain', // .txt
    'application/rtf' // .rtf
  ];

  const acceptedExtensions = ['.doc', '.docx', '.odt', '.txt', '.rtf'];

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;
    
    // Check file type
    if (!acceptedTypes.includes(selectedFile.type)) {
      // Also check file extension as fallback
      const fileExtension = selectedFile.name.toLowerCase().match(/\.[^.]+$/)?.[0];
      if (!fileExtension || !acceptedExtensions.includes(fileExtension)) {
        return false;
      }
    }
    
    // Check file size (50MB limit)
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return false;
    }
    
    return true;
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setError('');
      setResult(null);
    } else {
      setError('Please select a valid document file (.doc, .docx, .odt, .txt, .rtf)');
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      const selectedFile = droppedFiles[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setError('');
        setResult(null);
      } else {
        setError('Please drop a valid document file (.doc, .docx, .odt, .txt, .rtf)');
      }
    }
  };

  const convertToPDF = async () => {
    if (!file) {
      setError('Please select a document file');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/doc-to-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data.path);
    } catch (err) {
      setError('Error converting document to PDF. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setResult(null);
    setError('');
  };

  const getFileExtension = (filename) => {
    return filename.split('.').pop().toUpperCase();
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
          Document to PDF Converter
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
          Convert Word documents, ODT, TXT, and RTF files to PDF format
        </Typography>
      </Box>

      {/* Upload Area */}
      <Paper
        sx={{
          p: { xs: 4, sm: 6, md: 8 },
          mb: 3,
          border: '2px dashed',
          borderColor: isDragOver ? 'primary.main' : (file ? 'primary.main' : '#ccc'),
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          backgroundColor: isDragOver ? 'rgba(25, 118, 210, 0.08)' : (file ? 'rgba(25, 118, 210, 0.04)' : 'transparent'),
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
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".doc,.docx,.odt,.txt,.rtf"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        {/* Upload Icon Container */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: '50%',
            backgroundColor: file ? 'rgba(25, 118, 210, 0.1)' : 'rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s ease',
          }}
        >
          <CloudUpload 
            sx={{ 
              fontSize: { xs: 48, sm: 56, md: 64 }, 
              color: isDragOver || file ? 'primary.main' : 'text.secondary',
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
          {isDragOver ? 'Drop document here' : 'Drop document here or click to browse'}
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
          Supported formats: DOC, DOCX, ODT, TXT, RTF (Max: 50MB)
        </Typography>
      </Paper>

      {/* Selected File */}
      {file && (
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
              Selected Document
            </Typography>
            <Button 
              onClick={clearFile} 
              size="small"
              variant="outlined"
              color="error"
            >
              Clear
            </Button>
          </Box>
          <Divider />
          <List sx={{ py: 0 }}>
            <ListItem 
              sx={{ 
                py: 1.5,
                px: 2
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Description color="primary" />
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
                label={getFileExtension(file.name)} 
                size="small" 
                color="primary"
                variant="outlined"
                sx={{ mr: 1, minWidth: 45 }} 
              />
            </ListItem>
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
              Document converted to PDF successfully!
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
          onClick={convertToPDF}
          disabled={!file || loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Transform />}
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
          {loading ? 'Converting...' : 'Convert to PDF'}
        </Button>
      </Box>
    </Box>
  );
};

export default DocToPDF; 