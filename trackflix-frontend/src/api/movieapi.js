// src/api/fullMovieApi.js
import axios from "./axiosInstance";

const BASE_URL = "/fullmovies";

/**
 * Fetch all full movies
 * @returns {Promise<Array>}
 */
export async function fetchFullMovies() {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (error) {
    handleError(error, "fetching full movies");
  }
}

/**
 * Add a new full movie
 * @param {Object} movie
 * @returns {Promise<Object>}
 */
export async function addFullMovie(movie) {
  try {
    const { data } = await axios.post(BASE_URL, movie);
    return data;
  } catch (error) {
    handleError(error, "adding full movie");
  }
}

/**
 * Update a full movie by id
 * @param {string|number} id
 * @param {Object} movie
 * @returns {Promise<Object>}
 */
export async function updateFullMovie(id, movie) {
  try {
    const { data } = await axios.put(`${BASE_URL}/${id}`, movie);
    return data;
  } catch (error) {
    handleError(error, "updating full movie");
  }
}

/**
 * Delete a full movie by id
 * @param {string|number} id
 * @returns {Promise<void>}
 */
export async function deleteFullMovie(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    handleError(error, "deleting full movie");
  }
}

/**
 * Centralized error handler
 */
function handleError(error, context) {
  if (error.response) {
    throw new Error(
      `Error ${context}: ${error.response.status} - ${error.response.data?.error || error.response.statusText}`
    );
  } else if (error.request) {
    throw new Error(`Error ${context}: No response received from server.`);
  } else {
    throw new Error(`Error ${context}: ${error.message}`);
  }
}
