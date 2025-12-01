const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getRandomMovie,
  getMoviesByGenre,
  getUnwatchedMovies
} = require('../controllers/movieController');

// IMPORTANT: Specific routes must come BEFORE parameterized routes
// Suggestion routes (extra credit) - must be first
router.get('/suggest/random', getRandomMovie);
router.get('/suggest/genre/:genre', getMoviesByGenre);
router.get('/suggest/unwatched', getUnwatchedMovies);

// CRUD routes
router.get('/', getAllMovies);
router.get('/:id', getMovieById);  // This should be last
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;