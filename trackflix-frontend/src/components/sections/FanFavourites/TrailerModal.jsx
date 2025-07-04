//trailer modal UI
import React from "react";

const TrailerModal = ({ showTrailer, setShowTrailer, currentTrailerUrl }) => {
  if (!showTrailer) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm p-6 animate-fadeIn"
      onClick={() => setShowTrailer(false)}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={(e) => e.key === "Escape" && setShowTrailer(false)}
    >
      <div
        className="relative w-full max-w-5xl aspect-video bg-black rounded-xl shadow-2xl overflow-hidden outline-none"
        onClick={(e) => e.stopPropagation()}
        tabIndex={0}
      >
        <button
          onClick={() => setShowTrailer(false)}
          className="absolute top-3 right-3 text-white bg-cyan-800 bg-opacity-70 rounded-full p-2 hover:bg-red-600 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label="Close trailer"
        >
          ×
        </button>
        <iframe
          className="w-full h-full"
          src={currentTrailerUrl}
          title="Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default TrailerModal;