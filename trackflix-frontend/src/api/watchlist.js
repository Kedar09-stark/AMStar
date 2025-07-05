// src/api/watchlistApi.js
import axios from "./axiosInstance";

const BASE_URL = "/watchlist";

/**
 * Fetch watchlist for a user
 * @param {string} userId
 * @param {string} token - JWT token
 * @returns {Promise<Object|null>} watchlist data or null if not found
 */
export async function fetchWatchlist(userId, token) {
  try {
    const { data } = await axios.get(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    handleError(error, "fetching watchlist");
  }
}

/**
 * Add a movie to user's watchlist
 * @param {string} userId
 * @param {string} userEmail
 * @param {Object} movie
 * @returns {Promise<{success: boolean, data?: Object, message?: string}>}
 */
export async function addMovieToWatchlist(userId, userEmail, movie) {
  try {
    const { data } = await axios.post(`${BASE_URL}/add`, { userId, userEmail, movie });
    return { success: true, data };
  } catch (error) {
    if (error.response?.status === 409) {
      return {
        success: false,
        message: error.response.data?.message || "Movie already in watchlist",
      };
    }
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Something went wrong",
    };
  }
}

/**
 * Centralized error handler
 */
function handleError(error, context) {
  if (error.response) {
    throw new Error(
      `Error ${context}: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`
    );
  } else if (error.request) {
    throw new Error(`Error ${context}: No response received from server.`);
  } else {
    throw new Error(`Error ${context}: ${error.message}`);
  }
}
