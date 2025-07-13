import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  LinearProgress,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Card,
  CardContent,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  CloudUpload,
  Download,
  Compress,
  PictureAsPdf,
  CheckCircle,
  Info
} from '@mui/icons-material';

const CompressPDF = ({ onBackClick }) => {
  const [file, setFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
      setResult(null);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCompressionDescription = (level) => {
    switch (level) {
      case 'low':
        return 'Minimal compression, best quality, larger file size';
      case 'medium':
        return 'Balanced compression, good quality, moderate reduction';
      case 'high':
        return 'Maximum compression, smaller file size, may affect quality';
      default:
        return '';
    }
  };

  const getCompressionColor = (level) => {
    switch (level) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'primary';
    }
  };

  const handleCompress = async () => {
    if (!file) {
      setError('Please select a PDF file first');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('compressionLevel', compressionLevel);

    try {
      const response = await fetch('http://localhost:5000/compress-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to compress PDF');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Error compressing PDF');
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (path, filename) => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000${path}`;
    link.download = filename;
    link.click();
  };

  return (
    <Box sx={{ p: 3, maxWidth: '800px', mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Compress sx={{ fontSize: '2rem', color: 'primary.main' }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Compress PDF
        </Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Reduce the file size of your PDF documents while maintaining quality. Choose your preferred compression level.
      </Typography>

      {/* File Upload Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Upload PDF File
        </Typography>
        
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'border-color 0.3s',
            '&:hover': {
              borderColor: 'primary.main',
            },
          }}
          onClick={() => document.getElementById('file-input').click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <CloudUpload sx={{ fontSize: '3rem', color: 'text.secondary', mb: 1 }} />
          <Typography variant="body1" color="text.secondary">
            {file ? file.name : 'Click to select PDF file or drag and drop'}
          </Typography>
          {file && (
            <Chip
              label={formatFileSize(file.size)}
              color="primary"
              variant="outlined"
              sx={{ mt: 1 }}
            />
          )}
        </Box>
      </Paper>

      {/* Compression Options */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Compression Level
        </Typography>
        
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <RadioGroup
            value={compressionLevel}
            onChange={(e) => setCompressionLevel(e.target.value)}
          >
            <FormControlLabel
              value="low"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Low Compression
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Minimal compression, best quality, larger file size
                  </Typography>
                </Box>
              }
              sx={{ mb: 2, alignItems: 'flex-start' }}
            />
            <FormControlLabel
              value="medium"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Medium Compression (Recommended)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Balanced compression, good quality, moderate reduction
                  </Typography>
                </Box>
              }
              sx={{ mb: 2, alignItems: 'flex-start' }}
            />
            <FormControlLabel
              value="high"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    High Compression
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Maximum compression, smaller file size, may affect quality
                  </Typography>
                </Box>
              }
              sx={{ alignItems: 'flex-start' }}
            />
          </RadioGroup>
        </FormControl>

        <Box sx={{ mt: 2, p: 2, backgroundColor: 'info.light', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Info sx={{ color: 'info.main', fontSize: '1.2rem' }} />
            <Typography variant="body2" color="info.main">
              <strong>Selected:</strong> {getCompressionDescription(compressionLevel)}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleCompress}
          disabled={!file || loading}
          startIcon={loading ? <CircularProgress size={20} /> : <Compress />}
          size="large"
        >
          {loading ? 'Compressing...' : 'Compress PDF'}
        </Button>
        
        <Button
          variant="outlined"
          onClick={onBackClick}
          size="large"
        >
          Back to Home
        </Button>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ mb: 3 }}>
          <LinearProgress />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Compressing your PDF... This may take a moment.
          </Typography>
        </Box>
      )}

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Results */}
      {result && (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <CheckCircle sx={{ color: 'success.main', fontSize: '2rem' }} />
            <Typography variant="h6">
              Compression Complete!
            </Typography>
          </Box>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PictureAsPdf sx={{ color: 'error.main', mr: 2 }} />
                <Typography variant="h6">
                  Compressed PDF
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Original Size
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatFileSize(result.originalSize)}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Compressed Size
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatFileSize(result.compressedSize)}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Size Reduction
                  </Typography>
                  <Chip
                    label={`${result.compressionRatio}%`}
                    color={getCompressionColor(result.compressionLevel)}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Compression Level
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
                    {result.compressionLevel}
                  </Typography>
                </Box>
              </Box>
              
              <Button
                variant="contained"
                onClick={() => downloadFile(result.path, 'compressed.pdf')}
                startIcon={<Download />}
                fullWidth
                size="large"
              >
                Download Compressed PDF
              </Button>
            </CardContent>
          </Card>

          <Alert severity="success">
            Your PDF has been successfully compressed! File size reduced by {result.compressionRatio}%.
          </Alert>
        </Paper>
      )}
    </Box>
  );
};

export default CompressPDF; 