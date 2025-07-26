import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4 },
  }),
  exit: { opacity: 0, scale: 0.95 },
};

const FanFavouriteList = ({ fanFavourites = [], onEdit, onDelete }) => {
  if (fanFavourites.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10 text-lg">
        No fan favourites available.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-20 p-4 sm:p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-center text-sky-500 text-2xl sm:text-3xl font-extrabold mb-6 drop-shadow">
        🎬 Full Movie List
      </h3>

      <ul className="space-y-4 sm:space-y-5">
        <AnimatePresence>
          {fanFavourites.map((item, index) => (
            <motion.li
              key={item.id}
              custom={index}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardVariants}
              className="bg-gray-50 rounded-lg border p-4 hover:bg-white hover:shadow-xl transition-shadow transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-black font-semibold text-base truncate">{item.title}</p>
                  <p className="text-gray-600 text-xs mt-1">⭐ Rating: {item.rating}</p>
                  <p className="text-gray-600 text-xs mt-1 truncate">
                    🎭 Genres: {item.genres?.join(", ")}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap justify-center sm:justify-end gap-2 min-w-[120px]">
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded px-4 py-1.5 text-xs font-semibold shadow transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-1.5 text-xs font-semibold shadow transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default FanFavouriteList;
