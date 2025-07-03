import React from "react";

const Quiz = ({ question, selectedAnswers, onAnswer, onNext, onBack }) => {
  const { id, title, options, multiple } = question;
  const selected = selectedAnswers[id] || (multiple ? [] : "");

  return (
    <section aria-live="polite" aria-atomic="true">
      <h3 className="text-xl font-semibold mb-4 text-yellow-300">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt, idx) => {
          const isSelected = multiple
            ? selected.includes(opt)
            : selected === opt;
          return (
            <button
              key={idx}
              type="button"
              aria-pressed={isSelected}
              className={`border border-yellow-500 px-4 py-2 rounded mb-2 hover:bg-yellow-700 hover:text-gray-900 focus:outline-none ${
                isSelected
                  ? "bg-yellow-500 text-gray-900"
                  : "text-yellow-200"
              }`}
              onClick={() => onAnswer(id, opt)}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex justify-between">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="underline text-sm text-yellow-400"
          >
            ⬅ Back
          </button>
        )}
        {multiple && (
          <button
            type="button"
            onClick={onNext}
            disabled={!selected.length}
            className={`font-semibold px-6 py-2 rounded ${
              !selected.length
                ? "bg-yellow-300 cursor-not-allowed text-gray-900"
                : "bg-yellow-500 hover:bg-yellow-600 text-gray-900"
            }`}
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default Quiz;
