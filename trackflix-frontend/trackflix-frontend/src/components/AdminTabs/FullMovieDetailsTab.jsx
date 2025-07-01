import React from "react";
import FullMovieDetailForm from "../Extraadmin/FullMovieDetailForm";
import FullMovieDetailList from "../Extraadmin/FullMovieDetailList";
import {
  addFullMovieDetail,
  updateFullMovieDetail,
  deleteFullMovieDetail,
} from "../../api/moviedetailsapi";

const FullMovieDetailsTab = ({
  form,
  setForm,
  editingId,
  setEditingId,
  submitting,
  setSubmitting,
  fullMovieDetails,
  loadFullMovieDetails,
  loading,
  error,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.id || !form.title || !form.overview) return;

    const payload = {
      ...form,
      id: Number(form.id),
      rating: Number(form.rating),
      runtime: Number(form.runtime),
      budget: Number(form.budget),
      boxOffice: Number(form.boxOffice),
      releaseDate: new Date(form.releaseDate),
      similarMovies: form.similarMovies?.map(Number),
    };

    setSubmitting(true);
    try {
      if (editingId === null) await addFullMovieDetail(payload);
      else await updateFullMovieDetail(editingId, payload);
      setForm({});
      setEditingId(null);
      loadFullMovieDetails();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this full movie detail?")) return;
    await deleteFullMovieDetail(id);
    loadFullMovieDetails();
  };

  return (
    <>
      <FullMovieDetailForm
        form={form}
        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        onSubmit={handleSubmit}
        onCancel={() => {
          setForm({});
          setEditingId(null);
        }}
        isEditing={editingId !== null}
        isSubmitting={submitting}
      />
      <FullMovieDetailList
        fullMovieDetails={fullMovieDetails}
        onEdit={(item) => {
          setForm({ ...item, id: item.id.toString() });
          setEditingId(item.id);
        }}
        onDelete={handleDelete}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default FullMovieDetailsTab;
