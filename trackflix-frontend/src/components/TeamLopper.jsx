// Import React and necessary hooks
import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// Easing function to create a smooth acceleration/deceleration effect
function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function TeamOrbit({ members, containerSize }) {
  const navigate = useNavigate();

  // Number of team members
  const count = members.length;

  // Orbit radius (60% of container size)
  const radius = useMemo(() => containerSize * 0.5, [containerSize]);

  // References to track animation state
  const animationRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const rotationRef = useRef(0);
  const pulseTimeRef = useRef(0);

  // Component state
  const [rotation, setRotation] = useState(0); // Current rotation angle
  const [isPaused, setIsPaused] = useState(false); // Pause state for hover effect

  // Function to update rotation using easing
  function updateRotation(prevRotation, deltaSeconds, speed) {
    const easedSpeed = speed * easeInOutCubic(
      (Math.sin(pulseTimeRef.current) + 1) / 2
    );
    return (prevRotation + easedSpeed * deltaSeconds) % (2 * Math.PI);
  }

  // Animation loop
  useEffect(() => {
    const baseSpeed = 0.8; // Rotation speed

    function animate(timestamp) {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;

      // Time difference in seconds between frames
      const deltaSeconds = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      if (!isPaused) {
        // Update pulsing animation
        pulseTimeRef.current += deltaSeconds * 3;

        // Update rotation
        rotationRef.current = updateRotation(
          rotationRef.current,
          deltaSeconds,
          baseSpeed
        );

        // Apply rotation state
        setRotation(rotationRef.current);
      }

      // Request next frame
      animationRef.current = requestAnimationFrame(animate);
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup when component unmounts
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);

  // Render all team members in orbit
  const renderedMembers = useMemo(() => {
    return members.map(({ name, img, role }, index) => {
      // Calculate angular position
      
      const angle = (index*8 / count)   + rotation;

      // Position on orbit
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      // Pulse effect for zoom in/out
      const pulse =
        0.85 +
        0.3 *
          Math.abs(
            Math.sin(
              pulseTimeRef.current * 2 + (index * Math.PI) / count
            )
          );

      // Depth scaling to simulate 3D effect
      const depthScale = 0.7 + 0.3 * ((Math.sin(angle) + 1) / 2);

      // Shadow intensity based on depth
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
          // Uncomment if navigation is needed:
          // onClick={() =>
          //   navigate(`/${name.toLowerCase().replace(/\s+/g, "-")}`)
          // }
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Member image */}
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

          {/* Member name */}
          <p style={{ color: "#f87171", fontWeight: "600", fontSize: 14 }}>
            {name}
          </p>

          {/* Member role */}
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
      {/* Dashed orbit circle */}
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
      {/* Render orbiting members */}
      {renderedMembers}
    </section>
  );
}

// Type checking for props
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
