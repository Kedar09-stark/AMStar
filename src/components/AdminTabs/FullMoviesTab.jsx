// FullMoviesTab.jsx
import React from "react";
import FullMoviesForm from "../Extraadmin/FullMoviesForm";
import FullMoviesList from "../Extraadmin/FullMoviesList";
import {
  addFullMovie,
  updateFullMovie,
  deleteFullMovie,
} from "../../api/movieapi";

const FullMoviesTab = ({
  form,
  setForm,
  editingId,
  setEditingId,
  submitting,
  setSubmitting,
  fullMovies,
  loadFullMovies,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.id || !form.title || !form.releaseDate) return;

    const payload = {
      ...form,
      id: Number(form.id),
      rating: Number(form.rating),
      genres: Array.isArray(form.genres) ? form.genres : form.genres.split(",").map(s => s.trim()),
      releaseDate: new Date(form.releaseDate),
    };

    setSubmitting(true);
    try {
      if (editingId === null) await addFullMovie(payload);
      else await updateFullMovie(editingId, payload);

      setForm({
        id: "",
        title: "",
        rating: "",
        genres: [],
        releaseDate: "",
        trailer: "",
        image: "",
      });
      setEditingId(null);
      loadFullMovies();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this full movie?")) return;
    await deleteFullMovie(id);
    loadFullMovies();
  };

  return (
    <>
      <FullMoviesForm
        form={form}
        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        onSubmit={handleSubmit}
        onCancel={() => {
          setForm({
            id: "",
            title: "",
            rating: "",
            genres: [],
            releaseDate: "",
            trailer: "",
            image: "",
          });
          setEditingId(null);
        }}
        isEditing={editingId !== null}
        isSubmitting={submitting}
      />
      <FullMoviesList
        fullMovies={fullMovies}
        onEdit={(item) => {
          setForm({
            ...item,
            id: item.id.toString(),
            rating: item.rating.toString(),
            genres: item.genres.join(", "),
            releaseDate: item.releaseDate,
          });
          setEditingId(item.id);
        }}
        onDelete={handleDelete}
      />
    </>
  );
};

export default FullMoviesTab;
