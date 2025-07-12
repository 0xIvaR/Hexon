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