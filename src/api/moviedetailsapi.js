const API_URL = "http://localhost:5000/api/fullmoviedetails";

export const fetchFullMovieDetails = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch full movie details");
  return res.json();
};

export const addFullMovieDetail = async (movieDetail) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movieDetail),
  });
  if (!res.ok) throw new Error("Failed to add full movie detail");
};

export const updateFullMovieDetail = async (id, movieDetail) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movieDetail),
  });
  if (!res.ok) throw new Error("Failed to update full movie detail");
};

export const deleteFullMovieDetail = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete full movie detail");
};
