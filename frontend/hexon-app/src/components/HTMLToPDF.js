import React, { useState } from 'react';
import './ComingSoon.css';

const HTMLToPDF = ({ onBackClick }) => {
  const [activeTab, setActiveTab] = useState('html');
  const [htmlContent, setHtmlContent] = useState('');
  const [url, setUrl] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);
  const [error, setError] = useState('');
  const [options, setOptions] = useState({
    format: 'A4',
    marginTop: '20px',
    marginRight: '20px',
    marginBottom: '20px',
    marginLeft: '20px'
  });

  const handleOptionChange = (key, value) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const convertToPDF = async () => {
    if (activeTab === 'html' && !htmlContent.trim()) {
      setError('Please enter HTML content');
      return;
    }
    
    if (activeTab === 'url' && !url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setIsConverting(true);
    setError('');

    const requestBody = {
      options: options
    };

    if (activeTab === 'html') {
      requestBody.htmlContent = htmlContent;
    } else {
      requestBody.url = url;
    }

    try {
      const response = await fetch('http://localhost:5000/html-to-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const result = await response.json();
      
      if (result.success) {
        setConvertedFile({
          name: activeTab === 'url' ? 'webpage.pdf' : 'html-content.pdf',
          path: result.path,
          message: result.message
        });
      } else {
        setError(result.error || 'Conversion failed');
      }
    } catch (err) {
      setError('Error converting HTML to PDF: ' + err.message);
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
    setHtmlContent('');
    setUrl('');
    setConvertedFile(null);
    setError('');
    setIsConverting(false);
  };

  const sampleHTML = `<!DOCTYPE html>
<html>
<head>
    <title>Sample Document</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        p { line-height: 1.6; }
        .highlight { background-color: yellow; }
    </style>
</head>
<body>
    <h1>Sample HTML Document</h1>
    <p>This is a <span class="highlight">sample HTML</span> document that will be converted to PDF.</p>
    <p>You can include any HTML content here including:</p>
    <ul>
        <li>Lists</li>
        <li>Links</li>
        <li>Images</li>
        <li>Tables</li>
        <li>And more!</li>
    </ul>
</body>
</html>`;

  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <h2>HTML to PDF Converter</h2>
        <p>Convert HTML pages and web content to PDF format. Perfect for archiving web pages, creating reports from web data, or offline viewing.</p>
        
        {!convertedFile && (
          <div className="converter-section">
            <div className="tab-buttons">
              <button 
                className={`tab-button ${activeTab === 'html' ? 'active' : ''}`}
                onClick={() => setActiveTab('html')}
              >
                HTML Content
              </button>
              <button 
                className={`tab-button ${activeTab === 'url' ? 'active' : ''}`}
                onClick={() => setActiveTab('url')}
              >
                Website URL
              </button>
            </div>

            {activeTab === 'html' && (
              <div className="html-input-section">
                <div className="input-header">
                  <label>HTML Content:</label>
                  <button 
                    onClick={() => setHtmlContent(sampleHTML)}
                    className="sample-button"
                  >
                    Load Sample
                  </button>
                </div>
                <textarea
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  placeholder="Enter your HTML content here..."
                  className="html-textarea"
                  rows="10"
                />
              </div>
            )}

            {activeTab === 'url' && (
              <div className="url-input-section">
                <label>Website URL:</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="url-input"
                />
              </div>
            )}

            <div className="options-section">
              <h3>PDF Options</h3>
              <div className="options-grid">
                <div className="option-group">
                  <label>Page Format:</label>
                  <select 
                    value={options.format} 
                    onChange={(e) => handleOptionChange('format', e.target.value)}
                    className="option-select"
                  >
                    <option value="A4">A4</option>
                    <option value="A3">A3</option>
                    <option value="A5">A5</option>
                    <option value="Letter">Letter</option>
                    <option value="Legal">Legal</option>
                  </select>
                </div>
                <div className="option-group">
                  <label>Top Margin:</label>
                  <input
                    type="text"
                    value={options.marginTop}
                    onChange={(e) => handleOptionChange('marginTop', e.target.value)}
                    className="option-input"
                    placeholder="20px"
                  />
                </div>
                <div className="option-group">
                  <label>Right Margin:</label>
                  <input
                    type="text"
                    value={options.marginRight}
                    onChange={(e) => handleOptionChange('marginRight', e.target.value)}
                    className="option-input"
                    placeholder="20px"
                  />
                </div>
                <div className="option-group">
                  <label>Bottom Margin:</label>
                  <input
                    type="text"
                    value={options.marginBottom}
                    onChange={(e) => handleOptionChange('marginBottom', e.target.value)}
                    className="option-input"
                    placeholder="20px"
                  />
                </div>
                <div className="option-group">
                  <label>Left Margin:</label>
                  <input
                    type="text"
                    value={options.marginLeft}
                    onChange={(e) => handleOptionChange('marginLeft', e.target.value)}
                    className="option-input"
                    placeholder="20px"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={convertToPDF}
              disabled={isConverting || (activeTab === 'html' && !htmlContent.trim()) || (activeTab === 'url' && !url.trim())}
              className="convert-button"
            >
              {isConverting ? 'Converting...' : 'Convert to PDF'}
            </button>
          </div>
        )}

        {isConverting && (
          <div className="loading-section">
            <div className="loading-spinner"></div>
            <p>Converting HTML to PDF...</p>
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
                Convert Another
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

export default HTMLToPDF; 