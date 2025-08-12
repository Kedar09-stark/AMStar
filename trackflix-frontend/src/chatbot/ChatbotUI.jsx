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

  if (!isOpen) {
    // Show only chat icon button
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#ff4c4c",
          border: "none",
          borderRadius: "50%",
          width: 60,
          height: 60,
          color: "white",
          fontSize: 30,
          cursor: "pointer",
          boxShadow: "0 0 12px rgba(0,0,0,0.5)",
          zIndex: 9999,
        }}
        aria-label="Open Chatbot"
      >
        💬
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "350px",
        maxHeight: "500px",
        backgroundColor: "#222",
        borderRadius: "12px",
        boxShadow: "0 0 12px rgba(0,0,0,0.7)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "#ff4c4c",
          padding: "12px 15px",
          fontWeight: "bold",
          fontSize: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
       Trackflix Chatbot
        <div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
              marginRight: "10px",
            }}
            title="Close Chat"
          >
            ✕
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
            }}
            title="Reset chat"
          >
            ⟳
          </button>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: msg.sender === "user" ? "#0d6efd" : "#444",
                padding: "8px 12px",
                borderRadius: "12px",
                maxWidth: "80%",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
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
        style={{ display: "flex", borderTop: "1px solid #444" }}
      >
        <input
          type="text"
          placeholder="Ask me anything about movies or shows..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            border: "none",
            outline: "none",
            fontSize: "14px",
            backgroundColor: "#333",
            color: "white",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#ff4c4c",
            border: "none",
            color: "white",
            padding: "12px 20px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Searching..." : "Send"}
        </button>
      </form>
    </div>
  );
}
