const express = require('express');
const multer = require('multer');
const cors = require('cors');
// const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const PDFMerger = require('pdf-merger-js');
const util = require('util');
const libreConvert = require('libreoffice-convert').convert;
const convertAsync = util.promisify(libreConvert);
const { PDFDocument } = require('pdf-lib');
// const { pdf } = require('pdf-to-img'); // Removed due to ES module issues
const puppeteer = require('puppeteer');
const xlsx = require('xlsx');
const mammoth = require('mammoth');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'public')));

const upload = multer({ dest: uploadDir });

// Connect to MongoDB (commented out for testing)
// mongoose.connect('mongodb://localhost:27017/pdftools', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log('MongoDB connection error:', err));

// ProcessedFile Schema (commented out for testing)
// const processedFileSchema = new mongoose.Schema({
//   fileName: String,
//   operationType: String,
//   processedAt: { type: Date, default: Date.now },
//   filePath: String
// });

// const ProcessedFile = mongoose.model('ProcessedFile', processedFileSchema);

app.get('/', (req, res) => {
  res.send('HEXON Backend server running successfully!');
});

// PowerPoint to PDF endpoint
app.post('/powerpoint-to-pdf', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    
    try {
      // Convert PowerPoint to PDF using LibreOffice
      const pdfBuffer = await convertAsync(fileBuffer, '.pdf', undefined);
      
      const uniqueName = `powerpoint_${Date.now()}.pdf`;
      const outputPath = path.join(uploadDir, uniqueName);
      fs.writeFileSync(outputPath, pdfBuffer);
      
      // Clean up original file
      fs.unlinkSync(filePath);
      
      res.json({ 
        success: true,
        path: `/uploads/${uniqueName}`,
        message: 'PowerPoint converted to PDF successfully!'
      });
    } catch (conversionError) {
      // Clean up original file
      fs.unlinkSync(filePath);
      
      // Check if it's a LibreOffice availability issue
      if (conversionError.message.includes('libreoffice') || 
          conversionError.message.includes('soffice') ||
          conversionError.code === 'ENOENT') {
        res.status(500).json({ 
          error: 'LibreOffice is required for PowerPoint to PDF conversion. Please install LibreOffice and try again.',
          details: 'LibreOffice is not installed on this system. Please install it from https://www.libreoffice.org/download/',
          installInstructions: {
            windows: 'Download and install LibreOffice from https://www.libreoffice.org/download/',
            mac: 'Install using: brew install --cask libreoffice',
            linux: 'Install using: sudo apt-get install libreoffice (Ubuntu/Debian) or sudo yum install libreoffice (CentOS/RHEL)'
          }
        });
      } else {
        res.status(500).json({ 
          error: 'Error converting PowerPoint to PDF', 
          details: conversionError.message 
        });
      }
    }
  } catch (err) {
    console.error('PowerPoint to PDF conversion error:', err);
    res.status(500).json({ 
      error: 'Error processing PowerPoint file', 
      details: err.message 
    });
  }
});

// Excel to PDF endpoint
app.post('/excel-to-pdf', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    
    try {
      // Convert Excel to PDF using LibreOffice
      const pdfBuffer = await convertAsync(fileBuffer, '.pdf', undefined);
      
      const uniqueName = `excel_${Date.now()}.pdf`;
      const outputPath = path.join(uploadDir, uniqueName);
      fs.writeFileSync(outputPath, pdfBuffer);
      
      // Clean up original file
      fs.unlinkSync(filePath);
      
      res.json({ 
        success: true,
        path: `/uploads/${uniqueName}`,
        message: 'Excel converted to PDF successfully!'
      });
    } catch (conversionError) {
      // Clean up original file
      fs.unlinkSync(filePath);
      
      // Check if it's a LibreOffice availability issue
      if (conversionError.message.includes('libreoffice') || 
          conversionError.message.includes('soffice') ||
          conversionError.code === 'ENOENT') {
        res.status(500).json({ 
          error: 'LibreOffice is required for Excel to PDF conversion. Please install LibreOffice and try again.',
          details: 'LibreOffice is not installed on this system. Please install it from https://www.libreoffice.org/download/',
          installInstructions: {
            windows: 'Download and install LibreOffice from https://www.libreoffice.org/download/',
            mac: 'Install using: brew install --cask libreoffice',
            linux: 'Install using: sudo apt-get install libreoffice (Ubuntu/Debian) or sudo yum install libreoffice (CentOS/RHEL)'
          }
        });
      } else {
        res.status(500).json({ 
          error: 'Error converting Excel to PDF', 
          details: conversionError.message 
        });
      }
    }
  } catch (err) {
    console.error('Excel to PDF conversion error:', err);
    res.status(500).json({ 
      error: 'Error processing Excel file', 
      details: err.message 
    });
  }
});

