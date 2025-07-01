// FTRecommendationsTab.jsx
import React from "react";
import FTRecommendationsForm from "../Extraadmin/FTRecommendationsForm";
import FTRecommendationsList from "../Extraadmin/FTRecommendationsList";
import {
  addFTRecommendation,
  updateFTRecommendation,
  deleteFTRecommendation,
} from "../../api/ftremommedationapi";

const FTRecommendationsTab = ({
  form,
  setForm,
  editingId,
  setEditingId,
  submitting,
  setSubmitting,
  ftRecommendations,
  loadFTRecommendations,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.id || !form.title || !form.img) return;

    const payload = {
      id: Number(form.id),
      title: form.title,
      img: form.img,
      rating: Number(form.rating),
      genres: form.genres,
      trailerLink: form.trailerLink,
    };

    setSubmitting(true);
    try {
      if (editingId === null) await addFTRecommendation(payload);
      else await updateFTRecommendation(editingId, payload);
      setForm({ id: "", title: "", img: "", rating: "", genres: [], trailerLink: "" });
      setEditingId(null);
      loadFTRecommendations();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recommendation?")) return;
    await deleteFTRecommendation(id);
    loadFTRecommendations();
  };

  return (
    <>
      <FTRecommendationsForm
        form={form}
        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        onSubmit={handleSubmit}
        onCancel={() => {
          setForm({ id: "", title: "", img: "", rating: "", genres: [], trailerLink: "" });
          setEditingId(null);
        }}
        isEditing={editingId !== null}
        isSubmitting={submitting}
      />
      <FTRecommendationsList
        ftRecommendations={ftRecommendations}
        onEdit={(item) => {
          setForm({
            id: item.id.toString(),
            title: item.title,
            img: item.img,
            rating: item.rating.toString(),
            genres: item.genres,
            trailerLink: item.trailerLink,
          });
          setEditingId(item.id);
        }}
        onDelete={handleDelete}
      />
    </>
  );
};

export default FTRecommendationsTab;
