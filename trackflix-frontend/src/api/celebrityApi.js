const API_URL = "http://localhost:5000/api/celebrities";

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
};

export const updateCelebrity = async (id, celebrity) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(celebrity),
  });
  if (!res.ok) throw new Error("Failed to update celebrity");
};

export const deleteCelebrity = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete celebrity");
};
