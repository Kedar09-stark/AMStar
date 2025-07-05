// src/api/liveShowApi.js
import axios from "./axiosInstance";

const BASE_URL = "/liveshows";

/**
 * Fetch all live TV details
 * @returns {Promise<Array>}
 */
export async function fetchLiveTVDetails() {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (error) {
    handleError(error, "fetching live TV details");
  }
}

/**
 * Add a new live TV detail
 * @param {Object} liveDetail
 * @returns {Promise<Object>}
 */
export async function addLiveTVDetail(liveDetail) {
  try {
    const { data } = await axios.post(BASE_URL, liveDetail);
    return data;
  } catch (error) {
    handleError(error, "adding live TV detail");
  }
}

/**
 * Update a live TV detail by id
 * @param {string|number} id
 * @param {Object} liveDetail
 * @returns {Promise<Object>}
 */
export async function updateLiveTVDetail(id, liveDetail) {
  try {
    const { data } = await axios.put(`${BASE_URL}/${id}`, liveDetail);
    return data;
  } catch (error) {
    handleError(error, "updating live TV detail");
  }
}

/**
 * Delete a live TV detail by id
 * @param {string|number} id
 * @returns {Promise<void>}
 */
export async function deleteLiveTVDetail(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    handleError(error, "deleting live TV detail");
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
