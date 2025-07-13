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
  PersonAdd,
  CallSplit,
  DeleteOutline,
  ContentCut,
  FolderOpen,
  Scanner,
  Compress,
  Build,
  TextFields,
  InsertPhoto,
  Article,
  Slideshow,
  TableChart,
  Code,
  RotateRight,
  FormatListNumbered,
  Crop,
  Edit,
  LockOpen,
  Lock,
  Draw,
  Visibility,
  CompareArrows
} from '@mui/icons-material';

import PDFMerger from './components/PDFMerger';
import DocToPDF from './components/DocToPDF';
import ImageToPDF from './components/ImageToPDF';
import ImageExtractor from './components/ImageExtractor';
import HomePage from './components/HomePage';

// Organize PDF
import SplitPDF from './components/SplitPDF';
import RemovePages from './components/RemovePages';
import ExtractPages from './components/ExtractPages';
import OrganizePDF from './components/OrganizePDF';
import ScanToPDF from './components/ScanToPDF';

// Optimize PDF
import CompressPDF from './components/CompressPDF';
import RepairPDF from './components/RepairPDF';
import OCRPDF from './components/OCRPDF';

// Convert to PDF
import JPGToPDF from './components/JPGToPDF';
import WordToPDF from './components/WordToPDF';
import PowerPointToPDF from './components/PowerPointToPDF';
import ExcelToPDF from './components/ExcelToPDF';
import HTMLToPDF from './components/HTMLToPDF';

// Convert from PDF
import PDFToJPG from './components/PDFToJPG';
import PDFToWord from './components/PDFToWord';
import PDFToPowerPoint from './components/PDFToPowerPoint';
import PDFToExcel from './components/PDFToExcel';
import PDFToPDFA from './components/PDFToPDFA';

// Edit PDF
import RotatePDF from './components/RotatePDF';
import AddPageNumbers from './components/AddPageNumbers';
import AddWatermark from './components/AddWatermark';
import CropPDF from './components/CropPDF';
import EditPDF from './components/EditPDF';

