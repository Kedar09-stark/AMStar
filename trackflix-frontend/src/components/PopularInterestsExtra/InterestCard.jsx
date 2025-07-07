import React from "react";
import { FaPlay } from "react-icons/fa";

const InterestCard = ({ item, onWatchTrailer, onAddToWatchlist, isMobile }) => {
  const cardWidth = isMobile ? "w-[55vw] max-w-[180px]" : "max-w-[220px] w-full";
  const imageHeight = isMobile ? "h-[220px]" : "h-[330px]";
  const fontSize = isMobile ? "text-sm" : "text-lg";
  const ratingSize = isMobile ? "text-xs" : "text-sm";
  const genreSize = isMobile ? "text-[10px]" : "text-xs";
  const buttonTextSize = isMobile ? "text-xs py-1" : "text-sm py-1.5";

  return (
    <div
      className={`flex-none relative group bg-black rounded-lg overflow-hidden shadow-lg border border-gray-700 cursor-pointer transition-transform duration-300 hover:scale-105 ${cardWidth}`}
    >
      <div className={`w-full overflow-hidden rounded ${imageHeight}`}>
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover object-top transition-all duration-300 ease-in-out group-hover:brightness-75 group-hover:scale-105"
          onError={(e) => (e.target.src = "/fallback.jpg")}
        />
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center p-3 text-center space-y-1">
        <h3 className={`font-semibold ${fontSize}`}>{item.title}</h3>
        <p className={`text-yellow-400 font-medium ${ratingSize}`}>⭐ {item.rating}</p>
        <p className={`italic text-cyan-200 ${genreSize}`}>{item.genres.join(", ")}</p>
        <div className="flex flex-col gap-1 w-full max-w-[160px] mt-2">
          <button
            onClick={() => onWatchTrailer(item.trailerLink)}
            className={`inline-flex justify-center items-center gap-1 bg-cyan-500 hover:bg-cyan-600 text-black rounded-md ${buttonTextSize} font-semibold transition`}
          >
            <FaPlay className="text-xs" /> Trailer
          </button>
          <button
            onClick={(e) => onAddToWatchlist(e, item)}
            className={`bg-yellow-500 text-black rounded ${buttonTextSize} hover:bg-yellow-600 transition`}
          >
            + Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterestCard;
