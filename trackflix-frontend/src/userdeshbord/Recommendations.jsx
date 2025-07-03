import React, { useState } from "react";
import { quizQuestions } from "./Recommendationsextrasuser/constants";
import { fetchMovies } from "./Recommendationsextrasuser/fetchMovies";
import Quiz from "./Recommendationsextrasuser/Quiz";
import MovieRecommendation from "./Recommendationsextrasuser/MovieRecommendation";

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
        if (current.includes(value)) {
          return { ...prev, [key]: current.filter((v) => v !== value) };
        } else {
          return { ...prev, [key]: [...current, value] };
        }
      });
    } else {
      setQuizAnswers((prev) => ({ ...prev, [key]: value }));
      setQuizStep((prev) => prev + 1);
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
        if (data && data.Response === "True") {
          allMovies.push(...data.Search);
        }
      }

      const uniqueMoviesMap = {};
      allMovies.forEach((m) => {
        uniqueMoviesMap[m.imdbID] = m;
      });

      const uniqueMovies = Object.values(uniqueMoviesMap);

      if (uniqueMovies.length === 0) {
        setError("No movies found based on your genre preferences.");
        setLoading(false);
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
      setError("Failed to fetch recommendation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen">
      {!quizMode ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">
            🎬 Movie Recommendation Engine
          </h2>
          <p className="mb-4">
            Can’t decide what to watch? Answer 6 questions and let us pick a
            movie for you!
          </p>
          <button
            onClick={() => setQuizMode(true)}
            className="bg-yellow-500 text-gray-900 px-6 py-3 rounded hover:bg-yellow-600 font-semibold"
          >
            Start Now
          </button>
        </div>
      ) : quizStep < quizQuestions.length ? (
        <Quiz
          question={quizQuestions[quizStep]}
          selectedAnswers={quizAnswers}
          onAnswer={handleAnswer}
          onNext={() => setQuizStep((prev) => prev + 1)}
          onBack={quizStep > 0 ? () => setQuizStep((prev) => prev - 1) : null}
        />
      ) : (
        <MovieRecommendation
          movie={recommendedMovie}
          loading={loading}
          error={error}
          onGetAnother={getRecommendation}
          onReset={resetQuiz}
        />
      )}
    </div>
  );
};

export default Recommendations;

