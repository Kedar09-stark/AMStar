import React from "react";

const MoreCelebrityList = ({ moreCelebrities, onEdit, onDelete }) => {
  if (!moreCelebrities.length) {
    return (
      <p className="text-center text-gray-500 italic mt-8">
        No recommendation celebrities found.
      </p>
    );
  }

  return (
    <>
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 mt-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-200">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 border-b border-indigo-300 pb-4 mb-6 select-none">
            🎭 Celebrity Recommendations
          </h2>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-[600px] w-full text-gray-800 text-left text-sm sm:text-base">
              <thead className="bg-indigo-50 text-indigo-900 text-xs sm:text-sm uppercase tracking-wide select-none">
                <tr>
                  <th className="px-5 py-4 whitespace-nowrap">ID</th>
                  <th className="px-5 py-4 whitespace-nowrap">Name</th>
                  <th className="px-5 py-4 whitespace-nowrap text-center">Image</th>
                  <th className="px-5 py-4 whitespace-nowrap text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {moreCelebrities.map((item, i) => (
                  <tr
                    key={item.id}
                    className={`transition-colors duration-300 ${
                      i % 2 === 0 ? "bg-indigo-50" : "bg-white"
                    } hover:bg-indigo-100 sm:table-row block rounded-lg sm:rounded-none mb-6 sm:mb-0 p-4 sm:p-0 shadow-sm sm:shadow-none`}
                  >
                    <td
                      data-label="ID"
                      className="px-0 sm:px-5 py-2 sm:py-3 text-center font-semibold sm:table-cell block rounded-t-lg"
                    >
                      <span className="font-semibold sm:hidden block text-indigo-700 uppercase tracking-wide mb-1">
                        ID
                      </span>
                      {item.id}
                    </td>
                    <td
                      data-label="Name"
                      className="px-0 sm:px-5 py-2 sm:py-3 font-semibold sm:table-cell block"
                    >
                      <span className="font-semibold sm:hidden block text-indigo-700 uppercase tracking-wide mb-1">
                        Name
                      </span>
                      {item.name}
                    </td>
                    <td
                      data-label="Image"
                      className="px-0 sm:px-5 py-2 sm:py-3 text-center sm:table-cell block"
                    >
                      <span className="font-semibold sm:hidden block text-indigo-700 uppercase tracking-wide mb-1">
                        Image
                      </span>
                      <img
                        src={item.img}
                        alt={item.name}
                        className="mx-auto h-16 w-auto object-cover rounded-lg shadow-sm"
                      />
                    </td>
                    <td
                      data-label="Actions"
                      className="px-0 sm:px-5 py-3 sm:py-3 text-center sm:table-cell block rounded-b-lg sm:rounded-none"
                    >
                      <span className="font-semibold sm:hidden block text-indigo-700 uppercase tracking-wide mb-3">
                        Actions
                      </span>
                      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
                        <button
                          onClick={() => onEdit(item)}
                          title={`Edit ${item.name}`}
                          aria-label={`Edit ${item.name}`}
                          className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 text-xs sm:text-sm min-w-[70px] justify-center"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you want to delete "${item.name}"?`
                              )
                            ) {
                              onDelete(item.id);
                            }
                          }}
                          title={`Delete ${item.name}`}
                          aria-label={`Delete ${item.name}`}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 text-xs sm:text-sm min-w-[70px] justify-center"
                        >
                          🗑️ Delete
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

      <style>{`
        @media (max-width: 640px) {
          table, thead, tbody, th, td, tr {
            display: block;
          }
          thead tr {
            display: none;
          }
          tbody tr {
            margin-bottom: 1rem;
            border-radius: 0.75rem;
            padding: 0;
            box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
            background-color: #fff;
            border: 1px solid #6366f1; /* Indigo-500 */
          }
          tbody td {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem 1rem;
            font-size: 1rem;
            border-bottom: 1px solid #a5b4fc; /* Indigo-300 */
            align-items: center;
          }
          tbody td:last-child {
            border-bottom: none;
            padding-bottom: 1rem;
          }
          tbody td span:first-child {
            font-weight: 700;
            color: #4338ca; /* Indigo-700 */
            text-transform: uppercase;
          }
        }
      `}</style>
    </>
  );
};

export default MoreCelebrityList;
