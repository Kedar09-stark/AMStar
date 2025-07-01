// src/components/AdminTabs/LiveTVDetailsTab.jsx
import React from "react";
import LiveTVDetailsForm from "../Extraadmin/LiveTVDetailsForm";
import LiveTVDetailsList from "../Extraadmin/LiveTVDetailsList";
import {
  addLiveTVDetail,
  updateLiveTVDetail,
  deleteLiveTVDetail,
} from "../../api/livetvdetailsapi";

const LiveTVDetailsTab = ({
  form,
  setForm,
  editingId,
  setEditingId,
  submitting,
  setSubmitting,
  liveTVDetails,
  loadLiveTVDetails,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.id ||
      !form.title ||
      !form.overview ||
      !form.releaseDate ||
      !form.status
    )
      return;

    // Convert arrays if input is comma separated strings
    const payload = {
      ...form,
      id: Number(form.id),
      rating: Number(form.rating),
      episodeRuntime: form.episodeRuntime
        ? form.episodeRuntime
            .toString()
            .split(",")
            .map((x) => Number(x.trim()))
        : [],
      seasons: Number(form.seasons),
      episodes: Number(form.episodes),
      genres: form.genres
        ? form.genres.toString().split(",").map((x) => x.trim())
        : [],
      language: form.language
        ? form.language.toString().split(",").map((x) => x.trim())
        : [],
      networks: form.networks
        ? form.networks.toString().split(",").map((x) => x.trim())
        : [],
      creators: form.creators
        ? form.creators.toString().split(",").map((x) => x.trim())
        : [],
      cast: form.cast ? form.cast.toString().split(",").map((x) => x.trim()) : [],
      awards: form.awards
        ? form.awards.toString().split(",").map((x) => x.trim())
        : [],
    };

    setSubmitting(true);
    try {
      if (editingId === null) await addLiveTVDetail(payload);
      else await updateLiveTVDetail(editingId, payload);
      setForm({});
      setEditingId(null);
      loadLiveTVDetails();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this live TV detail?")) return;
    await deleteLiveTVDetail(id);
    loadLiveTVDetails();
  };

  return (
    <>
      <LiveTVDetailsForm
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
      <LiveTVDetailsList
        liveTVDetails={liveTVDetails}
        onEdit={(item) => {
          // Convert arrays to comma separated string for form inputs
          setForm({
            ...item,
            id: item.id.toString(),
            episodeRuntime: item.episodeRuntime.join(", "),
            genres: item.genres.join(", "),
            language: item.language.join(", "),
            networks: item.networks.join(", "),
            creators: item.creators.join(", "),
            cast: item.cast.join(", "),
            awards: item.awards.join(", "),
            rating: item.rating.toString(),
            seasons: item.seasons.toString(),
            episodes: item.episodes.toString(),
            releaseDate: item.releaseDate,
          });
          setEditingId(item.id);
        }}
        onDelete={handleDelete}
      />
    </>
  );
};

export default LiveTVDetailsTab;
