// src/components/UserHeader.jsx
import React from "react";

const UserHeader = ({ user, watchlistCount }) => (
  <header className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">Welcome, {user.displayName || "User"} 🎬</h1>
      <p className="text-gray-600 mt-2">{user.email}</p>
    </div>
    <div className="text-center sm:text-right">
      <p className="text-gray-700 text-lg">Watchlist Count:</p>
      <p className="text-2xl font-semibold text-indigo-600">{watchlistCount}</p>
    </div>
  </header>
);

export default UserHeader;
