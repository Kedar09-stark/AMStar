import React from "react";
import { UserRound } from "lucide-react";

const UserList = ({ users }) => {
  if (!users || users.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg">🚫 No users found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-lg">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <UserRound className="text-blue-600" />
          User List
        </h2>
        <p className="text-sm text-gray-500 mt-1">Total users: {users.length}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left text-gray-700 uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user, index) => (
              <tr
                key={user._id || user.id || index} // ✅ Unique key fallback
                className="border-b hover:bg-blue-50 transition duration-200"
              >
                <td className="px-4 py-3 font-semibold">{index + 1}</td>
                <td className="px-4 py-3 whitespace-nowrap">{user.name || "N/A"}</td>
                <td className="px-4 py-3 break-all">{user.email || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
