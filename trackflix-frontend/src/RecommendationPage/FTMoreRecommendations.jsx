import React, { useState, useEffect, useRef } from "react";
import FlipCard from "../components/sectionExtra/FlipCard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

const FTMoreRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [flippedCard, setFlippedCard] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  // Check login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  // Fetch recommendation movies
  useEffect(() => {
    fetch("http://localhost:5000/api/ftrecommendations")
      .then((res) => res.json())
      .then((data) => setRecommendations(data))
      .catch((err) =>
        console.error("Failed to fetch FT recommendations:", err)
      );
  }, []);

  // Handle flip
  const handleFlip = (id) => {
    setFlippedCard((prev) => (prev === id ? null : id));
  };

  // Handle Add to Watchlist
  const handleAddToWatchlist = async (movie) => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }
    try {
      await addDoc(collection(db, "watchlists"), {
        userEmail: auth.currentUser.email,
        movie,
      });
      alert("Added to watchlist!");
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  return (
    <section className="bg-black text-white min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
   <header className="mb-12 pt-16 text-center max-w-3xl mx-auto px-4">
  <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-500 drop-shadow-lg">
    🎬 More Movie Featured Today
  </h2>
  <p className="mt-3 text-gray-300 text-lg md:text-xl tracking-wide max-w-xl mx-auto leading-relaxed">
    Discover curated blockbuster favorites and hidden gems selected just for you.
  </p>
  <div className="mt-6 h-1 w-24 bg-yellow-500 rounded mx-auto shadow-md"></div>
</header>



        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendations.map((item) => (
            <FlipCard
              key={item.id}
              item={item}
              isFlipped={flippedCard === item.id}
              onFlip={handleFlip}
              isLoggedIn={isLoggedIn}
              onAddToWatchlist={handleAddToWatchlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FTMoreRecommendations;
