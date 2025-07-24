// src/components/UserHeader.jsx
import React from "react";
import { FaEnvelope, FaListUl } from "react-icons/fa";

const UserHeader = ({ user, watchlistCount }) => {
  return (
    <header className="w-full px-4 py-6 rounded-xl bg-white/80 backdrop-blur-md shadow-md border border-white/30 mb-10">
      <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
        {/* User Info */}
        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 leading-tight">
            Welcome, {user.displayName || "User"} 🎬
          </h1>
          <p className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-gray-600">
            <FaEnvelope className="text-gray-500" />
            <span className="break-all">{user.email}</span>
          </p>
        </div>

        {/* Watchlist Info */}
        <div className="text-center sm:text-right">
          <p className="flex items-center justify-center sm:justify-end gap-2 text-sm text-gray-700">
            <FaListUl className="text-indigo-600" />
            <span>Watchlist Count:</span>
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-700 mt-1">
            {watchlistCount}
          </p>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
