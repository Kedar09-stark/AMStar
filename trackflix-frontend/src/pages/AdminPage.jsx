// src/pages/AdminPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear(); // Clear admin/user flags
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-yellow-600">Admin Dashboard 👑</h1>
      <p className="mb-8">Welcome, Admin! You have full access.</p>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPage;