import React from "react";

const TrailerModal = ({ trailerUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm p-6 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-5xl aspect-video bg-black rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-cyan-800 bg-opacity-70 rounded-full p-2 hover:bg-red-600 transition-colors z-10"
          aria-label="Close trailer"
        >
          ×
        </button>
        <iframe
          className="w-full h-full"
          src={trailerUrl}
          title="Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;
