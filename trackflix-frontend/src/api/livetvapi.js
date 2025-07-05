// src/api/liveTVShowApi.js
import axios from "./axiosInstance";

const BASE_URL = "/livetvshows";

/**
 * Fetch all live TV shows
 * @returns {Promise<Array>}
 */
export async function fetchLiveTVShows() {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (error) {
    handleError(error, "fetching live TV shows");
  }
}

/**
 * Add a new live TV show
 * @param {Object} liveTVShow
 * @returns {Promise<Object>}
 */
export async function addLiveTVShow(liveTVShow) {
  try {
    const { data } = await axios.post(BASE_URL, liveTVShow);
    return data;
  } catch (error) {
    handleError(error, "adding live TV show");
  }
}

/**
 * Update a live TV show by id
 * @param {string|number} id
 * @param {Object} liveTVShow
 * @returns {Promise<Object>}
 */
export async function updateLiveTVShow(id, liveTVShow) {
  try {
    const { data } = await axios.put(`${BASE_URL}/${id}`, liveTVShow);
    return data;
  } catch (error) {
    handleError(error, "updating live TV show");
  }
}

/**
 * Delete a live TV show by id
 * @param {string|number} id
 * @returns {Promise<Object>}
 */
export async function deleteLiveTVShow(id) {
  try {
    const { data } = await axios.delete(`${BASE_URL}/${id}`);
    return data;
  } catch (error) {
    handleError(error, "deleting live TV show");
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
