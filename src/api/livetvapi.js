const API_URL = "http://localhost:5000/api/livetvshows";

export const fetchLiveTVShows = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch live TV shows");
  return res.json();
};

export const addLiveTVShow = async (liveTVShow) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(liveTVShow),
  });
  if (!res.ok) throw new Error("Failed to add live TV show");
  return res.json();
};

export const updateLiveTVShow = async (id, liveTVShow) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(liveTVShow),
  });
  if (!res.ok) throw new Error("Failed to update live TV show");
  return res.json();
};

export const deleteLiveTVShow = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete live TV show");
  return res.json();
};
