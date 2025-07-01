// src/components/AdminTabs/InterestsTab.jsx
import React from "react";
import InterestForm from "../Extraadmin/InterestForm.jsx";

import InterestList from "../Extraadmin/InterestList";
import {
  addInterest,
  updateInterest,
  deleteInterest,
} from "../../api/interestapi";

const InterestsTab = ({
  form,
  setForm,
  editingId,
  setEditingId,
  submitting,
  setSubmitting,
  interests,
  loadInterests,
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
      if (editingId === null) await addInterest(payload);
      else await updateInterest(editingId, payload);
      setForm({ id: "", title: "", img: "", rating: "", genres: [], trailerLink: "" });
      setEditingId(null);
      loadInterests();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this interest?")) return;
    await deleteInterest(id);
    loadInterests();
  };

  return (
    <>
      <InterestForm
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
      <InterestList
        interests={interests}
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

export default InterestsTab;
