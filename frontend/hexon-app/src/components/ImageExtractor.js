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
  Grid,
  Card,
  CardMedia,
  CardActions,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Divider
} from '@mui/material';
import {
  CloudUpload,
  PictureAsPdf,
  Download,
  PhotoLibrary,
  GetApp
} from '@mui/icons-material';
import axios from 'axios';

const ImageExtractor = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedImages, setExtractedImages] = useState([]);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const maxFileSize = 50 * 1024 * 1024; // 50MB limit for PDF files

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;
    
    // Check file type
    if (selectedFile.type !== 'application/pdf') {
      return false;
    }
    
    // Check file size
    if (selectedFile.size > maxFileSize) {
      setError('PDF file size must be less than 50MB');
      return false;
    }
    
    return true;
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setError('');
      setExtractedImages([]);
    } else {
      setError('Please select a valid PDF file (max 50MB)');
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
        setExtractedImages([]);
      } else {
        setError('Please drop a valid PDF file (max 50MB)');
      }
    }
  };

  const extractImages = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');
    setExtractedImages([]);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/extract-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setExtractedImages(response.data.images);
    } catch (err) {
      setError('Error extracting images from PDF. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setExtractedImages([]);
    setError('');
  };

  const downloadImage = (imagePath) => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000${imagePath}`;
    link.download = imagePath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllImages = () => {
    extractedImages.forEach((imagePath, index) => {
      setTimeout(() => {
        downloadImage(imagePath);
      }, index * 100); // Small delay between downloads
    });
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
          Image Extractor
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
          Extract all images from PDF documents as PNG files
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
          {isDragOver ? 'Drop PDF file here' : 'Drop PDF file here or click to browse'}
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
          Upload a PDF to extract all images (Max: 50MB)
        </Typography>
      </Paper>

      {/* Selected PDF */}
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
              Selected PDF
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
                label="PDF" 
                size="small" 
                color="error"
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

      {/* Extracted Images */}
      {extractedImages.length > 0 && (
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
              Extracted Images ({extractedImages.length})
            </Typography>
            <Button 
              onClick={downloadAllImages} 
              startIcon={<GetApp />}
              variant="outlined"
              size="small"
            >
              Download All
            </Button>
          </Box>
          <Divider />
          
          <Box sx={{ p: 2 }}>
            <ImageList cols={3} gap={8}>
              {extractedImages.map((imagePath, index) => (
                <ImageListItem key={index}>
                  <img
                    src={`http://localhost:5000${imagePath}`}
                    alt={`Extracted image ${index + 1}`}
                    loading="lazy"
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                  <ImageListItemBar
                    title={`Image ${index + 1}`}
                    subtitle={imagePath.split('/').pop()}
                    actionIcon={
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => downloadImage(imagePath)}
                        sx={{ color: 'white' }}
                      >
                        <Download />
                      </Button>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Paper>
      )}

      {/* Action Button */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        mt: 4
      }}>
        <Button
          variant="contained"
          onClick={extractImages}
          disabled={!file || loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PhotoLibrary />}
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
          {loading ? 'Extracting...' : 'Extract Images'}
        </Button>
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Processing PDF and extracting images...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ImageExtractor; 