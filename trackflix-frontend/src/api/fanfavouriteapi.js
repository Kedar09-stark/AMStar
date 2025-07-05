// src/api/fanfavouriteapi.js
import axios from "./axiosInstance";

const API_URL = "/fanfavourites";

/**
 * Fetch all fan favourites
 * @returns {Promise<Array>} Array of fan favourite objects
 */
export async function fetchFanFavourites() {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    handleError(error, "fetching fan favourites");
  }
}

/**
 * Add a new fan favourite
 * @param {Object} favourite - Fan favourite data to add
 * @returns {Promise<Object>} Created fan favourite
 */
export async function addFanFavourite(favourite) {
  try {
    const { data } = await axios.post(API_URL, favourite);
    return data;
  } catch (error) {
    handleError(error, "adding fan favourite");
  }
}

/**
 * Update an existing fan favourite by ID
 * @param {string|number} id - Fan favourite ID
 * @param {Object} favourite - Updated fan favourite data
 * @returns {Promise<Object>} Updated fan favourite
 */
export async function updateFanFavourite(id, favourite) {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, favourite);
    return data;
  } catch (error) {
    handleError(error, "updating fan favourite");
  }
}

/**
 * Delete a fan favourite by ID
 * @param {string|number} id - Fan favourite ID
 * @returns {Promise<void>}
 */
export async function deleteFanFavourite(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    handleError(error, "deleting fan favourite");
  }
}

/**
 * Centralized error handler for API calls
 * @param {any} error - Axios error object
 * @param {string} context - Context for the error message
 * @throws {Error}
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