// HTML to PDF endpoint
app.post('/html-to-pdf', async (req, res) => {
  try {
    const { htmlContent, url, options = {} } = req.body;
    
    if (!htmlContent && !url) {
      return res.status(400).json({ error: 'Either htmlContent or url is required' });
    }
    
    // Launch puppeteer browser
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set page content or navigate to URL
    if (htmlContent) {
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    } else {
      await page.goto(url, { waitUntil: 'networkidle0' });
    }
    
    // PDF generation options
    const pdfOptions = {
      format: options.format || 'A4',
      printBackground: true,
      margin: {
        top: options.marginTop || '20px',
        right: options.marginRight || '20px',
        bottom: options.marginBottom || '20px',
        left: options.marginLeft || '20px'
      },
      ...options
    };
    
    // Generate PDF
    const pdfBuffer = await page.pdf(pdfOptions);
    
    await browser.close();
    
    const uniqueName = `html_${Date.now()}.pdf`;
    const outputPath = path.join(uploadDir, uniqueName);
    fs.writeFileSync(outputPath, pdfBuffer);
    
    res.json({ 
      success: true,
      path: `/uploads/${uniqueName}`,
      message: 'HTML converted to PDF successfully!'
    });
  } catch (err) {
    console.error('HTML to PDF conversion error:', err);
    res.status(500).json({ 
      error: 'Error converting HTML to PDF', 
      details: err.message 
    });
  }
});

