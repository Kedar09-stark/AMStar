// celebrityApi.js
import axios from "./axiosInstance";

/**
 * Fetch all celebrities
 * @returns {Promise<Array>} Array of celebrity objects
 * @throws {Error} Throws error if request fails
 */
export async function fetchCelebrities() {
  try {
    const { data } = await axios.get("/celebrities");
    return data;
  } catch (error) {
    handleError(error, "fetching celebrities");
  }
}

/**
 * Add a new celebrity
 * @param {Object} celebrity - Celebrity data to add
 * @returns {Promise<Object>} Created celebrity data
 * @throws {Error} Throws error if request fails
 */
export async function addCelebrity(celebrity) {
  try {
    const { data } = await axios.post("/celebrities", celebrity);
    return data;
  } catch (error) {
    handleError(error, "adding celebrity");
  }
}

/**
 * Update an existing celebrity
 * @param {string|number} id - Celebrity ID
 * @param {Object} celebrity - Updated data
 * @returns {Promise<Object>} Updated celebrity data
 * @throws {Error} Throws error if request fails
 */
export async function updateCelebrity(id, celebrity) {
  try {
    const { data } = await axios.put(`/celebrities/${id}`, celebrity);
    return data;
  } catch (error) {
    handleError(error, "updating celebrity");
  }
}

/**
 * Delete a celebrity by ID
 * @param {string|number} id - Celebrity ID
 * @returns {Promise<void>}
 * @throws {Error} Throws error if request fails
 */
export async function deleteCelebrity(id) {
  try {
    await axios.delete(`/celebrities/${id}`);
  } catch (error) {
    handleError(error, "deleting celebrity");
  }
}

/**
 * Handles errors consistently across API calls
 * @param {any} error - Axios error object
 * @param {string} context - Context description for error message
 * @throws {Error} Throws a new Error with detailed message
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
