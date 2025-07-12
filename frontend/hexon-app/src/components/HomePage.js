import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Container,
  Paper,
  Stack
} from '@mui/material';
import {
  Merge as MergeIcon,
  PictureAsPdf as SplitIcon,
  Compress as CompressIcon,
  Description as DocToPdfIcon,
  Image as ImageToPdfIcon,
  PhotoLibrary as ExtractIcon
} from '@mui/icons-material';

const HomePage = ({ onToolSelect }) => {
  const tools = [
    {
      id: 0,
      title: 'Merge PDF',
      description: 'Combine multiple PDF files into one document',
      icon: <MergeIcon sx={{ fontSize: 48, color: '#1976d2' }} />,
      color: '#e3f2fd'
    },
    {
      id: 1,
      title: 'Split PDF',
      description: 'Divide a PDF into multiple separate files',
      icon: <SplitIcon sx={{ fontSize: 48, color: '#388e3c' }} />,
      color: '#e8f5e8'
    },
    {
      id: 2,
      title: 'Compress PDF',
      description: 'Reduce PDF file size without losing quality',
      icon: <CompressIcon sx={{ fontSize: 48, color: '#f57c00' }} />,
      color: '#fff3e0'
    },
    {
      id: 3,
      title: 'Doc to PDF',
      description: 'Convert Word documents to PDF format',
      icon: <DocToPdfIcon sx={{ fontSize: 48, color: '#7b1fa2' }} />,
      color: '#f3e5f5'
    },
    {
      id: 4,
      title: 'Image to PDF',
      description: 'Convert images to PDF documents',
      icon: <ImageToPdfIcon sx={{ fontSize: 48, color: '#d32f2f' }} />,
      color: '#ffebee'
    }
  ];

  const handleToolClick = (toolId) => {
    if (onToolSelect) {
      onToolSelect(toolId);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Your All-in-One PDF Solution
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            maxWidth: '800px',
            mx: 'auto',
            fontSize: { xs: '1rem', sm: '1.25rem' },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '@media (max-width: 600px)': {
              whiteSpace: 'normal',
              fontSize: '0.9rem'
            }
          }}
        >
          Transform, merge, split, and optimize your PDF documents with ease
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {tools.map((tool) => (
          <Grid item xs={12} sm={6} md={4} key={tool.id}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6
                },
                border: '1px solid',
                borderColor: 'grey.200'
              }}
            >
              <CardActionArea
                onClick={() => handleToolClick(tool.id)}
                sx={{ height: '100%', p: 2 }}
              >
                <CardContent sx={{ textAlign: 'center', height: '100%' }}>
                  <Box
                    sx={{
                      backgroundColor: tool.color,
                      borderRadius: '50%',
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    {tool.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: 'text.primary'
                    }}
                  >
                    {tool.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6
                    }}
                  >
                    {tool.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Paper
          elevation={1}
          sx={{
            p: 3,
            backgroundColor: 'grey.50',
            borderRadius: 2
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: 'primary.main'
            }}
          >
            Why Choose HEXON?
          </Typography>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                🚀 Fast Processing
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lightning-fast PDF operations
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                🔒 Secure & Private
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Your files are processed securely
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                💯 High Quality
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Maintain original document quality
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage; 