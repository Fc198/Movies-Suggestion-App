const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Root route (works without database)
app.get('/', (req, res) => {
  console.log('Root route accessed!');
  res.json({
    message: 'Movie Suggestions API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      getAllMovies: 'GET /api/movies',
      getMovie: 'GET /api/movies/:id',
      createMovie: 'POST /api/movies',
      updateMovie: 'PUT /api/movies/:id',
      deleteMovie: 'DELETE /api/movies/:id',
      randomSuggestion: 'GET /api/movies/suggest/random',
      byGenre: 'GET /api/movies/suggest/genre/:genre',
      unwatched: 'GET /api/movies/suggest/unwatched'
    }
  });
});

// Test route (no database)
app.get('/test', (req, res) => {
  console.log('Test route accessed!');
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Load routes with error handling (don't crash if routes fail to load)
let moviesRoutes;
try {
  moviesRoutes = require('./routes/movies');
  app.use('/api/movies', moviesRoutes);
  console.log('✅ Movies routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading movies routes:', error.message);
  app.use('/api/movies', (req, res) => {
    res.status(500).json({
      success: false,
      message: 'Database routes not available. Check database connection.',
      error: error.message
    });
  });
}

// Load error handler
let errorHandler;
try {
  errorHandler = require('./middleware/errorHandler');
  app.use(errorHandler);
} catch (error) {
  console.error('❌ Error loading error handler:', error.message);
  app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  });
}

// 404 handler
app.use((req, res) => {
  console.log('404 - Route not found:', req.path);
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  });
});

// Prevent server from exiting on uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  console.error('Stack:', error.stack);
  // Don't exit - keep server running
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  console.error('Stack:', error.stack);
  // Don't exit - keep server running
});

// Start server and keep reference to it
const server = app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`✅ Test endpoint: http://localhost:${PORT}/test`);
  console.log(`✅ Root endpoint: http://localhost:${PORT}/`);
  console.log('✅ Server is listening and ready for requests...');
});

// Verify server is actually listening
server.on('listening', () => {
  console.log('✅ Server is bound to port', PORT);
  const address = server.address();
  console.log('✅ Server address:', address);
});

server.on('error', (error) => {
  console.error('❌ Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try a different port.`);
  }
});

// Keep process alive - prevent exit
// This ensures the event loop stays active
setInterval(() => {
  // Keep-alive interval (runs every second to keep event loop active)
}, 1000);

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
