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
        // No watchlist found for this user
        return null;
      }
      throw new Error("Failed to fetch watchlist");
    }

    const data = await res.json();
    return data; // return full watchlist object { userId, userEmail, movies }
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

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add movie");
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
}
