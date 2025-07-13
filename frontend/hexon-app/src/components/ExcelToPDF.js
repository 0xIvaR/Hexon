import React, { useState } from 'react';
import './ComingSoon.css';

const ExcelToPDF = ({ onBackClick }) => {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Check if file is Excel format
      const allowedTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.oasis.opendocument.spreadsheet'
      ];
      
      if (allowedTypes.includes(selectedFile.type) || 
          selectedFile.name.match(/\.(xls|xlsx|ods)$/i)) {
        setFile(selectedFile);
        setError('');
        setConvertedFile(null);
      } else {
        setError('Please select a valid Excel file (.xls, .xlsx, .ods)');
        setFile(null);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const allowedTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.oasis.opendocument.spreadsheet'
      ];
      
      if (allowedTypes.includes(droppedFile.type) || 
          droppedFile.name.match(/\.(xls|xlsx|ods)$/i)) {
        setFile(droppedFile);
        setError('');
        setConvertedFile(null);
      } else {
        setError('Please select a valid Excel file (.xls, .xlsx, .ods)');
        setFile(null);
      }
    }
  };

  const convertToPDF = async () => {
    if (!file) {
      setError('Please select an Excel file first');
      return;
    }

    setIsConverting(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/excel-to-pdf', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setConvertedFile({
          name: file.name.replace(/\.(xls|xlsx|ods)$/i, '.pdf'),
          path: result.path,
          message: result.message
        });
      } else {
        // Handle error response
        if (result.installInstructions) {
          setError(
            <div>
              <p><strong>{result.error}</strong></p>
              <p>{result.details}</p>
              <div style={{ marginTop: '10px', padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
                <p><strong>Installation Instructions:</strong></p>
                <p><strong>Windows:</strong> {result.installInstructions.windows}</p>
                <p><strong>Mac:</strong> {result.installInstructions.mac}</p>
                <p><strong>Linux:</strong> {result.installInstructions.linux}</p>
              </div>
            </div>
          );
        } else {
          setError(result.error || 'Conversion failed');
        }
      }
    } catch (err) {
      setError('Error converting Excel to PDF: ' + err.message);
    } finally {
      setIsConverting(false);
    }
  };

  const downloadPDF = () => {
    if (convertedFile) {
      const link = document.createElement('a');
      link.href = `http://localhost:5000${convertedFile.path}`;
      link.download = convertedFile.name;
      link.click();
    }
  };

  const resetConverter = () => {
    setFile(null);
    setConvertedFile(null);
    setError('');
    setIsConverting(false);
  };

  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <h2>Excel to PDF Converter</h2>
        <p>Convert Excel spreadsheets to PDF format. Maintain formatting, charts, and data integrity while creating professional-looking documents.</p>
        
        {!convertedFile && (
          <div className="converter-section">
            <div 
              className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".xls,.xlsx,.ods"
                onChange={handleFileChange}
                className="file-input"
                id="excel-file"
              />
              <label htmlFor="excel-file" className="file-label">
                <div className="upload-icon">📊</div>
                <p>
                  {file ? file.name : 'Drop your Excel file here or click to browse'}
                </p>
                <span className="file-types">Supported: .xls, .xlsx, .ods</span>
              </label>
            </div>

            {file && (
              <div className="file-info">
                <p><strong>Selected file:</strong> {file.name}</p>
                <p><strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            )}

            <button 
              onClick={convertToPDF}
              disabled={!file || isConverting}
              className="convert-button"
            >
              {isConverting ? 'Converting...' : 'Convert to PDF'}
            </button>
          </div>
        )}

        {isConverting && (
          <div className="loading-section">
            <div className="loading-spinner"></div>
            <p>Converting Excel to PDF...</p>
          </div>
        )}

        {convertedFile && (
          <div className="success-section">
            <div className="success-icon">✅</div>
            <h3>Conversion Successful!</h3>
            <p>{convertedFile.message}</p>
            <div className="converted-file-info">
              <p><strong>File:</strong> {convertedFile.name}</p>
            </div>
            <div className="action-buttons">
              <button onClick={downloadPDF} className="download-button">
                Download PDF
              </button>
              <button onClick={resetConverter} className="convert-another-button">
                Convert Another File
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="error-section">
            <div className="error-icon">❌</div>
            <p>{error}</p>
          </div>
        )}

        <button onClick={onBackClick} className="back-button">
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default ExcelToPDF; 