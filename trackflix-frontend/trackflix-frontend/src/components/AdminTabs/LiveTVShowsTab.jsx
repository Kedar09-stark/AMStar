// LiveTVShowsTab.jsx
import React from "react";
import LiveTVShowForm from "../Extraadmin/LiveTVShowForm";
import LiveTVShowList from "../Extraadmin/LiveTVShowList";
import {
  addLiveTVShow,
  updateLiveTVShow,
  deleteLiveTVShow,
} from "../../api/livetvapi";

const LiveTVShowsTab = ({
  form,
  setForm,
  editingId,
  setEditingId,
  submitting,
  setSubmitting,
  liveTVShows,
  loadLiveTVShows,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.id || !form.title || !form.trailer || !form.releaseDate) return;
    const payload = {
      ...form,
      id: Number(form.id),
      rating: Number(form.rating),
      releaseDate: new Date(form.releaseDate),
      genres: form.genres,
    };

    setSubmitting(true);
    try {
      if (editingId === null) await addLiveTVShow(payload);
      else await updateLiveTVShow(editingId, payload);
      setForm({});
      setEditingId(null);
      loadLiveTVShows();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this live TV show?")) return;
    await deleteLiveTVShow(id);
    loadLiveTVShows();
  };

  return (
    <>
      <LiveTVShowForm
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
      <LiveTVShowList
        liveTVShows={liveTVShows}
        onEdit={(item) => {
          setForm({ ...item, id: item.id.toString() });
          setEditingId(item.id);
        }}
        onDelete={handleDelete}
      />
    </>
  );
};

export default LiveTVShowsTab;