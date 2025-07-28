import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
  exit: { opacity: 0, scale: 0.95 },
};

const FTRecommendationsList = ({ ftRecommendations, onEdit, onDelete }) => {
  if (!ftRecommendations.length) {
    return (
      <p className="text-center text-gray-400 mt-10 text-lg">
        No recommendations found.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        🎬 Featured Recommendations
      </h2>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-6">
        <AnimatePresence>
          {ftRecommendations.map((item, index) => (
            <motion.div
              key={item.id}
              variants={rowVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl shadow-md p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-indigo-700">{item.title}</h3>
                <span className="text-yellow-600 font-semibold">{item.rating}⭐</span>
              </div>
              <img
  src={item.img}
  alt={item.title}
  className="w-16 h-16 object-cover rounded"
/>

              <p className="text-sm text-gray-600">
                🎭 Genres: {item.genres.join(", ")}
              </p>
              <a
                href={item.trailerLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                ▶️ Watch Trailer
              </a>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => onEdit(item)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded text-sm font-medium transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm font-medium transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop/Tablet Table */}
      <div className="hidden lg:block overflow-x-auto mt-10">
        <motion.table
          initial="hidden"
          animate="visible"
          className="w-full table-auto border-separate border-spacing-y-3"
        >
          <thead>
            <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-sm">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-left">Genres</th>
              <th className="px-4 py-3 text-left">Trailer</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {ftRecommendations.map((item, index) => (
                <motion.tr
                  key={item.id}
                  variants={rowVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white shadow hover:shadow-md transition rounded-lg"
                >
                  <td className="px-4 py-3 text-sm font-mono">{item.id}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                    {item.title}
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-24 h-14 rounded-lg object-cover border"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-yellow-600 font-bold">
                    {item.rating}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-[180px] truncate">
                    {item.genres.join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={item.trailerLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Watch
                    </a>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm font-medium shadow"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium shadow"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default FTRecommendationsList;