// PDF Security
import UnlockPDF from './components/UnlockPDF';
import ProtectPDF from './components/ProtectPDF';
import SignPDF from './components/SignPDF';
import RedactPDF from './components/RedactPDF';
import ComparePDF from './components/ComparePDF';

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

  const handleConvertPdfEnter = () => {
    setConvertPdfAnchor(true);
    setAllPdfToolsAnchor(null); // Close the other dropdown
  };

  const handleAllPdfToolsEnter = () => {
    setAllPdfToolsAnchor(true);
    setConvertPdfAnchor(null); // Close the other dropdown
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
              <Box
                sx={{ position: 'relative' }}
                onMouseEnter={handleConvertPdfEnter}
                onMouseLeave={handleMenuClose}
              >
                <Button
                  color="inherit"
                  endIcon={<ExpandMore />}
                  sx={{ textTransform: 'none' }}
                >
                  CONVERT PDF
                </Button>
                
                {/* Hover Mega Dropdown */}
                {Boolean(convertPdfAnchor) && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 1300,
                      width: '500px',
                      maxWidth: '95vw',
                      backgroundColor: 'white',
                      borderRadius: 2,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      p: 3,
                      // Add padding at the top to close the gap
                      pt: 2,
                      mt: 0.5,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderBottom: '8px solid white',
                      },
                      // Add invisible hover bridge to close the gap
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '-8px',
                        left: '0',
                        right: '0',
                        height: '8px',
                        backgroundColor: 'transparent',
                      }
                    }}
                    onMouseEnter={handleConvertPdfEnter}
                    onMouseLeave={handleMenuClose}
                  >
                    <Box sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(2, 1fr)', 
                      gap: 3, 
                      '@media (max-width: 600px)': { gridTemplateColumns: '1fr' },
                      '& .MuiButton-root': {
                        whiteSpace: 'nowrap'
                      }
                    }}>
                      
                      {/* Convert to PDF */}
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'warning.main' }}>
                          CONVERT TO PDF
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Button
                            onClick={() => { setTabValue(30); handleMenuClose(); }}
                            startIcon={<InsertPhoto sx={{ color: '#f57c00' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            JPG to PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(31); handleMenuClose(); }}
                            startIcon={<Article sx={{ color: '#f57c00' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            WORD to PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(32); handleMenuClose(); }}
                            startIcon={<Slideshow sx={{ color: '#f57c00' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            POWERPOINT to PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(33); handleMenuClose(); }}
                            startIcon={<TableChart sx={{ color: '#f57c00' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            EXCEL to PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(34); handleMenuClose(); }}
                            startIcon={<Code sx={{ color: '#f57c00' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            HTML to PDF
                          </Button>
                        </Box>
                      </Box>

                      {/* Convert from PDF */}
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'secondary.main' }}>
                          CONVERT FROM PDF
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Button
                            onClick={() => { setTabValue(40); handleMenuClose(); }}
                            startIcon={<InsertPhoto sx={{ color: '#dc004e' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            PDF to JPG
                          </Button>
                          <Button
                            onClick={() => { setTabValue(41); handleMenuClose(); }}
                            startIcon={<Article sx={{ color: '#dc004e' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            PDF to WORD
                          </Button>
                          <Button
                            onClick={() => { setTabValue(42); handleMenuClose(); }}
                            startIcon={<Slideshow sx={{ color: '#dc004e' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            PDF to POWERPOINT
                          </Button>
                          <Button
                            onClick={() => { setTabValue(43); handleMenuClose(); }}
                            startIcon={<TableChart sx={{ color: '#dc004e' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            PDF to EXCEL
                          </Button>
                          <Button
                            onClick={() => { setTabValue(44); handleMenuClose(); }}
                            startIcon={<PictureAsPdf sx={{ color: '#dc004e' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            PDF to PDF/A
                          </Button>
                        </Box>
                      </Box>

                    </Box>
                  </Box>
                )}
              </Box>

              {/* All PDF Tools Dropdown */}
              <Box
                sx={{ position: 'relative' }}
                onMouseEnter={handleAllPdfToolsEnter}
                onMouseLeave={handleMenuClose}
              >
                <Button
                  color="inherit"
                  endIcon={<ExpandMore />}
                  sx={{ textTransform: 'none' }}
                >
                  ALL PDF TOOLS
                </Button>
                
                {/* Hover Mega Dropdown */}
                {Boolean(allPdfToolsAnchor) && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 1300,
                      width: '800px',
                      maxWidth: '95vw',
                      backgroundColor: 'white',
                      borderRadius: 2,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      p: 3,
                      // Add padding at the top to close the gap
                      pt: 2,
                      mt: 0.5,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderBottom: '8px solid white',
                      },
                      // Add invisible hover bridge to close the gap
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '-8px',
                        left: '0',
                        right: '0',
                        height: '8px',
                        backgroundColor: 'transparent',
                      }
                    }}
                    onMouseEnter={handleAllPdfToolsEnter}
                    onMouseLeave={handleMenuClose}
                  >
                    <Box sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(4, 1fr)', 
                      gap: 2, 
                      '@media (max-width: 1000px)': { gridTemplateColumns: 'repeat(2, 1fr)' }, 
                      '@media (max-width: 600px)': { gridTemplateColumns: '1fr' },
                      '& .MuiButton-root': {
                        whiteSpace: 'nowrap'
                      }
                    }}>
                      
                      {/* Organize PDF */}
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                          ORGANIZE PDF
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Button
                            onClick={() => { setTabValue(0); handleMenuClose(); }}
                            startIcon={<MergeIcon sx={{ color: '#1976d2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Merge PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(1); handleMenuClose(); }}
                            startIcon={<CallSplit sx={{ color: '#1976d2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Split PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(10); handleMenuClose(); }}
                            startIcon={<DeleteOutline sx={{ color: '#1976d2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Remove pages
                          </Button>
                          <Button
                            onClick={() => { setTabValue(11); handleMenuClose(); }}
                            startIcon={<ContentCut sx={{ color: '#1976d2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Extract pages
                          </Button>
                          <Button
                            onClick={() => { setTabValue(12); handleMenuClose(); }}
                            startIcon={<FolderOpen sx={{ color: '#1976d2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Organize PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(13); handleMenuClose(); }}
                            startIcon={<Scanner sx={{ color: '#1976d2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Scan to PDF
                          </Button>
                        </Box>
                      </Box>

                      {/* Optimize PDF */}
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'success.main' }}>
                          OPTIMIZE PDF
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Button
                            onClick={() => { setTabValue(2); handleMenuClose(); }}
                            startIcon={<Compress sx={{ color: '#388e3c' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Compress PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(20); handleMenuClose(); }}
                            startIcon={<Build sx={{ color: '#388e3c' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Repair PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(21); handleMenuClose(); }}
                            startIcon={<TextFields sx={{ color: '#388e3c' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            OCR PDF
                          </Button>
                        </Box>
                      </Box>



                      {/* Edit PDF */}
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'purple' }}>
                          EDIT PDF
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Button
                            onClick={() => { setTabValue(50); handleMenuClose(); }}
                            startIcon={<RotateRight sx={{ color: '#7b1fa2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Rotate PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(51); handleMenuClose(); }}
                            startIcon={<FormatListNumbered sx={{ color: '#7b1fa2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Add page numbers
                          </Button>
                          <Button
                            onClick={() => { setTabValue(52); handleMenuClose(); }}
                            startIcon={<TextFields sx={{ color: '#7b1fa2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Add watermark
                          </Button>
                          <Button
                            onClick={() => { setTabValue(53); handleMenuClose(); }}
                            startIcon={<Crop sx={{ color: '#7b1fa2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Crop PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(54); handleMenuClose(); }}
                            startIcon={<Edit sx={{ color: '#7b1fa2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Edit PDF
                          </Button>
                        </Box>
                      </Box>

                      {/* PDF Security */}
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'info.main' }}>
                          PDF SECURITY
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Button
                            onClick={() => { setTabValue(60); handleMenuClose(); }}
                            startIcon={<LockOpen sx={{ color: '#1976d2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Unlock PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(61); handleMenuClose(); }}
                            startIcon={<Lock sx={{ color: '#1976d2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Protect PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(62); handleMenuClose(); }}
                            startIcon={<Draw sx={{ color: '#1976d2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Sign PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(63); handleMenuClose(); }}
                            startIcon={<Visibility sx={{ color: '#1976d2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Redact PDF
                          </Button>
                          <Button
                            onClick={() => { setTabValue(64); handleMenuClose(); }}
                            startIcon={<CompareArrows sx={{ color: '#1976d2' }} />}
                            sx={{ 
                              justifyContent: 'flex-start', 
                              textTransform: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: 'grey.100' }
                            }}
                          >
                            Compare PDF
                          </Button>
                        </Box>
                      </Box>

                    </Box>
                  </Box>
                )}
              </Box>
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
            
            {/* Core Navigation Tools */}
            {tabValue === 0 && (
              <Box sx={{ p: { xs: 2, sm: 3 }, minHeight: '400px' }}>
                <PDFMerger />
              </Box>
            )}
            
            {tabValue === 1 && (
              <SplitPDF onBackClick={handleHomeClick} />
            )}
            
            {tabValue === 2 && (
              <CompressPDF onBackClick={handleHomeClick} />
            )}
            
            {tabValue === 3 && (
              <Box sx={{ p: { xs: 2, sm: 3 }, minHeight: '400px' }}>
                <DocToPDF />
              </Box>
            )}
            
            {tabValue === 4 && (
              <Box sx={{ p: { xs: 2, sm: 3 }, minHeight: '400px' }}>
                <ImageToPDF />
              </Box>
            )}
            
            {tabValue === 5 && (
              <Box sx={{ p: { xs: 2, sm: 3 }, minHeight: '400px' }}>
                <ImageExtractor />
              </Box>
            )}

            {/* Organize PDF Tools */}
            {tabValue === 10 && <RemovePages onBackClick={handleHomeClick} />}
            {tabValue === 11 && <ExtractPages onBackClick={handleHomeClick} />}
            {tabValue === 12 && <OrganizePDF onBackClick={handleHomeClick} />}
            {tabValue === 13 && <ScanToPDF onBackClick={handleHomeClick} />}

            {/* Optimize PDF Tools */}
            {tabValue === 20 && <RepairPDF onBackClick={handleHomeClick} />}
            {tabValue === 21 && <OCRPDF onBackClick={handleHomeClick} />}

            {/* Convert to PDF Tools */}
            {tabValue === 30 && <JPGToPDF onBackClick={handleHomeClick} />}
            {tabValue === 31 && <WordToPDF onBackClick={handleHomeClick} />}
            {tabValue === 32 && <PowerPointToPDF onBackClick={handleHomeClick} />}
            {tabValue === 33 && <ExcelToPDF onBackClick={handleHomeClick} />}
            {tabValue === 34 && <HTMLToPDF onBackClick={handleHomeClick} />}

            {/* Convert from PDF Tools */}
            {tabValue === 40 && <PDFToJPG onBackClick={handleHomeClick} />}
            {tabValue === 41 && <PDFToWord onBackClick={handleHomeClick} />}
            {tabValue === 42 && <PDFToPowerPoint onBackClick={handleHomeClick} />}
            {tabValue === 43 && <PDFToExcel onBackClick={handleHomeClick} />}
            {tabValue === 44 && <PDFToPDFA onBackClick={handleHomeClick} />}

            {/* Edit PDF Tools */}
            {tabValue === 50 && <RotatePDF onBackClick={handleHomeClick} />}
            {tabValue === 51 && <AddPageNumbers onBackClick={handleHomeClick} />}
            {tabValue === 52 && <AddWatermark onBackClick={handleHomeClick} />}
            {tabValue === 53 && <CropPDF onBackClick={handleHomeClick} />}
            {tabValue === 54 && <EditPDF onBackClick={handleHomeClick} />}

            {/* PDF Security Tools */}
            {tabValue === 60 && <UnlockPDF onBackClick={handleHomeClick} />}
            {tabValue === 61 && <ProtectPDF onBackClick={handleHomeClick} />}
            {tabValue === 62 && <SignPDF onBackClick={handleHomeClick} />}
            {tabValue === 63 && <RedactPDF onBackClick={handleHomeClick} />}
            {tabValue === 64 && <ComparePDF onBackClick={handleHomeClick} />}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
