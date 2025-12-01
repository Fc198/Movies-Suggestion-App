import { useState, useEffect } from "react";
import {
  fetchMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  fetchRandomMovie,
  fetchUnwatched,
  fetchByGenre,
} from "./api";

import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [editMovie, setEditMovie] = useState(null);

  // Load movies on startup
  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const response = await fetchMovies();
    setMovies(response.data || []);
  };

  const handleAddMovie = async (movie) => {
    await createMovie(movie);
    loadMovies();
  };

  const handleUpdateMovie = async (movie) => {
    await updateMovie(movie.id, movie);
    setEditMovie(null);
    loadMovies();
  };

  const handleDeleteMovie = async (id) => {
    await deleteMovie(id);
    loadMovies();
  };

  const handleRandom = async () => {
    const res = await fetchRandomMovie();
    alert(`🎬 Random Pick: ${res.data.title}`);
  };

  const handleUnwatched = async () => {
    const res = await fetchUnwatched();
    setMovies(res.data);
  };

  const handleGenreFilter = async (genre) => {
    const res = await fetchByGenre(genre);
    setMovies(res.data);
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1>🎥 Movie Suggestions</h1>

      <MovieForm
        onAdd={handleAddMovie}
        onUpdate={handleUpdateMovie}
        editMovie={editMovie}
      />

      <button onClick={handleRandom}>🎲 Random Pick</button>
      <button onClick={handleUnwatched}>👀 Unwatched</button>
      <button onClick={() => handleGenreFilter("Sci-Fi")}>Sci-Fi</button>
      <button onClick={() => handleGenreFilter("Drama")}>Drama</button>

      <MovieList
        movies={movies}
        onDelete={handleDeleteMovie}
        onEdit={setEditMovie}
      />
    </div>
  );
}
