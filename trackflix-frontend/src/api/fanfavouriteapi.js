const API_URL = "http://localhost:5000/api/fanfavourites";

export const fetchFanFavourites = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch fan favourites");
  return res.json();
};

export const addFanFavourite = async (favourite) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(favourite),
  });
  if (!res.ok) throw new Error("Failed to add fan favourite");
};

export const updateFanFavourite = async (id, favourite) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(favourite),
  });
  if (!res.ok) throw new Error("Failed to update fan favourite");
};

export const deleteFanFavourite = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete fan favourite");
};
