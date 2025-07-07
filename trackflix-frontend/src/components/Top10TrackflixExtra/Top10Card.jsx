import React from "react";
import { FaPlay, FaPlus } from "react-icons/fa";

const Top10Card = ({ item, onTrailerOpen, onWatchlistAdd }) => {
  const handleImageError = (e) => {
    e.target.src = "/fallback.jpg";
  };

  return (
    <article
      className="relative rounded-xl overflow-hidden bg-zinc-800 hover:shadow-2xl transition-shadow duration-300 flex flex-col"
    >
      <div className="w-full aspect-[2/3] bg-black overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
          className="object-cover w-full h-full"
          onError={handleImageError}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="text-lg font-semibold text-white mb-1 truncate"
          title={item.title}
        >
          {item.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
          <time dateTime={item.year}>{item.year}</time>
          <span className="bg-yellow-400 text-black font-bold px-2 py-0.5 rounded">
            ⭐ {item.rating}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-auto text-sm">
          <button
            onClick={() => onTrailerOpen(item.trailer)}
            className="flex items-center justify-center gap-2 border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
            aria-label={`Watch trailer for ${item.title}`}
          >
            <FaPlay className="text-xs" />
            Trailer
          </button>
          <button
            type="button"
            onClick={(e) => onWatchlistAdd(e, item)}
            className="flex items-center justify-center gap-2 border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
            aria-label={`Add ${item.title} to watchlist`}
          >
            <FaPlus className="text-xs" />
            Watchlist
          </button>
        </div>
      </div>
      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
        #{item.rank}
      </div>
    </article>
  );
};

export default Top10Card;
