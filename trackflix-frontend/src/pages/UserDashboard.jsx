import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";

const UserDashboard = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        navigate("/login");
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchWatchlist = async () => {
      setDataLoading(true);
      try {
        // Encode email to safely pass in URL
        const userEmailEncoded = encodeURIComponent(user.email);
        const res = await fetch(`/api/watchlist/${userEmailEncoded}`);
        if (!res.ok) throw new Error("Failed to fetch watchlist");
        const data = await res.json();
        setWatchlist(data.movies || []);
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchWatchlist();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/login");
  };

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700 text-lg">Loading your watchlist...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-6 text-blue-600 text-center">
        Your Watchlist 🎬
      </h1>

      {watchlist.length === 0 ? (
        <p className="text-center text-gray-700">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {watchlist.map((movie) => (
            <div
              key={movie.id || movie.title}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={movie.img}
                alt={movie.title}
                className="w-full h-48 object-cover"
                loading="lazy"
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <p className="text-yellow-400">⭐ {movie.rating}</p>
                <p className="text-gray-600 text-sm mt-1">
                  {Array.isArray(movie.genres) ? movie.genres.join(", ") : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded shadow-md transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
