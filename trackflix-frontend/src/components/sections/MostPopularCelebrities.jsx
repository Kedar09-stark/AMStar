import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MostPopularCelebrities = () => {
  const [celebrities, setCelebrities] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(5); // default for desktop
  const navigate = useNavigate();

  // Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:5000/celebrities")
      .then((res) => res.json())
      .then((data) => setCelebrities(data))
      .catch((err) => console.error("Failed to fetch celebrities:", err));
  }, []);

  // Dynamically adjust items based on screen size
  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsToShow(2);
      } else if (width < 768) {
        setItemsToShow(3);
      } else {
        setItemsToShow(5);
      }
    };

    updateItemsToShow(); // Initial
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - itemsToShow, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + itemsToShow, celebrities.length - itemsToShow)
    );
  };

  return (
    <section className="bg-gradient-to-b from-zinc-900 to-black text-white px-4 sm:px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-yellow-400">
            Most Popular Celebrities
          </h2>
          <p className="mt-2 text-gray-300 text-sm md:text-base">
            Discover the stars everyone is talking about
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-4 px-2 sm:px-0">
          <button
            onClick={handlePrev}
            className="text-yellow-400 hover:text-yellow-600 text-xl p-2 disabled:opacity-50"
            disabled={startIndex === 0}
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={handleNext}
            className="text-yellow-400 hover:text-yellow-600 text-xl p-2 disabled:opacity-50"
            disabled={startIndex + itemsToShow >= celebrities.length}
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Celebrity Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {celebrities
            .slice(startIndex, startIndex + itemsToShow)
            .map((celeb, index) => (
              <motion.div
                key={celeb.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="cursor-pointer relative"
              >
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg mx-auto bg-gray-800">
                  <img
                    src={celeb.img}
                    alt={celeb.name}
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <p className="mt-3 text-center font-semibold text-sm text-white">
                  {celeb.name}
                </p>
              </motion.div>
            ))}
        </div>

        {/* More Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/recommendations2")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full font-medium flex items-center justify-center gap-2 transition duration-300"
          >
            Get More Recommendations <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MostPopularCelebrities;
