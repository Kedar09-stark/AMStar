const API_URL = "http://localhost:5000/api/featureditems";

export const fetchFeaturedItems = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch featured items");
  return res.json();
};

export const addFeaturedItem = async (item) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to add featured item");
};

export const updateFeaturedItem = async (id, item) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to update featured item");
};

export const deleteFeaturedItem = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete featured item");
};
