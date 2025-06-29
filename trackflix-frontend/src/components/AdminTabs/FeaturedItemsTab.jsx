// FeaturedItemsTab.jsx
import React from "react";
import FeaturedItemForm from "../Extraadmin/FeaturedItemForm";
import FeaturedItemList from "../Extraadmin/FeaturedItemList";
import {
  addFeaturedItem,
  updateFeaturedItem,
  deleteFeaturedItem,
} from "../../api/featuredIteamapi";

const FeaturedItemsTab = ({
  form,
  setForm,
  editingId,
  setEditingId,
  submitting,
  setSubmitting,
  featuredItems,
  loadFeaturedItems,
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
      if (editingId === null) await addFeaturedItem(payload);
      else await updateFeaturedItem(editingId, payload);

      setForm({
        id: "", title: "", img: "", rating: "", genres: [], trailerLink: "",
      });
      setEditingId(null);
      loadFeaturedItems();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this featured item?")) return;
    await deleteFeaturedItem(id);
    loadFeaturedItems();
  };

  return (
    <>
      <FeaturedItemForm
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

      <FeaturedItemList
        featuredItems={featuredItems}
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

export default FeaturedItemsTab;
