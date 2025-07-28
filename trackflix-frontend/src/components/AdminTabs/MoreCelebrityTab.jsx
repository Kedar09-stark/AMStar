import React from "react";
import MoreCelebrityForm from "../Extraadmin/MoreCelebrityForm";
import MoreCelebrityList from "../Extraadmin/MoreCelebrityList";
import {
  addRecommendationCelebrity,
  updateRecommendationCelebrity,
  deleteRecommendationCelebrity,
} from "../../api/morecelebrityapi";

const MoreCelebrityTab = ({
  form,
  setForm,
  editingId,
  setEditingId,
  submitting,
  setSubmitting,
  moreCelebrities,
  loadMoreCelebrities,
}) => {
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      if (editingId) {
        await updateRecommendationCelebrity(editingId, form);
      } else {
        await addRecommendationCelebrity(form);
      }
      await loadMoreCelebrities();
      setForm({});
      setEditingId(null);
    } catch (err) {
      console.error("Submit Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Adjusted: Handle edit button click — receive entire item, not just id
  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item._id); // or item.id if you use that
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await deleteRecommendationCelebrity(id);
      await loadMoreCelebrities();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    setForm({});
    setEditingId(null);
  };

  return (
    <div>
      <MoreCelebrityForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={editingId !== null}
        isSubmitting={submitting}
      />
      <MoreCelebrityList
        moreCelebrities={moreCelebrities}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MoreCelebrityTab;
