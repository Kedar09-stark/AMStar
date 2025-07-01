import React from "react";
import { UsersIcon } from "lucide-react"; // Lucide for clean icons
import UserList from "../Extraadmin/UserList";

const UsersTab = ({ users }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6 border-b pb-3">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <UsersIcon className="w-7 h-7 text-blue-600" />
          All Users
        </h2>
        <span className="text-sm text-gray-500">{users.length} total</span>
      </div>

      <div className="overflow-x-auto">
        <UserList users={users} />
      </div>
    </div>
  );
};

export default UsersTab;
