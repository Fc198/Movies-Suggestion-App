const API_BASE = "http://localhost:5001/api/movies";

// GET all movies
export const fetchMovies = async () => {
  const res = await fetch(API_BASE);
  return res.json();
};

// CREATE a movie
export const createMovie = async (movie) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  return res.json();
};

// UPDATE a movie
export const updateMovie = async (id, movie) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  return res.json();
};

// DELETE a movie
export const deleteMovie = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

// RANDOM suggestion
export const fetchRandomMovie = async () => {
  const res = await fetch(`${API_BASE}/suggest/random`);
  return res.json();
};

// GET unwatched
export const fetchUnwatched = async () => {
  const res = await fetch(`${API_BASE}/suggest/unwatched`);
  return res.json();
};

// GET by genre
export const fetchByGenre = async (genre) => {
  const res = await fetch(`${API_BASE}/suggest/genre/${genre}`);
  return res.json();
};