// Routes
app.post('/merge', upload.array('files'), async (req, res) => {
  try {
    const merger = new PDFMerger();
    for (const file of req.files) {
      await merger.add(file.path);
    }
    const uniqueName = `merged_${Date.now()}.pdf`;
    const outputPath = path.join(uploadDir, uniqueName);
    await merger.save(outputPath);

    // Database operation commented out
    // const newFile = new ProcessedFile({
    //   fileName: uniqueName,
    //   operationType: 'merge',
    //   filePath: outputPath
    // });
    // await newFile.save();

    // Optional: delete original files
    for (const file of req.files) {
      fs.unlinkSync(file.path);
    }

    res.json({ path: `/uploads/${uniqueName}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error merging PDFs');
  }
});

app.post('/doc-to-pdf', upload.single('file'), async (req, res) => {
  try {
    const docBuf = fs.readFileSync(req.file.path);
    const pdfBuf = await convertAsync(docBuf, '.pdf', undefined);
    const uniqueName = `converted_${Date.now()}.pdf`;
    const outputPath = path.join(uploadDir, uniqueName);
    fs.writeFileSync(outputPath, pdfBuf);

    // Database operation commented out
    // const newFile = new ProcessedFile({
    //   fileName: uniqueName,
    //   operationType: 'doc-to-pdf',
    //   filePath: outputPath
    // });
    // await newFile.save();

    fs.unlinkSync(req.file.path);

    res.json({ path: `/uploads/${uniqueName}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error converting DOC to PDF');
  }
});

app.post('/image-to-pdf', upload.array('images'), async (req, res) => {
  try {
    const pdfDoc = await PDFDocument.create();
    for (const image of req.files) {
      const imgBuffer = fs.readFileSync(image.path);
      let img;
      if (image.mimetype === 'image/jpeg') {
        img = await pdfDoc.embedJpg(imgBuffer);
      } else if (image.mimetype === 'image/png') {
        img = await pdfDoc.embedPng(imgBuffer);
      } else {
        continue; // skip unsupported
      }
      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }
    const pdfBytes = await pdfDoc.save();
    const uniqueName = `imagepdf_${Date.now()}.pdf`;
    const outputPath = path.join(uploadDir, uniqueName);
    fs.writeFileSync(outputPath, pdfBytes);

    // Database operation commented out
    // const newFile = new ProcessedFile({
    //   fileName: uniqueName,
    //   operationType: 'image-to-pdf',
    //   filePath: outputPath
    // });
    // await newFile.save();

    for (const image of req.files) {
      fs.unlinkSync(image.path);
    }

    res.json({ path: `/uploads/${uniqueName}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error converting images to PDF');
  }
});

// Split PDF endpoint
app.post('/split-pdf', upload.single('file'), async (req, res) => {
  try {
    const { splitType, pageRanges, startPage, endPage } = req.body;
    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const totalPages = pdfDoc.getPageCount();
    
    let splitResults = [];
    
    if (splitType === 'range' && pageRanges) {
      // Split by custom ranges
      const ranges = JSON.parse(pageRanges);
      for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(pdfDoc, 
          Array.from({length: range.end - range.start + 1}, (_, idx) => range.start - 1 + idx)
        );
        pages.forEach((page) => newPdf.addPage(page));
        
        const pdfBytes = await newPdf.save();
        const uniqueName = `split_${Date.now()}_part${i + 1}.pdf`;
        const outputPath = path.join(uploadDir, uniqueName);
        fs.writeFileSync(outputPath, pdfBytes);
        
        splitResults.push({
          name: `Part ${i + 1} (Pages ${range.start}-${range.end})`,
          path: `/uploads/${uniqueName}`,
          pages: range.end - range.start + 1
        });
      }
    } else if (splitType === 'single') {
      // Split into individual pages
      for (let i = 0; i < totalPages; i++) {
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(page);
        
        const pdfBytes = await newPdf.save();
        const uniqueName = `split_${Date.now()}_page${i + 1}.pdf`;
        const outputPath = path.join(uploadDir, uniqueName);
        fs.writeFileSync(outputPath, pdfBytes);
        
        splitResults.push({
          name: `Page ${i + 1}`,
          path: `/uploads/${uniqueName}`,
          pages: 1
        });
      }
    } else if (splitType === 'extract' && startPage && endPage) {
      // Extract specific page range
      const start = parseInt(startPage) - 1;
      const end = parseInt(endPage) - 1;
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdfDoc, 
        Array.from({length: end - start + 1}, (_, idx) => start + idx)
      );
      pages.forEach((page) => newPdf.addPage(page));
      
      const pdfBytes = await newPdf.save();
      const uniqueName = `extracted_${Date.now()}_pages${startPage}-${endPage}.pdf`;
      const outputPath = path.join(uploadDir, uniqueName);
      fs.writeFileSync(outputPath, pdfBytes);
      
      splitResults.push({
        name: `Pages ${startPage}-${endPage}`,
        path: `/uploads/${uniqueName}`,
        pages: end - start + 1
      });
    }
    
    // Clean up original file
    fs.unlinkSync(req.file.path);
    
    res.json({ 
      success: true,
      totalPages,
      results: splitResults
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error splitting PDF', details: err.message });
  }
});

// Compress PDF endpoint
app.post('/compress-pdf', upload.single('file'), async (req, res) => {
  try {
    const { compressionLevel = 'medium' } = req.body;
    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    
    // Get original file size
    const originalSize = fs.statSync(req.file.path).size;
    
    // Compression settings based on level
    let compressionOptions = {};
    switch (compressionLevel) {
      case 'low':
        compressionOptions = { useObjectStreams: false, addDefaultPage: false };
        break;
      case 'medium':
        compressionOptions = { useObjectStreams: true, addDefaultPage: false };
        break;
      case 'high':
        compressionOptions = { 
          useObjectStreams: true, 
          addDefaultPage: false,
          subset: true
        };
        break;
      default:
        compressionOptions = { useObjectStreams: true, addDefaultPage: false };
    }
    
    // Save compressed PDF
    const compressedBytes = await pdfDoc.save(compressionOptions);
    const uniqueName = `compressed_${Date.now()}.pdf`;
    const outputPath = path.join(uploadDir, uniqueName);
    fs.writeFileSync(outputPath, compressedBytes);
    
    // Get compressed file size
    const compressedSize = fs.statSync(outputPath).size;
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    
    // Clean up original file
    fs.unlinkSync(req.file.path);
    
    res.json({ 
      success: true,
      path: `/uploads/${uniqueName}`,
      originalSize: originalSize,
      compressedSize: compressedSize,
      compressionRatio: compressionRatio,
      compressionLevel: compressionLevel
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error compressing PDF', details: err.message });
  }
});

// Image extraction endpoint temporarily disabled due to library issues
app.post('/extract-images', upload.single('file'), async (req, res) => {
  try {
    // Temporary response - feature under development
    res.status(501).json({ 
      message: 'Image extraction feature is temporarily under development. Please try again later.' 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error extracting images from PDF');
  }
});

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`HEXON Backend server running on http://localhost:${port}`);
}); 