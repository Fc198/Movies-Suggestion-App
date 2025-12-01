export default function MovieItem({ movie, onDelete, onEdit }) {
    return (
      <div
        style={{
          border: "1px solid #aaa",
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      >
        <h3>{movie.title}</h3>
  
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Director:</strong> {movie.director}</p>
  
        <button onClick={() => onEdit(movie)}>✏ Edit</button>
        <button onClick={() => onDelete(movie.id)}>🗑 Delete</button>
      </div>
    );
  }
  