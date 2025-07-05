// src/api/interestApi.js
import axios from "./axiosInstance";

const BASE_URL = "/interests";

/**
 * Fetch all interests
 * @returns {Promise<Array>}
 */
export async function fetchInterests() {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (error) {
    handleError(error, "fetching interests");
  }
}

/**
 * Add a new interest
 * @param {Object} interest
 * @returns {Promise<Object>}
 */
export async function addInterest(interest) {
  try {
    const { data } = await axios.post(BASE_URL, interest);
    return data;
  } catch (error) {
    handleError(error, "adding interest");
  }
}

/**
 * Update an interest by id
 * @param {string|number} id
 * @param {Object} interest
 * @returns {Promise<Object>}
 */
export async function updateInterest(id, interest) {
  try {
    const { data } = await axios.put(`${BASE_URL}/${id}`, interest);
    return data;
  } catch (error) {
    handleError(error, "updating interest");
  }
}

/**
 * Delete an interest by id
 * @param {string|number} id
 * @returns {Promise<void>}
 */
export async function deleteInterest(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    handleError(error, "deleting interest");
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
