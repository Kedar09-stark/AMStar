const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // from .env

const API_URL = `${API_BASE_URL}/api/celebrities`;

export const fetchCelebrities = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch celebrities");
  return res.json();
};

export const addCelebrity = async (celebrity) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(celebrity),
  });
  if (!res.ok) throw new Error("Failed to add celebrity");
  return res.json();  // optionally return the created celebrity data
};

export const updateCelebrity = async (id, celebrity) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(celebrity),
  });
  if (!res.ok) throw new Error("Failed to update celebrity");
  return res.json();  // optionally return updated data
};

export const deleteCelebrity = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete celebrity");
  return res.json();  // optionally confirm deletion response
};
