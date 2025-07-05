// src/api/recommendationCelebrityApi.js
import axios from "./axiosInstance";

const BASE_URL = "/recommendationcelebrities";

/**
 * Fetch all recommendation celebrities
 * @returns {Promise<Array>}
 */
export async function fetchRecommendationCelebrities() {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (error) {
    handleError(error, "fetching recommendation celebrities");
  }
}

/**
 * Add a new recommendation celebrity
 * @param {Object} newCelebrity
 * @returns {Promise<Object>}
 */
export async function addRecommendationCelebrity(newCelebrity) {
  try {
    const { data } = await axios.post(BASE_URL, newCelebrity);
    return data;
  } catch (error) {
    handleError(error, "adding recommendation celebrity");
  }
}

/**
 * Update a recommendation celebrity by ID
 * @param {string|number} id
 * @param {Object} updatedData
 * @returns {Promise<Object>}
 */
export async function updateRecommendationCelebrity(id, updatedData) {
  try {
    const { data } = await axios.put(`${BASE_URL}/${id}`, updatedData);
    return data;
  } catch (error) {
    handleError(error, "updating recommendation celebrity");
  }
}

/**
 * Delete a recommendation celebrity by ID
 * @param {string|number} id
 * @returns {Promise<Object>}
 */
export async function deleteRecommendationCelebrity(id) {
  try {
    const { data } = await axios.delete(`${BASE_URL}/${id}`);
    return data;
  } catch (error) {
    handleError(error, "deleting recommendation celebrity");
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
