// src/api/featuredItemApi.js
import axios from "./axiosInstance";

const BASE_URL = "/featureditems";

/**
 * Fetch all featured items
 * @returns {Promise<Array>}
 */
export async function fetchFeaturedItems() {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (error) {
    handleError(error, "fetching featured items");
  }
}

/**
 * Add a new featured item
 * @param {Object} item
 * @returns {Promise<Object>}
 */
export async function addFeaturedItem(item) {
  try {
    const { data } = await axios.post(BASE_URL, item);
    return data;
  } catch (error) {
    handleError(error, "adding featured item");
  }
}

/**
 * Update a featured item by id
 * @param {string|number} id
 * @param {Object} item
 * @returns {Promise<Object>}
 */
export async function updateFeaturedItem(id, item) {
  try {
    const { data } = await axios.put(`${BASE_URL}/${id}`, item);
    return data;
  } catch (error) {
    handleError(error, "updating featured item");
  }
}

/**
 * Delete a featured item by id
 * @param {string|number} id
 * @returns {Promise<void>}
 */
export async function deleteFeaturedItem(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    handleError(error, "deleting featured item");
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
