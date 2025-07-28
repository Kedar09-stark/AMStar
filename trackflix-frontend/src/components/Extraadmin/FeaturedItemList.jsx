import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4 },
  }),
  exit: { opacity: 0, scale: 0.95 },
};

const FeaturedItemList = ({ featuredItems, onEdit, onDelete }) => {
  const listRef = useRef();

  useEffect(() => {
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={listRef}
      className="bg-white shadow-lg rounded-xl p-4 sm:p-6 max-w-full sm:max-w-5xl mx-auto mt-10 mb-20"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        🎬 Featured Items
      </h2>

      {featuredItems.length === 0 ? (
        <p className="text-center text-gray-400 text-base sm:text-lg mt-10">
          No featured items available.
        </p>
      ) : (
        <ul className="space-y-4">
          <AnimatePresence>
            {featuredItems.map((item, index) => (
              <motion.li
                key={item.id}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardVariants}
                className="border p-4 sm:p-5 rounded-lg bg-gray-50 hover:bg-white hover:shadow-xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="space-y-1 w-full sm:max-w-md">
                  <p className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600">⭐ Rating: {item.rating}</p>
                  <p className="text-sm text-gray-600 truncate">
                    🎭 Genres: {item.genres?.join(", ")}
                  </p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto flex-col sm:flex-row">
                  <button
                    onClick={() => onEdit(item)}
                    className="w-full sm:w-auto px-4 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded shadow-md transition-transform hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="w-full sm:w-auto px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded shadow-md transition-transform hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default FeaturedItemList;
