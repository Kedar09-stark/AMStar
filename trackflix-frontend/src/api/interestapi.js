const API_URL = "http://localhost:5000/api/interests";

export const fetchInterests = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch interests");
  return res.json();
};

export const addInterest = async (interest) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(interest),
  });
  if (!res.ok) throw new Error("Failed to add interest");
};

export const updateInterest = async (id, interest) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(interest),
  });
  if (!res.ok) throw new Error("Failed to update interest");
};

export const deleteInterest = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete interest");
};
