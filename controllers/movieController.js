// controllers/movieController.js
const movieModel = require('../models/movieModel');

// GET /api/movies
const getAllMovies = async (req, res, next) => {
  try {
    const movies = await movieModel.getAllMovies();
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/movies/:id
const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.getMovieById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: `Movie with id ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/movies
const createMovie = async (req, res, next) => {
  try {
    const movieData = req.body;

    // Basic validation: title required (model also checks, but we can give nicer error here)
    if (!movieData.title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    const newMovie = await movieModel.createMovie(movieData);

    res.status(201).json({
      success: true,
      data: newMovie,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/movies/:id
const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieData = req.body;

    // Optional: enforce title on update as well
    if (!movieData.title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required to update a movie',
      });
    }

    const updatedMovie = await movieModel.updateMovie(id, movieData);

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: `Movie with id ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: updatedMovie,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/movies/:id
const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedMovie = await movieModel.deleteMovie(id);

    if (!deletedMovie) {
      return res.status(404).json({
        success: false,
        message: `Movie with id ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Movie with id ${id} deleted successfully`,
      data: deletedMovie,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/movies/suggest/random
const getRandomMovie = async (req, res, next) => {
  try {
    const movie = await movieModel.getRandomMovie();

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'No movies found to suggest',
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/movies/suggest/genre/:genre
const getMoviesByGenre = async (req, res, next) => {
  try {
    const { genre } = req.params;
    const movies = await movieModel.getMoviesByGenre(genre);

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/movies/suggest/unwatched
const getUnwatchedMovies = async (req, res, next) => {
  try {
    const movies = await movieModel.getUnwatchedMovies();

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getRandomMovie,
  getMoviesByGenre,
  getUnwatchedMovies,
};
