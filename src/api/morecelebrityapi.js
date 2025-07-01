// /src/api/morecelebrityapi.js

const API_URL = "http://localhost:5000/api/recommendationcelebrities";

// GET all recommendation celebrities
export const fetchRecommendationCelebrities = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch recommendation celebrities");
  return res.json();
};

// POST - Add a new celebrity
export const addRecommendationCelebrity = async (newCelebrity) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCelebrity),
  });
  if (!res.ok) throw new Error("Failed to add recommendation celebrity");
  return res.json();
};

// PUT - Update a celebrity by ID
export const updateRecommendationCelebrity = async (id, updatedData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update recommendation celebrity");
  return res.json();
};

// DELETE - Remove celebrity by ID
export const deleteRecommendationCelebrity = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete recommendation celebrity");
  return res.json();
};
