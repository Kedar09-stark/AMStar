// src/api/topTenMoviesApi.js
import axios from "./axiosInstance";

const BASE_URL = "/toptenmovies";

/**
 * Fetch all top ten movies
 * @returns {Promise<Array>}
 */
export async function fetchTopTenMovies() {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (error) {
    handleError(error, "fetching top ten movies");
  }
}

/**
 * Add a new top ten movie
 * @param {Object} movie
 * @returns {Promise<Object>}
 */
export async function addTopTenMovie(movie) {
  try {
    const { data } = await axios.post(BASE_URL, movie);
    return data;
  } catch (error) {
    handleError(error, "adding top ten movie");
  }
}

/**
 * Update a top ten movie by id
 * @param {string|number} id
 * @param {Object} movie
 * @returns {Promise<Object>}
 */
export async function updateTopTenMovie(id, movie) {
  try {
    const { data } = await axios.put(`${BASE_URL}/${id}`, movie);
    return data;
  } catch (error) {
    handleError(error, "updating top ten movie");
  }
}

/**
 * Delete a top ten movie by id
 * @param {string|number} id
 * @returns {Promise<void>}
 */
export async function deleteTopTenMovie(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    handleError(error, "deleting top ten movie");
  }
}

/**
 * Central error handler
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
