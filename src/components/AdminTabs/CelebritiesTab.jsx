// CelebritiesTab.jsx
import React from "react";
import CelebrityForm from "../Extraadmin/CelebrityForm";
import CelebrityList from "../Extraadmin/CelebrityList";
import {
  addCelebrity,
  updateCelebrity,
  deleteCelebrity,
} from "../../api/celebrityApi";

const CelebritiesTab = ({
  form,
  setForm,
  editingId,
  setEditingId,
  submitting,
  setSubmitting,
  celebrities,
  loadCelebrities,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.id || !form.name || !form.img) return;
    const payload = {
      id: Number(form.id),
      name: form.name,
      img: form.img,
    };

    setSubmitting(true);
    try {
      if (editingId === null) await addCelebrity(payload);
      else await updateCelebrity(editingId, payload);
      setForm({ id: "", name: "", img: "" });
      setEditingId(null);
      loadCelebrities();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this celebrity?")) return;
    await deleteCelebrity(id);
    loadCelebrities();
  };

  return (
    <>
      <CelebrityForm
        form={form}
        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        onSubmit={handleSubmit}
        onCancel={() => {
          setForm({ id: "", name: "", img: "" });
          setEditingId(null);
        }}
        isEditing={editingId !== null}
        isSubmitting={submitting}
      />
      <CelebrityList
        celebrities={celebrities}
        onEdit={(c) => {
          setForm({ id: c.id.toString(), name: c.name, img: c.img });
          setEditingId(c.id);
        }}
        onDelete={handleDelete}
      />
    </>
  );
};

export default CelebritiesTab;
