import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const MoreCelebrityList = ({ moreCelebrities, onEdit, onDelete }) => {
  if (!moreCelebrities.length) {
    return (
      <p className="text-center text-gray-500 italic mt-8">
        No recommendation celebrities found.
      </p>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 mt-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-200">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 border-b border-indigo-300 pb-4 mb-8 select-none">
          🎭 Celebrity Recommendations
        </h2>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-8">
          {moreCelebrities.map((item, i) => (
            <article
              key={item.id}
              tabIndex={0}
              aria-label={`Celebrity ${item.name}, ID ${item.id}`}
              className={`group grid grid-cols-4 gap-4 p-5 rounded-2xl border transition-shadow duration-300 ${
                i % 2 === 0 ? "bg-indigo-50 border-indigo-200" : "bg-white border-gray-200"
              } shadow-sm hover:shadow-lg focus-within:shadow-lg focus:outline-none`}
            >
              {/* Image */}
              <div className="col-span-1 flex justify-center items-center">
                <img
                  src={item.img}
                  alt={`Photo of ${item.name}`}
                  className="rounded-xl object-cover shadow-md w-full max-w-[90px] h-24"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="col-span-3 grid grid-cols-2 gap-3 items-center">
                <div>
                  <h3 className="text-indigo-900 font-bold text-lg truncate">{item.name}</h3>
                  <p className="text-indigo-600 font-medium text-sm select-none">ID: {item.id}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-4">
                  <button
                    onClick={() => onEdit(item)}
                    aria-label={`Edit ${item.name}`}
                    title={`Edit ${item.name}`}
                    className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform group-hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
                  >
                    <Pencil className="w-5 h-5" />
                    <span className="hidden xs:inline">Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${item.name}"?`)) onDelete(item.id);
                    }}
                    aria-label={`Delete ${item.name}`}
                    title={`Delete ${item.name}`}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 focus:bg-red-800 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform group-hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span className="hidden xs:inline">Delete</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-200 mt-6 shadow-inner">
          <table className="min-w-[600px] w-full text-gray-800 text-left text-sm sm:text-base">
            <thead className="bg-indigo-50 text-indigo-900 text-xs sm:text-sm uppercase tracking-wide select-none">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">ID</th>
                <th className="px-6 py-4 whitespace-nowrap">Name</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Image</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {moreCelebrities.map((item, i) => (
                <tr
                  key={item.id}
                  className={`transition-colors duration-300 ${
                    i % 2 === 0 ? "bg-indigo-50" : "bg-white"
                  } hover:bg-indigo-100 focus-within:bg-indigo-100`}
                  tabIndex={0}
                  aria-label={`Celebrity ${item.name}, ID ${item.id}`}
                >
                  <td className="px-6 py-4 font-semibold">{item.id}</td>
                  <td className="px-6 py-4 font-semibold">{item.name}</td>
                  <td className="px-6 py-4 text-center">
                    <img
                      src={item.img}
                      alt={`Photo of ${item.name}`}
                      className="inline-block h-16 w-auto rounded-lg shadow-sm object-cover"
                      loading="lazy"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        onClick={() => onEdit(item)}
                        aria-label={`Edit ${item.name}`}
                        title={`Edit ${item.name}`}
                        className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition transform focus:outline-none focus:ring-4 focus:ring-indigo-400"
                      >
                        <Pencil className="w-5 h-5" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${item.name}"?`)) onDelete(item.id);
                        }}
                        aria-label={`Delete ${item.name}`}
                        title={`Delete ${item.name}`}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 focus:bg-red-800 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition transform focus:outline-none focus:ring-4 focus:ring-red-400"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MoreCelebrityList;
