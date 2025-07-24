import React from "react";
import { motion } from "framer-motion";

const Quiz = ({
  question,
  selectedAnswers,
  onAnswer,
  onNext,
  onBack,
  progress,
  quizStep,
}) => {
  const { id, title, options, multiple } = question;
  const selected = selectedAnswers[id] || (multiple ? [] : "");
  const isSelected = multiple ? selected.length > 0 : selected !== "";

  return (
    <motion.section
      key={id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-full sm:max-w-3xl mx-auto px-3 sm:px-6 py-6 sm:p-10 rounded-3xl bg-gradient-to-br from-gray-900 to-black shadow-2xl border border-yellow-400/10"
      aria-labelledby={`question-${id}`}
      aria-live="polite"
    >
      {/* Progress */}
      {progress !== undefined && (
        <div className="mb-6 sticky top-0 z-10 bg-black/80 backdrop-blur-md rounded-md p-2">
          <div className="text-sm text-yellow-300 mb-1 font-medium">
            Progress: {Math.floor(progress)}%
          </div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      )}

      {/* Question */}
      <h2
        id={`question-${id}`}
        className="text-lg sm:text-3xl font-bold text-yellow-300 mb-6 text-center sm:text-left leading-snug"
      >
        {title}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 mb-8">
        {options.map((opt, idx) => {
          const isOptSelected = multiple
            ? selected.includes(opt)
            : selected === opt;

          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              aria-pressed={isOptSelected}
              onClick={() => onAnswer(id, opt)}
              className={`w-full text-left px-5 py-4 text-sm sm:text-lg rounded-xl font-medium transition-all shadow-md border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                isOptSelected
                  ? "border-yellow-400 text-yellow-100 bg-yellow-500/20"
                  : "border-gray-700 text-yellow-200 hover:border-yellow-400 bg-gray-800/60"
              }`}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mt-4">
        <motion.button
          type="button"
          onClick={onBack}
          disabled={quizStep === 0}
          className={`w-full sm:w-auto px-6 py-3 text-sm sm:text-base rounded-full font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
            quizStep === 0
              ? "bg-gray-700 cursor-not-allowed text-gray-400"
              : "bg-yellow-500 hover:bg-yellow-600 text-black hover:scale-105"
          }`}
          aria-disabled={quizStep === 0}
          whileTap={{ scale: 0.95 }}
        >
          ⬅ Back
        </motion.button>

        <motion.button
          type="button"
          onClick={onNext}
          disabled={!isSelected}
          className={`w-full sm:w-auto px-6 py-3 text-sm sm:text-base rounded-full font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
            !isSelected
              ? "bg-gray-700 cursor-not-allowed text-gray-400"
              : "bg-yellow-500 hover:bg-yellow-600 text-black hover:scale-105"
          }`}
          aria-disabled={!isSelected}
          whileTap={{ scale: 0.95 }}
        >
          Next ➡
        </motion.button>
      </div>
    </motion.section>
  );
};

export default Quiz;
