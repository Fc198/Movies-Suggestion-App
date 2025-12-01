const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('❌ Database connection error:', err.message);
    // Don't exit - let the server keep running
});

// Test connection on startup (with delay to let server start first)
setTimeout(() => {
  pool.query('SELECT NOW()')
    .then(() => {
      console.log('✅ Database connection test successful');
    })
    .catch((err) => {
      console.error('⚠️  Database connection test failed:', err.message);
      console.error('⚠️  Server will continue, but database routes may not work');
    });
}, 500); // Delay to let server start first

module.exports = pool;