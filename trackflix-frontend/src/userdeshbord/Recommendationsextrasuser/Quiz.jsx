import React from "react";
import { motion } from "framer-motion";

const Quiz = ({ question, selectedAnswers, onAnswer, onNext, onBack, progress, quizStep }) => {
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
      className="w-full max-w-3xl mx-auto p-6 md:p-10 rounded-3xl bg-gradient-to-br from-gray-900 to-black shadow-2xl border border-yellow-400/10"
      aria-labelledby={`question-${id}`}
      aria-live="polite"
    >
      {/* Progress Bar */}
      {progress !== undefined && (
        <div className="mb-6">
          <div className="text-sm text-yellow-300 mb-1 font-medium tracking-wide">Progress: {Math.floor(progress)}%</div>
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

      {/* Question Title */}
      <h2 id={`question-${id}`} className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6 drop-shadow-sm leading-snug">
        {title}
      </h2>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {options.map((opt, idx) => {
          const isOptSelected = multiple ? selected.includes(opt) : selected === opt;

          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              aria-pressed={isOptSelected}
              onClick={() => onAnswer(id, opt)}
              className={`backdrop-blur-sm bg-gray-800/60 border-2 rounded-xl px-6 py-5 text-lg font-medium shadow-md transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                isOptSelected
                  ? "border-yellow-400 text-yellow-100 bg-yellow-500/20"
                  : "border-gray-700 text-yellow-200 hover:border-yellow-400"
              }`}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <motion.button
          type="button"
          onClick={onBack}
          disabled={quizStep === 0}
          className={`px-6 py-3 text-md rounded-full font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
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
          className={`px-6 py-3 text-md rounded-full font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
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
