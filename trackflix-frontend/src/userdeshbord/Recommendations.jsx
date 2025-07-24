import React, { useState } from "react";
import { quizQuestions } from "./Recommendationsextrasuser/constants";
import { fetchMovies } from "./Recommendationsextrasuser/fetchMovies";
import Quiz from "./Recommendationsextrasuser/Quiz";
import MovieRecommendation from "./Recommendationsextrasuser/MovieRecommendation";
import { motion, AnimatePresence } from "framer-motion";

const Recommendations = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnswer = (key, value) => {
    const question = quizQuestions.find((q) => q.id === key);
    if (!question) return;

    if (question.multiple) {
      setQuizAnswers((prev) => {
        const current = prev[key] || [];
        return {
          ...prev,
          [key]: current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value],
        };
      });
    } else {
      setQuizAnswers((prev) => ({ ...prev, [key]: value }));
    }
  };

  const resetQuiz = () => {
    setQuizMode(false);
    setQuizStep(0);
    setQuizAnswers({});
    setRecommendedMovie(null);
    setError(null);
  };

  const getRecommendation = async () => {
    setLoading(true);
    setError(null);
    setRecommendedMovie(null);

    try {
      const selectedGenres =
        quizAnswers.genres && quizAnswers.genres.length > 0
          ? quizAnswers.genres
          : ["Action"];

      let allMovies = [];

      for (const genre of selectedGenres) {
        const data = await fetchMovies(genre);
        if (data?.Response === "True") {
          allMovies.push(...data.Search);
        }
      }

      const uniqueMovies = Object.values(
        allMovies.reduce((acc, movie) => {
          acc[movie.imdbID] = movie;
          return acc;
        }, {})
      );

      if (uniqueMovies.length === 0) {
        setError("No movies found based on your preferences.");
        return;
      }

      const randomMovie =
        uniqueMovies[Math.floor(Math.random() * uniqueMovies.length)];

      setRecommendedMovie({
        id: randomMovie.imdbID,
        title: randomMovie.Title,
        image: randomMovie.Poster !== "N/A" ? randomMovie.Poster : null,
        genres: selectedGenres,
        rating: parseFloat((Math.random() * 4.9 + 5).toFixed(1)),
      });
    } catch {
      setError("Something went wrong while fetching recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-tr from-[#0e0e0e] via-[#1b1b1b] to-[#111] flex items-center justify-center px-4 py-8 font-sans overflow-x-hidden">
      <motion.div
        className="max-w-full sm:max-w-5xl w-full rounded-3xl shadow-2xl border border-gray-700 bg-black/30 backdrop-blur-md p-4 sm:p-10 text-white relative"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          {!quizMode ? (
            <motion.section
              key="start"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg">
                🎬 Movie Matcher AI
              </h1>
              <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Let AI pick a movie just for you. Answer a few fun questions and
                discover your perfect watch tonight.
              </p>
              <motion.button
                onClick={() => setQuizMode(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-full text-lg shadow-lg transition-transform hover:scale-105 w-full sm:w-auto"
                whileTap={{ scale: 0.95 }}
              >
                🚀 Start Recommendation Quiz
              </motion.button>
            </motion.section>
          ) : quizStep < quizQuestions.length ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="overflow-y-auto max-h-[calc(100vh-100px)]"
            >
              <Quiz
                question={quizQuestions[quizStep]}
                selectedAnswers={quizAnswers}
                onAnswer={handleAnswer}
                onNext={() => setQuizStep((prev) => prev + 1)}
                onBack={() => {
                  if (quizStep === 0) {
                    setQuizMode(false);
                  } else {
                    setQuizStep((prev) => prev - 1);
                  }
                }}
                progress={((quizStep + 1) / quizQuestions.length) * 100}
                quizStep={quizStep}
              />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <MovieRecommendation
                movie={recommendedMovie}
                loading={loading}
                error={error}
                onGetAnother={getRecommendation}
                onReset={resetQuiz}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
};

export default Recommendations;
