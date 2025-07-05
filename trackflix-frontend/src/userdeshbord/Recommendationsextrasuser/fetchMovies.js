import axios from "axios";
import { OMDB_API_KEY } from "./constants";

const OMDB_BASE_URL = "https://www.omdbapi.com/";

export async function fetchMovies(searchTerm) {
  try {
    const { data } = await axios.get(OMDB_BASE_URL, {
      params: {
        apikey: OMDB_API_KEY,
        s: searchTerm,
        type: "movie",
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch movies:", error.message);
    return null;
  }
}
