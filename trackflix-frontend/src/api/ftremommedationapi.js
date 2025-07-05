// src/api/ftRecommendationApi.js
import axios from "./axiosInstance";

const BASE_URL = "/ftrecommendations";

/**
 * Fetch all ft recommendations
 * @returns {Promise<Array>}
 */
export async function fetchFTRecommendations() {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (error) {
    handleError(error, "fetching ft recommendations");
  }
}

/**
 * Add a new ft recommendation
 * @param {Object} recommendation
 * @returns {Promise<Object>}
 */
export async function addFTRecommendation(recommendation) {
  try {
    const { data } = await axios.post(BASE_URL, recommendation);
    return data;
  } catch (error) {
    handleError(error, "adding ft recommendation");
  }
}

/**
 * Update ft recommendation by ID
 * @param {string|number} id
 * @param {Object} recommendation
 * @returns {Promise<Object>}
 */
export async function updateFTRecommendation(id, recommendation) {
  try {
    const { data } = await axios.put(`${BASE_URL}/${id}`, recommendation);
    return data;
  } catch (error) {
    handleError(error, "updating ft recommendation");
  }
}

/**
 * Delete ft recommendation by ID
 * @param {string|number} id
 * @returns {Promise<void>}
 */
export async function deleteFTRecommendation(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    handleError(error, "deleting ft recommendation");
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
    throw new Error(`Error ${context}: No response from server.`);
  } else {
    throw new Error(`Error ${context}: ${error.message}`);
  }
}
