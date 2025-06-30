// FanFavouritesTab.jsx
import React from "react";
import FanFavouriteForm from "../Extraadmin/FanFavouriteForm";
import FanFavouriteList from "../Extraadmin/FanFavouriteList";
import {
  addFanFavourite,
  updateFanFavourite,
  deleteFanFavourite,
} from "../../api/fanfavouriteapi";

const FanFavouritesTab = ({
  form,
  setForm,
  editingId,
  setEditingId,
  submitting,
  setSubmitting,
  fanFavourites,
  loadFanFavourites,
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
      if (editingId === null) await addFanFavourite(payload);
      else await updateFanFavourite(editingId, payload);
      setForm({ id: "", title: "", img: "", rating: "", genres: [], trailerLink: "" });
      setEditingId(null);
      loadFanFavourites();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this fan favourite?")) return;
    await deleteFanFavourite(id);
    loadFanFavourites();
  };

  return (
    <>
      <FanFavouriteForm
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
      <FanFavouriteList
        fanFavourites={fanFavourites}
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

export default FanFavouritesTab;
