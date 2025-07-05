// src/api/fullMovieDetailApi.js
import axios from "./axiosInstance";

const BASE_URL = "/fullmoviedetails";

/**
 * Fetch all full movie details
 * @returns {Promise<Array>}
 */
export async function fetchFullMovieDetails() {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (error) {
    handleError(error, "fetching full movie details");
  }
}

/**
 * Add a new full movie detail
 * @param {Object} movieDetail
 * @returns {Promise<Object>}
 */
export async function addFullMovieDetail(movieDetail) {
  try {
    const { data } = await axios.post(BASE_URL, movieDetail);
    return data;
  } catch (error) {
    handleError(error, "adding full movie detail");
  }
}

/**
 * Update a full movie detail by id
 * @param {string|number} id
 * @param {Object} movieDetail
 * @returns {Promise<Object>}
 */
export async function updateFullMovieDetail(id, movieDetail) {
  try {
    const { data } = await axios.put(`${BASE_URL}/${id}`, movieDetail);
    return data;
  } catch (error) {
    handleError(error, "updating full movie detail");
  }
}

/**
 * Delete a full movie detail by id
 * @param {string|number} id
 * @returns {Promise<void>}
 */
export async function deleteFullMovieDetail(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    handleError(error, "deleting full movie detail");
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
