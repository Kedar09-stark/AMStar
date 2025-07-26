import React from "react";
import { FaPlay, FaPlus } from "react-icons/fa";

const Top10Card = ({ item, onTrailerOpen, onWatchlistAdd }) => {
  const handleImageError = (e) => {
    e.target.src = "/fallback.jpg";
  };

  return (
    <article
      className="relative bg-zinc-900 text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 
                 flex flex-col w-full h-full hover:scale-[1.02]"
    >
      {/* Image */}
      <div className="w-full h-40 bg-black overflow-hidden flex items-center justify-center">
        <img
          src={item.img}
          alt={item.title}
          onError={handleImageError}
          className="w-full h-full object-contain bg-black transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="text-base font-semibold truncate mb-1"
          title={item.title}
        >
          {item.title}
        </h3>

        <div className="text-xs text-gray-400 mb-2 truncate">
          {item.year || "N/A"} • {item.genres?.join(", ")}
        </div>

        <div className="flex items-center gap-1 text-sm font-medium text-yellow-400 mb-4">
          ⭐ {item.rating || "N/A"}
        </div>

        {/* Buttons */}
       
<div className="mt-auto flex gap-2">
  <button
    onClick={() => onTrailerOpen(item.trailer)}
    className="flex-1 flex items-center justify-center gap-1 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-lg shadow-sm hover:shadow-md transition text-[10px] md:text-sm"
  >
    <FaPlay className="text-[9px]" />
    <span>Trailer</span>
  </button>
  <button
    onClick={(e) => onWatchlistAdd(e, item)}
    className="flex-1 flex items-center justify-center gap-1 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-2 rounded-lg shadow-sm hover:shadow-md transition text-[10px] md:text-sm"
  >
    <FaPlus className="text-[9px]" />
    <span>Watchlist</span>
  </button>
</div>

      </div>

      {/* Rank Badge */}
      <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
        #{item.rank}
      </div>
    </article>
  );
};

export default Top10Card;
