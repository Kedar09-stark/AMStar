const API_URL = "http://localhost:5000/api/fullmovies";

export const fetchFullMovies = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch full movies");
  return res.json();
};

export const addFullMovie = async (movie) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error("Failed to add full movie");
};

export const updateFullMovie = async (id, movie) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error("Failed to update full movie");
};

export const deleteFullMovie = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete full movie");
};
