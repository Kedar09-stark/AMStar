// src/components/CenteredMessage.jsx
import React from "react";

const CenteredMessage = ({ message, isError = false }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <p className={`text-lg ${isError ? "text-red-600" : "text-gray-700"}`} role="alert" aria-live="assertive">
      {message}
    </p>
  </div>
);

export default CenteredMessage;
