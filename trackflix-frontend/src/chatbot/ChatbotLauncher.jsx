import React, { useState } from "react";
import MovieChatbot from "./testbot";
//no function 
export default function ChatbotLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "#ff4c4c",
            border: "none",
            color: "white",
            fontSize: 30,
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(255,76,76,0.7)",
            zIndex: 10000,
          }}
          title="Open Chatbot"
          aria-label="Open Chatbot"
        >
          💬
        </button>
      )}

      {open && (
        <>
          <MovieChatbot />
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              bottom: 530, // adjust depending on Chatbot height
              right: 20,
              backgroundColor: "#ff4c4c",
              border: "none",
              color: "white",
              padding: "6px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 0 10px rgba(255,76,76,0.7)",
              zIndex: 10001,
            }}
            title="Close Chatbot"
            aria-label="Close Chatbot"
          >
            ✕ Close
          </button>
        </>
      )}
    </>
  );
}
