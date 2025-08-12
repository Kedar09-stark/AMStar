import React, { useState } from "react";

export default function ChatbotUI({
  messages,
  input,
  setInput,
  loading,
  fetchResults,
  messagesEndRef,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="button"
        tabIndex={0}
        aria-label="Open Movie Chatbot"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(true);
        }}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: hovered
            ? "0 6px 20px rgba(255, 76, 76, 0.9), 0 0 30px rgba(255, 76, 76, 0.9)"
            : "0 4px 15px rgba(255, 76, 76, 0.7), 0 0 15px rgba(255, 76, 76, 0.9)",
          cursor: "pointer",
          userSelect: "none",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          zIndex: 9999,
          backgroundColor: "#000",
          animation: "pulseGlow 3s ease-in-out infinite",
        }}
      >
        <video
          src="https://cdn.dribbble.com/userupload/5114473/file/large-d4fe9a4a9260f5de3208a7c887af712e.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        <style>
          {`
            @keyframes pulseGlow {
              0%, 100% {
                box-shadow:
                  0 4px 15px rgba(255, 76, 76, 0.7),
                  0 0 15px rgba(255, 76, 76, 0.9);
              }
              50% {
                box-shadow:
                  0 6px 25px rgba(255, 76, 76, 1),
                  0 0 30px rgba(255, 76, 76, 1);
              }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 360,
        maxHeight: 520,
        backgroundColor: "#222",
        borderRadius: 16,
        boxShadow: "0 0 20px rgba(255,76,76,0.8)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 9999,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #ff4c4c, #d13232)",
          padding: "14px 20px",
          fontWeight: "700",
          fontSize: 18,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          userSelect: "none",
          color: "white",
          boxShadow: "0 2px 8px rgba(255, 76, 76, 0.7)",
        }}
      >
        Trackflix Chatbot
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: 22,
              cursor: "pointer",
              lineHeight: 1,
              padding: 0,
              userSelect: "none",
            }}
            title="Close Chat"
            aria-label="Close chat"
          >
            ✕
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: 20,
              cursor: "pointer",
              lineHeight: 1,
              padding: 0,
              userSelect: "none",
            }}
            title="Reset chat"
            aria-label="Reset chat"
          >
            ⟳
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: "15px 20px",
          overflowY: "auto",
          backgroundColor: "#181818",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: msg.sender === "user" ? "#0d6efd" : "#444",
                padding: "10px 16px",
                borderRadius: 20,
                maxWidth: "80%",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                boxShadow:
                  msg.sender === "user"
                    ? "0 2px 8px rgba(13, 110, 253, 0.6)"
                    : "0 2px 8px rgba(68, 68, 68, 0.7)",
                fontSize: 15,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchResults();
        }}
        style={{
          display: "flex",
          borderTop: "1px solid #444",
          backgroundColor: "#111",
          padding: "12px 15px",
          gap: 10,
        }}
      >
        <input
          type="text"
          placeholder="Ask me anything about movies or shows..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "12px 18px",
            border: "none",
            outline: "none",
            fontSize: 15,
            backgroundColor: "#222",
            color: "white",
            borderRadius: 24,
            userSelect: "text",
          }}
          aria-label="Chat input"
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#ff4c4c",
            border: "none",
            color: "white",
            padding: "12px 25px",
            fontWeight: "600",
            fontSize: 15,
            borderRadius: 24,
            cursor: loading ? "not-allowed" : "pointer",
            userSelect: "none",
            transition: "background-color 0.3s ease",
          }}
          aria-label="Send message"
        >
          {loading ? "Searching..." : "Send"}
        </button>
      </form>
    </div>
  );
}
