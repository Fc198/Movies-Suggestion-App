const pool = require('../config/db');

// Get all movies
const getAllMovies = async () => {
  const result = await pool.query(
    'SELECT * FROM movies ORDER BY created_at DESC'
  );
  return result.rows;
};

// Get single movie by ID
const getMovieById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM movies WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Create new movie
const createMovie = async (movieData) => {
  const { title, genre, year, rating, director, description, watched, personal_notes } = movieData;
  const result = await pool.query(
    `INSERT INTO movies (title, genre, year, rating, director, description, watched, personal_notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [title, genre, year, rating, director, description, watched || false, personal_notes]
  );
  return result.rows[0];
};

// Update movie
const updateMovie = async (id, movieData) => {
  const { title, genre, year, rating, director, description, watched, personal_notes } = movieData;
  const result = await pool.query(
    `UPDATE movies 
     SET title = $1, genre = $2, year = $3, rating = $4, director = $5, 
         description = $6, watched = $7, personal_notes = $8, updated_at = CURRENT_TIMESTAMP
     WHERE id = $9
     RETURNING *`,
    [title, genre, year, rating, director, description, watched, personal_notes, id]
  );
  return result.rows[0];
};

// Delete movie
const deleteMovie = async (id) => {
  const result = await pool.query(
    'DELETE FROM movies WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

// Get random movie (for suggestions)
const getRandomMovie = async () => {
  const result = await pool.query(
    'SELECT * FROM movies ORDER BY RANDOM() LIMIT 1'
  );
  return result.rows[0];
};

// Get movies by genre
const getMoviesByGenre = async (genre) => {
  const result = await pool.query(
    'SELECT * FROM movies WHERE genre = $1 ORDER BY created_at DESC',
    [genre]
  );
  return result.rows;
};

// Get unwatched movies
const getUnwatchedMovies = async () => {
  const result = await pool.query(
    'SELECT * FROM movies WHERE watched = false ORDER BY created_at DESC'
  );
  return result.rows;
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getRandomMovie,
  getMoviesByGenre,
  getUnwatchedMovies
};