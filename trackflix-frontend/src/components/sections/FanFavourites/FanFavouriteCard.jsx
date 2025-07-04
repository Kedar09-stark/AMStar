import React from "react";
import { motion } from "framer-motion";

const FanFavouriteCard = ({
  item,
  index,
  isFlipped,
  setFlippedCard,
  openTrailer,
  handleWatchlistClick,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      setFlippedCard(isFlipped ? null : index);
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
      onClick={() => setFlippedCard(isFlipped ? null : index)}
      onKeyDown={handleKeyDown}
      className="relative flex-shrink-0 w-[140px] sm:w-[180px] md:w-[200px] lg:w-[220px] h-[280px] sm:h-[300px] md:h-[340px]"
      style={{
        outline: "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onFocus={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.4)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0, scale: isFlipped ? 1.05 : 1 }}
        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="relative w-full h-full rounded-lg shadow-lg"
        style={{ cursor: "pointer", transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute w-full h-full rounded-lg overflow-hidden bg-zinc-800"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <img
            src={item.img}
            alt={`Movie poster of ${item.title}`}
            loading="lazy"
            onError={(e) => (e.target.src = "/fallback.jpg")}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div
            className="absolute bottom-0 w-full px-2 py-2 text-white text-center text-sm rounded-b-lg"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
            }}
          >
            {item.title}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full rounded-lg bg-zinc-900 p-4 flex flex-col justify-center items-center text-sm text-center shadow-xl"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <h3 className="font-bold text-lg">{item.title}</h3>
          <p className="text-yellow-400 mt-1 text-md">⭐ {item.rating}/10</p>
          <div className="flex flex-wrap justify-center gap-2 mt-3 text-xs text-gray-300">
            {item.genres.map((genre, idx) => (
              <span
                key={idx}
                className="bg-gray-700 px-3 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 w-full max-w-[160px] mx-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openTrailer(item.trailerLink);
              }}
              className="w-full bg-cyan-500 text-black px-4 py-2 rounded hover:bg-cyan-600 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-cyan-400"
              aria-label={`Watch trailer for ${item.title}`}
            >
              Watch Trailer
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleWatchlistClick(e, item);
              }}
              className="w-full bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-400"
            >
              + Watchlist
            </button>
          </div>
          <div aria-live="polite" className="sr-only">
            {isFlipped
              ? `${item.title} details shown`
              : `${item.title} poster shown`}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FanFavouriteCard;
