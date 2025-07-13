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
  TextField,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider
} from '@mui/material';
import {
  CloudUpload,
  Download,
  Delete,
  Add,
  Remove,
  PictureAsPdf,
  SplitscreenOutlined,
  GetApp
} from '@mui/icons-material';

const SplitPDF = ({ onBackClick }) => {
  const [file, setFile] = useState(null);
  const [splitType, setSplitType] = useState('single');
  const [pageRanges, setPageRanges] = useState([{ start: 1, end: 1 }]);
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
      setResults([]);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const addPageRange = () => {
    setPageRanges([...pageRanges, { start: 1, end: 1 }]);
  };

  const removePageRange = (index) => {
    if (pageRanges.length > 1) {
      setPageRanges(pageRanges.filter((_, i) => i !== index));
    }
  };

  const updatePageRange = (index, field, value) => {
    const newRanges = [...pageRanges];
    newRanges[index][field] = parseInt(value) || 1;
    setPageRanges(newRanges);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSplit = async () => {
    if (!file) {
      setError('Please select a PDF file first');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('splitType', splitType);
    
    if (splitType === 'range') {
      formData.append('pageRanges', JSON.stringify(pageRanges));
    } else if (splitType === 'extract') {
      formData.append('startPage', startPage);
      formData.append('endPage', endPage);
    }

    try {
      const response = await fetch('http://localhost:5000/split-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to split PDF');
      }

      const data = await response.json();
      setResults(data.results);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || 'Error splitting PDF');
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

  const downloadAll = () => {
    results.forEach((result, index) => {
      setTimeout(() => {
        downloadFile(result.path, result.name + '.pdf');
      }, index * 500); // Stagger downloads
    });
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1000px', mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <SplitscreenOutlined sx={{ fontSize: '2rem', color: 'primary.main' }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Split PDF
        </Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Split your PDF documents into multiple files. Choose from different splitting options below.
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

      {/* Split Options */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Split Options
        </Typography>
        
        <FormControl component="fieldset">
          <RadioGroup
            value={splitType}
            onChange={(e) => setSplitType(e.target.value)}
          >
            <FormControlLabel
              value="single"
              control={<Radio />}
              label="Split into individual pages"
            />
            <FormControlLabel
              value="extract"
              control={<Radio />}
              label="Extract specific page range"
            />
            <FormControlLabel
              value="range"
              control={<Radio />}
              label="Split by custom page ranges"
            />
          </RadioGroup>
        </FormControl>

        {splitType === 'extract' && (
          <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              label="Start Page"
              type="number"
              value={startPage}
              onChange={(e) => setStartPage(e.target.value)}
              inputProps={{ min: 1 }}
              size="small"
            />
            <Typography>to</Typography>
            <TextField
              label="End Page"
              type="number"
              value={endPage}
              onChange={(e) => setEndPage(e.target.value)}
              inputProps={{ min: 1 }}
              size="small"
            />
          </Box>
        )}

        {splitType === 'range' && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Define custom page ranges to split your PDF:
            </Typography>
            {pageRanges.map((range, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                <TextField
                  label="Start"
                  type="number"
                  value={range.start}
                  onChange={(e) => updatePageRange(index, 'start', e.target.value)}
                  inputProps={{ min: 1 }}
                  size="small"
                />
                <Typography>to</Typography>
                <TextField
                  label="End"
                  type="number"
                  value={range.end}
                  onChange={(e) => updatePageRange(index, 'end', e.target.value)}
                  inputProps={{ min: 1 }}
                  size="small"
                />
                <IconButton
                  onClick={() => removePageRange(index)}
                  disabled={pageRanges.length === 1}
                  color="error"
                >
                  <Remove />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<Add />}
              onClick={addPageRange}
              variant="outlined"
              size="small"
            >
              Add Range
            </Button>
          </Box>
        )}
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleSplit}
          disabled={!file || loading}
          startIcon={<SplitscreenOutlined />}
          size="large"
        >
          {loading ? 'Splitting...' : 'Split PDF'}
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
            Processing your PDF...
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
      {results.length > 0 && (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Split Results ({results.length} files)
            </Typography>
            <Button
              variant="contained"
              onClick={downloadAll}
              startIcon={<GetApp />}
              size="small"
            >
              Download All
            </Button>
          </Box>
          
          {totalPages > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Original PDF had {totalPages} pages
            </Typography>
          )}
          
          <Grid container spacing={2}>
            {results.map((result, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PictureAsPdf sx={{ color: 'error.main', mr: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {result.name}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {result.pages} page{result.pages > 1 ? 's' : ''}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Download />}
                        onClick={() => downloadFile(result.path, result.name)}
                        fullWidth
                      >
                        Download
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default SplitPDF; 