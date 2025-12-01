import MovieItem from "./MovieItem";

export default function MovieList({ movies, onDelete, onEdit }) {
  return (
    <div>
      <h2>Movie List</h2>

      {movies.length === 0 && <p>No movies found.</p>}

      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
