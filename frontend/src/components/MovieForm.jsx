import { useState, useEffect } from "react";

export default function MovieForm({ onAdd, onUpdate, editMovie }) {
  const [form, setForm] = useState({
    title: "",
    genre: "",
    year: "",
    rating: "",
    director: "",
    description: "",
    watched: false,
    personal_notes: "",
  });

  useEffect(() => {
    if (editMovie) {
      setForm(editMovie);
    }
  }, [editMovie]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMovie) {
      onUpdate(form);
    } else {
      onAdd(form);
    }

    setForm({
      title: "",
      genre: "",
      year: "",
      rating: "",
      director: "",
      description: "",
      watched: false,
      personal_notes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h2>{editMovie ? "Edit Movie" : "Add Movie"}</h2>

      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
      <input name="year" value={form.year} onChange={handleChange} placeholder="Year" />
      <input name="rating" value={form.rating} onChange={handleChange} placeholder="Rating (1-10)" />
      <input name="director" value={form.director} onChange={handleChange} placeholder="Director" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <textarea name="personal_notes" value={form.personal_notes} onChange={handleChange} placeholder="Notes" />

      <label>
        <input
          type="checkbox"
          name="watched"
          checked={form.watched}
          onChange={handleChange}
        /> Watched
      </label>

      <button type="submit">
        {editMovie ? "Update" : "Add Movie"}
      </button>
    </form>
  );
}
