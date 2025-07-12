# Multi-stage Dockerfile for HEXON PDF Tools

# Stage 1: Build React Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/hexon-app/package*.json ./
RUN npm ci --only=production
COPY frontend/hexon-app/ ./
RUN npm run build

# Stage 2: Setup Node.js Backend
FROM node:18-alpine AS backend
WORKDIR /app

# Install system dependencies for PDF processing
RUN apk add --no-cache \
    libreoffice \
    font-dejavu \
    poppler-utils

# Copy backend package files
COPY backend/package*.json ./
RUN npm install --only=production

# Copy backend source
COPY backend/ ./

# Create uploads directory
RUN mkdir -p uploads

# Copy built frontend
COPY --from=frontend-build /app/frontend/build ./public

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/ || exit 1

# Start the application
CMD ["npm", "start"] 