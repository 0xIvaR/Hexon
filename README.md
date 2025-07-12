# HEXON - Your All-in-One PDF Solution

A modern, professional web application for comprehensive PDF manipulation with an intuitive user interface and powerful backend processing capabilities.

![HEXON Logo](https://via.placeholder.com/200x100/1976d2/ffffff?text=HEXON)

## ✨ Features

### 🏠 **Modern Home Page**
- Clean, professional landing page with friendly messaging
- Interactive tool cards for easy navigation
- Responsive design that works on all devices
- Dark mode support for better user experience

### 🔧 **PDF Tools**
- **PDF Merger** - Combine multiple PDF files into a single document
- **Split PDF** - Divide PDFs into multiple separate files *(Coming Soon)*
- **Compress PDF** - Reduce PDF file size without losing quality *(Coming Soon)*
- **Doc to PDF** - Convert Word documents, ODT, TXT, and RTF files to PDF
- **Image to PDF** - Convert JPG, JPEG, and PNG images to PDF
- **Image Extractor** - Extract all images from PDF documents

### 🎨 **User Interface**
- **Sticky Navigation** - Navigation bar stays accessible while scrolling
- **Dropdown Menus** - Organized tool categories (Convert PDF, All PDF Tools)
- **Search Functionality** - Quick tool and document search *(UI Ready)*
- **Authentication Ready** - Login/Signup buttons prepared for backend integration
- **Responsive Design** - Mobile-first approach with breakpoints
- **Dark Mode Toggle** - Complete theme switching capability

## 🚀 Tech Stack

### Frontend
- **React.js 19.1.0** - Modern UI framework with hooks
- **Material-UI 7.2.0** - Professional component library with theming
- **Axios 1.10.0** - HTTP client for API communication
- **Emotion** - CSS-in-JS styling solution

### Backend
- **Node.js & Express** - Server framework
- **MongoDB** - Database for file metadata
- **Mongoose** - MongoDB ODM
- **Multer** - File upload handling

### PDF Processing Libraries
- **pdf-merger-js** - PDF merging functionality
- **pdf-lib** - PDF manipulation
- **pdf-to-img** - Image extraction from PDFs
- **libreoffice-convert** - Document conversion

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline ready
- **MongoDB** - Database service

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
- Docker (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Hexon
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend/hexon-app
   npm install
   ```

4. **Start MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:6.0
   
   # Or use local MongoDB installation
   mongod
   ```

5. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   # Server runs on http://localhost:5000
   ```

6. **Start Frontend Development Server**
   ```bash
   cd frontend/hexon-app
   npm start
   # Frontend runs on http://localhost:3000
   ```

### Docker Deployment

1. **Using Docker Compose (Recommended)**
   ```bash
   docker-compose up -d
   ```

2. **Building Docker Image Manually**
   ```bash
   docker build -t hexon-pdf-tools .
   docker run -p 5000:5000 hexon-pdf-tools
   ```

## 🔗 API Endpoints

### PDF Operations
- `POST /merge` - Merge multiple PDF files
- `POST /doc-to-pdf` - Convert document to PDF
- `POST /image-to-pdf` - Convert images to PDF
- `POST /extract-images` - Extract images from PDF

### File Management
- `GET /uploads/:filename` - Download processed files

## 📁 Project Structure

```
Hexon/
├── backend/                 # Node.js Backend
│   ├── index.js            # Main server file
│   ├── package.json        # Backend dependencies
│   └── uploads/            # File upload directory
├── frontend/               # React Frontend
│   └── hexon-app/         # React application
│       ├── src/
│       │   ├── components/ # React components
│       │   │   ├── HomePage.js      # Landing page component
│       │   │   ├── PDFMerger.js     # PDF merge functionality
│       │   │   ├── DocToPDF.js      # Document conversion
│       │   │   ├── ImageToPDF.js    # Image to PDF conversion
│       │   │   └── ImageExtractor.js # Image extraction
│       │   └── App.js     # Main app with navigation
│       └── package.json   # Frontend dependencies
├── scripts/                # Utility scripts
├── .github/
│   └── workflows/         # CI/CD pipeline
├── Dockerfile             # Container configuration
├── docker-compose.yml     # Multi-container setup
├── .gitignore            # Git ignore patterns
└── README.md             # Project documentation
```

## 🌟 Navigation Features

### Home Page
- **Hero Section** - "Your All-in-One PDF Solution" with compelling subtitle
- **Tool Cards** - 5 interactive cards for direct tool access
- **Feature Highlights** - Fast Processing, Secure & Private, High Quality
- **Responsive Grid** - Adapts to different screen sizes

### Navigation Bar
- **Sticky Design** - Stays at top while scrolling
- **Direct Access** - MERGE PDF, SPLIT PDF, COMPRESS PDF buttons
- **Dropdown Menus**:
  - **CONVERT PDF** - Doc to PDF, Image to PDF
  - **ALL PDF TOOLS** - Complete tool listing
- **Right Side Controls**:
  - **Search Bar** - Quick tool and document search
  - **Dark Mode Toggle** - Theme switching
  - **Login/Signup** - Authentication ready

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pdftools
PORT=5000
```

## 📝 Development Scripts

### Backend
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm test         # Run tests
```

### Frontend
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
npm run eject    # Eject from Create React App
```

## 🔄 Future Development (Backend Integration Needed)

- [ ] **Split PDF functionality** - Backend API implementation
- [ ] **Compress PDF functionality** - Backend API implementation
- [ ] **User authentication system** - Login/signup backend
- [ ] **Search functionality** - Document search capabilities
- [ ] **User dashboard** - Personalized user experience
- [ ] **File history management** - Track processed documents

## 🎯 System Requirements

### Development
- Node.js 18+
- MongoDB 6.0+
- 4GB RAM
- 2GB free disk space

### Production
- Docker & Docker Compose
- 8GB RAM (recommended)
- 10GB free disk space
- Ubuntu 20.04+ or similar

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔒 Security

- File uploads are validated for type and size
- All user inputs are sanitized
- MongoDB connections use secure configurations
- Regular security scans in CI/CD pipeline

## 📊 Performance

- Optimized React components with proper state management
- Material-UI theming for consistent performance
- Responsive design with mobile-first approach
- Efficient file processing with streaming

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- React team for the powerful framework
- All contributors who help improve this project

---

**Built with ❤️ by the HEXON team** 