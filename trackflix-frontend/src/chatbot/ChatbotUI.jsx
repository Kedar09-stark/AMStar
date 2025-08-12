import React, { useState, useEffect } from "react";

export default function ChatbotUI({ messages, input, setInput, loading, fetchResults, messagesEndRef }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    fetchResults();
  };

  return (
    <>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Chatbot"
          className="
            fixed bottom-2 right-2
            w-9 h-9 sm:w-14 sm:h-14
            rounded-full bg-black
            shadow-lg animate-pulseGlow
            transform transition-transform duration-300
            sm:hover:scale-105 focus:outline-none
            z-50 flex items-center justify-center
          "
        >
          <video
            src="https://cdn.dribbble.com/userupload/5114473/file/large-d4fe9a4a9260f5de3208a7c887af712e.mp4"
            autoPlay loop muted playsInline
            className="w-full h-full object-cover rounded-full pointer-events-none select-none"
          />
        </button>
      ) : (
        <div
          className="
            fixed bottom-2 right-2
            flex flex-col
            bg-gray-900 text-white
            rounded-lg shadow-xl
            w-[70vw] sm:w-[80vw] max-w-[260px]
            h-[50vh] sm:h-[55vh]
            z-50
          "
        >
          {/* Header */}
          <div className="flex justify-between items-center bg-gradient-to-br from-red-600 to-red-700 px-2 py-1 rounded-t-lg font-semibold text-xs">
            Chatbot
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Chatbot"
              className="text-white text-lg font-bold focus:outline-none"
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-800 text-[10px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-2 py-1 rounded-md break-words
                  ${msg.sender === "user" ? "bg-blue-600 ml-auto text-right" : "bg-gray-700"}
                `}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-1 px-2 py-2 bg-gray-900 rounded-b-lg border-t border-gray-700"
          >
            <input
              type="text"
              placeholder="Ask..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="
                flex-grow bg-gray-800 text-white
                rounded-full px-2 py-1
                placeholder-gray-400
                focus:outline-none focus:ring-1 focus:ring-red-600
                text-[10px]
              "
            />
            <button
              type="submit"
              disabled={loading}
              className="
                bg-red-600 sm:hover:bg-red-700
                disabled:opacity-50 disabled:cursor-not-allowed
                text-white rounded-full
                p-1 w-7 h-7 flex items-center justify-center
                text-xs
                transition focus:outline-none focus:ring-1 focus:ring-red-600
              "
            >
              {loading ? "…" : "➤"}
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 3px rgba(255, 76, 76, 0.7); }
          50% { box-shadow: 0 0 8px rgba(255, 76, 76, 1); }
        }
        .animate-pulseGlow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
