const BASE_URL = "http://localhost:5000/api/watchlist";

export async function fetchWatchlist(userId, token) {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch watchlist");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function addMovieToWatchlist(userId, userEmail, movie) {
  try {
    const res = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, userEmail, movie }),
    });

    if (res.status === 409) {
      const errorData = await res.json();
      return { success: false, message: errorData.message || "Movie already in watchlist" };
    }

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add movie");
    }

    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message || "Something went wrong" };
  }
}
