const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    // PostgreSQL errors
    if (err.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'Duplicate entry. This movie already exists.'
      });
    }
    
    if (err.code === '23503') {
      return res.status(400).json({
        success: false,
        message: 'Invalid reference. Related record does not exist.'
      });
    }
    
    // Default error
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  
  module.exports = errorHandler;