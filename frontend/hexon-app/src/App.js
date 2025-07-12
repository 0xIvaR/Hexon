import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
  IconButton,
  InputBase,
  Divider
} from '@mui/material';
import {
  PictureAsPdf,
  Merge as MergeIcon,
  Image as ImageIcon,
  PhotoLibrary as ExtractIcon,
  Description as DescriptionIcon,
  ExpandMore,
  Search as SearchIcon,
  DarkMode,
  LightMode,
  Login,
  PersonAdd
} from '@mui/icons-material';

import PDFMerger from './components/PDFMerger';
import DocToPDF from './components/DocToPDF';
import ImageToPDF from './components/ImageToPDF';
import ImageExtractor from './components/ImageExtractor';
import HomePage from './components/HomePage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '16px',
          paddingRight: '16px',
          '@media (max-width: 600px)': {
            paddingLeft: '8px',
            paddingRight: '8px',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            minWidth: 'auto',
            '@media (max-width: 768px)': {
              fontSize: '0.75rem',
              padding: '6px 8px',
            },
          },
        },
      },
    },
  },
  });

function App() {
  const [tabValue, setTabValue] = useState(-1); // -1 for home page
  const [darkMode, setDarkMode] = useState(false);
  const [convertPdfAnchor, setConvertPdfAnchor] = useState(null);
  const [allPdfToolsAnchor, setAllPdfToolsAnchor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Update theme based on dark mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
      },
    },
    typography: {
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '16px',
            paddingRight: '16px',
            '@media (max-width: 600px)': {
              paddingLeft: '8px',
              paddingRight: '8px',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            '& .MuiTab-root': {
              minWidth: 'auto',
              '@media (max-width: 768px)': {
                fontSize: '0.75rem',
                padding: '6px 8px',
              },
            },
          },
        },
      },
    },
  });

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleConvertPdfClick = (event) => {
    setConvertPdfAnchor(event.currentTarget);
  };

  const handleAllPdfToolsClick = (event) => {
    setAllPdfToolsAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setConvertPdfAnchor(null);
    setAllPdfToolsAnchor(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLogin = () => {
    // Placeholder for login functionality
    console.log('Login clicked');
  };

  const handleSignup = () => {
    // Placeholder for signup functionality
    console.log('Signup clicked');
  };

  const handleHomeClick = () => {
    setTabValue(-1);
    handleMenuClose();
  };

  const handleToolSelect = (toolId) => {
    setTabValue(toolId);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        flexGrow: 1, 
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}>
        <AppBar position="sticky" elevation={2}>
          <Toolbar sx={{ py: 1 }}>
            <PictureAsPdf sx={{ mr: 2, fontSize: { xs: '1.5rem', sm: '2rem' } }} />
            <Typography 
              variant="h6" 
              component="div" 
              onClick={handleHomeClick}
              sx={{ 
                fontSize: { xs: '1rem', sm: '1.25rem' },
                fontWeight: 600,
                mr: 2,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              HEXON
            </Typography>

            {/* Navigation Menu Items */}
            <Box sx={{ display: 'flex', gap: 2, mr: 'auto' }}>
              <Button
                color="inherit"
                onClick={() => setTabValue(0)}
                sx={{ textTransform: 'none' }}
              >
                MERGE PDF
              </Button>
              <Button
                color="inherit"
                onClick={() => setTabValue(1)}
                sx={{ textTransform: 'none' }}
              >
                SPLIT PDF
              </Button>
              <Button
                color="inherit"
                onClick={() => setTabValue(2)}
                sx={{ textTransform: 'none' }}
              >
                COMPRESS PDF
              </Button>
              
              {/* Convert PDF Dropdown */}
              <Button
                color="inherit"
                onClick={handleConvertPdfClick}
                endIcon={<ExpandMore />}
                sx={{ textTransform: 'none' }}
              >
                CONVERT PDF
              </Button>
              <Menu
                anchorEl={convertPdfAnchor}
                open={Boolean(convertPdfAnchor)}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'convert-pdf-button',
                }}
              >
                <MenuItem onClick={() => { setTabValue(3); handleMenuClose(); }}>
                  <DescriptionIcon sx={{ mr: 1 }} />
                  Doc to PDF
                </MenuItem>
                <MenuItem onClick={() => { setTabValue(4); handleMenuClose(); }}>
                  <ImageIcon sx={{ mr: 1 }} />
                  Image to PDF
                </MenuItem>
              </Menu>

              {/* All PDF Tools Dropdown */}
              <Button
                color="inherit"
                onClick={handleAllPdfToolsClick}
                endIcon={<ExpandMore />}
                sx={{ textTransform: 'none' }}
              >
                ALL PDF TOOLS
              </Button>
              <Menu
                anchorEl={allPdfToolsAnchor}
                open={Boolean(allPdfToolsAnchor)}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'all-pdf-tools-button',
                }}
              >
                <MenuItem onClick={() => { setTabValue(0); handleMenuClose(); }}>
                  <MergeIcon sx={{ mr: 1 }} />
                  PDF Merger
                </MenuItem>
                <MenuItem onClick={() => { setTabValue(1); handleMenuClose(); }}>
                  <PictureAsPdf sx={{ mr: 1 }} />
                  Split PDF
                </MenuItem>
                <MenuItem onClick={() => { setTabValue(2); handleMenuClose(); }}>
                  <PictureAsPdf sx={{ mr: 1 }} />
                  Compress PDF
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { setTabValue(3); handleMenuClose(); }}>
                  <DescriptionIcon sx={{ mr: 1 }} />
                  Doc to PDF
                </MenuItem>
                <MenuItem onClick={() => { setTabValue(4); handleMenuClose(); }}>
                  <ImageIcon sx={{ mr: 1 }} />
                  Image to PDF
                </MenuItem>
                <MenuItem onClick={() => { setTabValue(5); handleMenuClose(); }}>
                  <ExtractIcon sx={{ mr: 1 }} />
                  Image Extractor
                </MenuItem>
              </Menu>
            </Box>

            {/* Right side controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Search */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: 1,
                px: 1,
                mr: 1
              }}>
                <SearchIcon sx={{ color: 'inherit', mr: 1 }} />
                <InputBase
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{ 
                    color: 'inherit',
                    '& .MuiInputBase-input': {
                      padding: '4px 0',
                      width: '120px',
                      fontSize: '0.875rem'
                    }
                  }}
                />
              </Box>

              {/* Dark Mode Toggle */}
              <IconButton
                color="inherit"
                onClick={handleDarkModeToggle}
                sx={{ mr: 1 }}
              >
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>

              {/* Login Button */}
              <Button
                color="inherit"
                onClick={handleLogin}
                startIcon={<Login />}
                sx={{ 
                  textTransform: 'none',
                  mr: 1,
                  display: { xs: 'none', sm: 'flex' }
                }}
              >
                Login
              </Button>

              {/* Signup Button */}
              <Button
                color="secondary"
                variant="contained"
                onClick={handleSignup}
                startIcon={<PersonAdd />}
                sx={{ 
                  textTransform: 'none',
                  display: { xs: 'none', sm: 'flex' }
                }}
              >
                Sign up
              </Button>

              {/* Mobile Login/Signup */}
              <Box sx={{ display: { xs: 'flex', sm: 'none' }, gap: 0.5 }}>
                <IconButton color="inherit" onClick={handleLogin}>
                  <Login />
                </IconButton>
                <IconButton color="secondary" onClick={handleSignup}>
                  <PersonAdd />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        
        <Container 
          maxWidth="lg" 
          sx={{ 
            mt: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 2, sm: 3, md: 4 },
            px: { xs: 1, sm: 2 }
          }}
        >
          <Paper 
            elevation={3}
            sx={{
              overflow: 'hidden',
              borderRadius: 2
            }}
          >

            
            {tabValue === -1 && (
              <HomePage onToolSelect={handleToolSelect} />
            )}
            
            {tabValue === 0 && (
              <Box sx={{ 
                p: { xs: 2, sm: 3 },
                minHeight: '400px'
              }}>
                <PDFMerger />
              </Box>
            )}
            
            {tabValue === 1 && (
              <Box sx={{ 
                p: { xs: 2, sm: 3 },
                minHeight: '400px',
                textAlign: 'center'
              }}>
                <Typography variant="h6" color="text.secondary">
                  Split PDF functionality coming soon...
                </Typography>
              </Box>
            )}
            
            {tabValue === 2 && (
              <Box sx={{ 
                p: { xs: 2, sm: 3 },
                minHeight: '400px',
                textAlign: 'center'
              }}>
                <Typography variant="h6" color="text.secondary">
                  Compress PDF functionality coming soon...
                </Typography>
              </Box>
            )}
            
            {tabValue === 3 && (
              <Box sx={{ 
                p: { xs: 2, sm: 3 },
                minHeight: '400px'
              }}>
                <DocToPDF />
              </Box>
            )}
            
            {tabValue === 4 && (
              <Box sx={{ 
                p: { xs: 2, sm: 3 },
                minHeight: '400px'
              }}>
                <ImageToPDF />
              </Box>
            )}
            
            {tabValue === 5 && (
              <Box sx={{ 
                p: { xs: 2, sm: 3 },
                minHeight: '400px'
              }}>
                <ImageExtractor />
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
