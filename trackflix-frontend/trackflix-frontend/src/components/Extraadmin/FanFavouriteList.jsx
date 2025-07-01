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
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-5xl mx-auto mt-10 mb-20">
    <h3 className="text-3xl font-extrabold mb-8 text-center text-sky-500 drop-shadow">
        🎬 Full Movie List
      </h3>
      <ul className="space-y-4">
        <AnimatePresence>
          {fanFavourites.map((item, index) => (
            <motion.li
              key={item.id}
              custom={index}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardVariants}
              className="border p-5 rounded-lg bg-gray-50 hover:bg-white hover:shadow-xl transition-all flex justify-between items-center"
            >
              <div className="space-y-1 max-w-md">
                <p className="text-xl font-semibold text-gray-800 truncate">
                  {item.title}
                </p>
                <p className="text-sm text-gray-600">⭐ Rating: {item.rating}</p>
                <p className="text-sm text-gray-600 truncate">
                  🎭 Genres: {item.genres?.join(", ")}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-20 w-auto rounded-lg object-cover border"
                />
                <a
                  href={item.trailerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-sm whitespace-nowrap"
                >
                  Watch Trailer
                </a>
                <button
                  onClick={() => onEdit(item)}
                  className="px-4 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded shadow-md transition-transform hover:scale-105"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded shadow-md transition-transform hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default FanFavouriteList;
