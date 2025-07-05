// src/api/userApi.js
import axios from "./axiosInstance";

const BASE_URL = "/users";

/**
 * Fetch all users
 * @returns {Promise<Array>}
 */
export async function fetchUsers() {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (error) {
    handleError(error, "fetching users");
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
