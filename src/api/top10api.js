const API_URL = "http://localhost:5000/api/toptenmovies";

export const fetchTopTenMovies = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch top ten movies");
  return res.json();
};

export const addTopTenMovie = async (movie) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error("Failed to add top ten movie");
};

export const updateTopTenMovie = async (id, movie) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error("Failed to update top ten movie");
};

export const deleteTopTenMovie = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete top ten movie");
};
