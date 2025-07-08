// src/components/LiveDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaStar,
  FaFilm,
  FaCalendarAlt,
  FaClock,
  FaLanguage,
  FaGlobeAmericas,
  FaMoneyBillWave,
  FaUserTie,
  FaPenFancy,
  FaUsers,
  FaBuilding,
  FaAward,
  FaArrowLeft,
  FaRedoAlt,
} from "react-icons/fa";
import { containerVariants, itemVariants } from "../animations/MDanimation";
import { useLiveShowDetails } from "../hooks/useLiveShowDetails";

const LiveDetails = () => {
  const { id } = useParams();
  const { movie, loading, error, refetch } = useLiveShowDetails(id);

  const youtubeId = movie?.trailer ? new URL(movie.trailer).searchParams.get("v") : null;

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorFallback message={error} onRetry={refetch} />;
  if (!movie) return <p className="text-center text-gray-400 mt-20 text-lg">No data available.</p>;

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen p-6 md:p-12 text-gray-100 font-sans max-w-7xl mx-auto">
      <Link to="/tvshows" className="inline-flex items-center gap-2 mb-10 mt-12 text-yellow-400 hover:text-yellow-300 font-semibold text-lg">
        <FaArrowLeft /> Back to TV Shows
      </Link>

      <motion.div className="flex flex-col md:flex-row gap-12" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.img
          src={movie.image}
          alt={`Poster of ${movie.title}`}
          className="w-full max-w-sm rounded-2xl shadow-2xl object-cover ring-1 ring-yellow-400"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 250 }}
          loading="lazy"
        />

        <motion.div className="flex-1 flex flex-col justify-between" variants={itemVariants}>
          <article>
            <motion.h1
              className="text-5xl font-extrabold mb-6 tracking-tight text-yellow-400 drop-shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05, textShadow: "0 0 15px rgba(255,255,0,0.9)" }}
            >
              {movie.title}
            </motion.h1>

            <p className="text-lg text-gray-300 italic mb-8 leading-relaxed select-text">{movie.overview}</p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-400"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2, ease: "easeOut", duration: 0.6 } },
              }}
            >
              <InfoItem icon={<FaStar />} label="Rating" value={movie.rating || "N/A"} />
              <InfoItem icon={<FaFilm />} label="Genres" value={movie.genres?.join(", ")} />
              <InfoItem icon={<FaCalendarAlt />} label="Release Date" value={movie.releaseDate} />
              <InfoItem icon={<FaClock />} label="Runtime" value={movie.runtime ? `${movie.runtime} min` : "N/A"} />
              <InfoItem icon={<FaLanguage />} label="Language" value={movie.language} />
              <InfoItem icon={<FaGlobeAmericas />} label="Country" value={movie.country} />
              <InfoItem icon={<FaMoneyBillWave />} label="Budget" value={movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"} />
              <InfoItem icon={<FaMoneyBillWave />} label="Box Office" value={movie.boxOffice ? `$${movie.boxOffice.toLocaleString()}` : "N/A"} />
              <InfoItem icon={<FaUserTie />} label="Director" value={movie.director} />
              <InfoItem icon={<FaPenFancy />} label="Writers" value={movie.writers?.join(", ")} />
              <InfoItem icon={<FaUsers />} label="Cast" value={movie.cast?.join(", ")} />
              <InfoItem icon={<FaBuilding />} label="Production" value={movie.productionCompanies?.join(", ")} />
              <InfoItem icon={<FaStar />} label="Age Rating" value={movie.ageRating || "N/A"} />
            </motion.div>
          </article>

          {Array.isArray(movie.awards) && movie.awards.length > 0 && (
            <motion.section className="mt-14" variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-5 text-yellow-400 flex items-center gap-3 drop-shadow-md">
                <FaAward /> Awards
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-400 text-lg select-text">
                {movie.awards.map((award, i) => (
                  <li key={i}>
                    <span className="font-semibold text-gray-100">{award.name}</span> ({award.year}) —{" "}
                    {award.category} ({award.result})
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {movie.awardsText && (
            <motion.section className="mt-14" variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-5 text-yellow-400 flex items-center gap-3 drop-shadow-md">
                <FaAward /> Awards
              </h2>
              <p className="text-lg text-gray-300 italic">{movie.awardsText}</p>
            </motion.section>
          )}
        </motion.div>
      </motion.div>

      {youtubeId && (
        <motion.section
          className="mt-20 max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-yellow-400"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold mb-8 text-center text-yellow-400 drop-shadow-lg">🎥 Trailer</h2>
          <div className="aspect-video w-full bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
              frameBorder={0}
            />
          </div>
        </motion.section>
      )}
    </section>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <motion.div
    className="flex items-center gap-3 text-lg hover:text-yellow-400 cursor-default transition-colors select-text"
    variants={itemVariants}
    whileHover={{ scale: 1.05 }}
  >
    <span className="text-yellow-400 text-xl flex-shrink-0">{icon}</span>
    <span className="font-semibold">{label}:</span>
    <span className="ml-auto text-gray-300">{value || "N/A"}</span>
  </motion.div>
);

const LoadingSkeleton = () => (
  <section className="max-w-7xl mx-auto p-8 bg-gray-800 rounded-lg animate-pulse flex flex-col md:flex-row gap-12 min-h-[400px]">
    <div className="bg-gray-700 rounded-xl w-full max-w-sm h-96" />
    <div className="flex-1 space-y-6">
      <div className="h-12 bg-gray-700 rounded w-3/4" />
      <div className="h-6 bg-gray-700 rounded w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-6 bg-gray-700 rounded" />
        ))}
      </div>
    </div>
  </section>
);

const ErrorFallback = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-[300px] text-center text-red-500 space-y-6 p-6">
    <p className="text-xl font-semibold">Oops! {message}</p>
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
      <FaRedoAlt /> Retry
    </button>
  </div>
);

export default LiveDetails;
