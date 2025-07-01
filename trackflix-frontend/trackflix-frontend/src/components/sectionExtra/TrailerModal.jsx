// src/components/watchlist/TrailerModal.jsx
import React, { useEffect, useRef } from "react";

const TrailerModal = ({ embedUrl, title, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    if (modalRef.current) modalRef.current.focus();
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-md p-6 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trailer-title"
    >
      <div
        className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden outline-none"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        ref={modalRef}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-zinc-800 bg-opacity-80 rounded-full p-3 hover:bg-red-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 z-10"
          aria-label="Close trailer"
        >
          ×
        </button>

        <iframe
          className="w-full h-full"
          src={`${embedUrl}?autoplay=1&controls=1&modestbranding=1`}
          title={`${title} Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default TrailerModal;
