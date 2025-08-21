import React, { useState } from "react";
//no  function 
export default function ClapperboardAnimationButton({ style, onClick }) {
  const [hovered, setHovered] = useState(false);

  const boxShadow = hovered
    ? "0 6px 20px rgba(255, 76, 76, 0.9), 0 0 30px rgba(255, 76, 76, 0.9)"
    : "0 4px 15px rgba(255, 76, 76, 0.7), 0 0 15px rgba(255, 76, 76, 0.9)";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Open clapperboard chatbot"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 80,
        height: 80,
        borderRadius: "50%",
        overflow: "hidden",
        boxShadow,
        cursor: "pointer",
        userSelect: "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "scale(1.15)" : "scale(1)",
        zIndex: 9999,
        backgroundColor: "#000",
        ...style,
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
    </div>
  );
}
