const API_URL = "http://localhost:5000/api/liveshows";

export const fetchLiveTVDetails = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch live TV details");
  return res.json();
};

export const addLiveTVDetail = async (liveDetail) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(liveDetail),
  });
  if (!res.ok) throw new Error("Failed to add live TV detail");
};

export const updateLiveTVDetail = async (id, liveDetail) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(liveDetail),
  });
  if (!res.ok) throw new Error("Failed to update live TV detail");
};

export const deleteLiveTVDetail = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete live TV detail");
};
