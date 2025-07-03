import { OMDB_API_KEY } from "./constants";

export async function fetchMovies(searchTerm) {
  try {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(
      searchTerm
    )}&type=movie`;
    const res = await fetch(url);
    return await res.json();
  } catch {
    return null;
  }
}
