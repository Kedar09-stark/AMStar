import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function TeamOrbit({ members, containerSize }) {
  const navigate = useNavigate();
  const count = members.length;
  const radius = useMemo(() => containerSize * 0.55, [containerSize]);//orbit size 
  const animationRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const rotationRef = useRef(0);
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pulseTimeRef = useRef(0);

  function updateRotation(prevRotation, deltaSeconds, speed) {
    const easedSpeed =
      speed * easeInOutCubic((Math.sin(pulseTimeRef.current) + 1) / 2);
    return (prevRotation + easedSpeed * deltaSeconds) % (2 * Math.PI);
  }

  useEffect(() => {
    const baseSpeed = 0.8;
    function animate(timestamp) {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const deltaSeconds = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      if (!isPaused) {
        pulseTimeRef.current += deltaSeconds * 3;
        rotationRef.current = updateRotation(
          rotationRef.current,
          deltaSeconds,
          baseSpeed
        );
        setRotation(rotationRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);

  const renderedMembers = useMemo(() => {
    return members.map(({ name, img, role }, index) => {
      const angle = (index / count) * 2 * Math.PI + rotation;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const pulse =
        0.85 +
        0.3 *
          Math.abs(
            Math.sin(
              pulseTimeRef.current * 2 + (index * Math.PI) / count
            )
          );
      const depthScale = 0.7 + 0.3 * ((Math.sin(angle) + 1) / 2);
      const shadowIntensity =
        0.2 + 0.5 * ((Math.sin(angle) + 1) / 2);

      return (
        <article
          key={name}
          style={{
            position: "absolute",
            top: `calc(50% + ${y}px)`,
            left: `calc(50% + ${x}px)`,
            transform: `translate(-50%, -50%) scale(${pulse * depthScale})`,
            width: containerSize * 0.3,
            textAlign: "center",
            cursor: "pointer",
            filter: `drop-shadow(0 4px 4px rgba(0,0,0,${shadowIntensity}))`,
            zIndex: Math.round(depthScale * 100),
          }}
          onClick={() =>
            navigate(
              `/developer/${name.toLowerCase().replace(/\s+/g, "-")}`
            )
          }
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <img
            src={img}
            alt={name}
            style={{
              width: "100%",
              height: containerSize * 0.3,
              borderRadius: "50%",
              border: "4px solid #dc2626",
              objectFit: "cover",
              display: "block",
              margin: "0 auto 8px",
            }}
          />
          <p style={{ color: "#f87171", fontWeight: "600", fontSize: 14 }}>
            {name}
          </p>
          <p style={{ color: "#fca5a5", fontSize: 12 }}>{role}</p>
        </article>
      );
    });
  }, [members, rotation, radius, containerSize, navigate]);

  return (
    <section
      style={{
        position: "relative",
        width: containerSize,
        height: containerSize,
        margin: "20px auto 0",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: radius * 2,
          height: radius * 2,
          border: "1.5px dashed #dc2626",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      {renderedMembers}
    </section>
  );
}

TeamOrbit.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
  containerSize: PropTypes.number.isRequired,
};
