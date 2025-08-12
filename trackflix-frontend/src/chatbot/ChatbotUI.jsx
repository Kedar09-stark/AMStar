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

 const isMobile = window.innerWidth <= 600; // detects small screens

const styles = {
  floatingButton: {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: "50%",
    overflow: "hidden",
    cursor: "pointer",
    userSelect: "none",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    transform: hovered ? "scale(1.15)" : "scale(1)",
    zIndex: 9999,
    backgroundColor: "#000",
    animation: "pulseGlow 3s ease-in-out infinite",
  },
  chatContainer: {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: isMobile ? 200 : 360, 
    backgroundColor: "#222",
    borderRadius: 16,
    boxShadow: "0 0 20px rgba(255,76,76,0.8)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 9999,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
};

  if (!isOpen) {
    return (
      <>
        <div
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={styles.floatingButton}
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
        </div>
       <style>
  {`
    @media (max-width: 600px) {
  .chat-container {
    width: 50% !important;       /* very narrow */
    height: 35% !important;      /* short height */
    right: 5% !important;        /* close to the right edge */
    bottom: 5% !important;       /* close to the bottom */
    font-size: 8px !important;   /* tiny font */
    border-radius: 6px !important;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0,0,0,0.3);
  }

  .chat-header {
    font-size: 9px !important;
    padding: 2px 4px !important;
  }

  .chat-message {
    font-size: 8px !important;
    padding: 1px 3px !important;
    line-height: 1.1 !important;
  }

  .chat-input {
    font-size: 8px !important;
    padding: 1px 3px !important;
    height: 20px !important;
  }

  .chat-send {
    font-size: 8px !important;
    padding: 1px 3px !important;
  }
}

  `}
</style>


      </>
    );
  }

  return (
    <div className="chat-container" style={styles.chatContainer}>
      {/* Header */}
      <div
        className="chat-header"
        style={{
          background: "linear-gradient(135deg, #ff4c4c, #d13232)",
          padding: "14px 20px",
          fontWeight: "700",
          fontSize: 18,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
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
                fontSize: 15,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
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
          className="chat-input"
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "12px 18px",
            border: "none",
            outline: "none",
            backgroundColor: "#222",
            color: "white",
            borderRadius: 24,
          }}
        />
        <button
          className="chat-send"
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#ff4c4c",
            border: "none",
            color: "white",
            padding: "12px 25px",
            borderRadius: 24,
          }}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
