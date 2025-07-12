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
  Grid,
  Card,
  CardMedia,
  Stack,
  Divider
} from '@mui/material';
import {
  CloudUpload,
  Image,
  Delete,
  Download,
  Transform,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import axios from 'axios';

const ImageToPDF = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB per image
  const maxTotalFiles = 20; // Maximum 20 images

  const validateFiles = (selectedFiles) => {
    const validFiles = [];
    const errors = [];

    for (let file of selectedFiles) {
      // Check file type
      if (!acceptedTypes.includes(file.type)) {
        errors.push(`${file.name}: Unsupported file type. Only JPG, JPEG, and PNG are allowed.`);
        continue;
      }

      // Check file size
      if (file.size > maxFileSize) {
        errors.push(`${file.name}: File size too large. Maximum 10MB per image.`);
        continue;
      }

      validFiles.push(file);
    }

    // Check total number of files
    if (files.length + validFiles.length > maxTotalFiles) {
      errors.push(`Too many files. Maximum ${maxTotalFiles} images allowed.`);
      return { validFiles: [], errors };
    }

    return { validFiles, errors };
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const { validFiles, errors } = validateFiles(selectedFiles);
    
    if (errors.length > 0) {
      setError(errors.join(' '));
      return;
    }

    // Create preview URLs
    const filesWithPreview = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));
    
    setFiles(prevFiles => [...prevFiles, ...filesWithPreview]);
    setError('');
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set drag over to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
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
    const { validFiles, errors } = validateFiles(droppedFiles);
    
    if (errors.length > 0) {
      setError(errors.join(' '));
      return;
    }

    // Create preview URLs
    const filesWithPreview = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));
    
    setFiles(prevFiles => [...prevFiles, ...filesWithPreview]);
    setError('');
  };

  const removeFile = (id) => {
    setFiles(prevFiles => {
      const updatedFiles = prevFiles.filter(item => item.id !== id);
      // Clean up preview URL
      const fileToRemove = prevFiles.find(item => item.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updatedFiles;
    });
  };

  const moveFile = (id, direction) => {
    setFiles(prevFiles => {
      const index = prevFiles.findIndex(item => item.id === id);
      if ((direction === 'up' && index === 0) || (direction === 'down' && index === prevFiles.length - 1)) {
        return prevFiles;
      }
      
      const newFiles = [...prevFiles];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      return newFiles;
    });
  };

  const convertToPDF = async () => {
    if (files.length === 0) {
      setError('Please select at least one image file');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      files.forEach(item => {
        formData.append('images', item.file);
      });

      const response = await axios.post('http://localhost:5000/image-to-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data.path);
    } catch (err) {
      setError('Error converting images to PDF. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    // Clean up all preview URLs
    files.forEach(item => {
      URL.revokeObjectURL(item.preview);
    });
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
          Image to PDF Converter
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
          Convert JPG, JPEG, and PNG images to a single PDF document
        </Typography>
      </Box>

      {/* Upload Area */}
      <Paper
        sx={{
          p: { xs: 4, sm: 6, md: 8 },
          mb: 3,
          border: '2px dashed',
          borderColor: isDragOver ? 'primary.main' : (files.length > 0 ? 'primary.main' : '#ccc'),
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          backgroundColor: isDragOver ? 'rgba(25, 118, 210, 0.08)' : (files.length > 0 ? 'rgba(25, 118, 210, 0.04)' : 'transparent'),
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
          multiple
          accept="image/jpeg,image/jpg,image/png"
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
              color: isDragOver || files.length > 0 ? 'primary.main' : 'text.secondary',
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
          {isDragOver ? 'Drop images here' : 'Drop images here or click to browse'}
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
          Supported formats: JPG, JPEG, PNG (Max: {maxTotalFiles} images, 10MB each)
        </Typography>
      </Paper>

      {/* Selected Images */}
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
              Selected Images ({files.length})
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
          
          <Grid container spacing={2} sx={{ p: 2 }}>
            {files.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.preview}
                    alt={item.file.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Box sx={{ p: 1 }}>
                    <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
                      {item.file.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {(item.file.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Chip 
                        label={`#${index + 1}`} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                      <Box>
                        <IconButton 
                          size="small" 
                          onClick={() => moveFile(item.id, 'up')}
                          disabled={index === 0}
                        >
                          <ArrowUpward />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => moveFile(item.id, 'down')}
                          disabled={index === files.length - 1}
                        >
                          <ArrowDownward />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => removeFile(item.id)} 
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
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
              Images converted to PDF successfully!
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
          disabled={files.length === 0 || loading}
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

export default ImageToPDF; 