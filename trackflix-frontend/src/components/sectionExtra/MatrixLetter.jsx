import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const getRandomBinary = () => (Math.random() > 0.5 ? "1" : "0");

const MatrixLetter = ({ targetChar, delay = 0 }) => {
  const [char, setChar] = useState(targetChar === " " ? "\u00A0" : targetChar);
  const [isMatrix, setIsMatrix] = useState(false);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // No animation for spaces
    if (targetChar === " ") return;

    let flicker = true;

    const startFlicker = () => {
      intervalRef.current = setInterval(() => {
        if (flicker) {
          setChar(getRandomBinary());
          setIsMatrix(true);
        } else {
          setChar(targetChar);
          setIsMatrix(false);
        }
        flicker = !flicker;
      }, 500);

      // Stop flickering after 3 seconds
      timeoutRef.current = setTimeout(() => {
        clearInterval(intervalRef.current);
        setChar(targetChar);
        setIsMatrix(false);

        // Pause for 3 seconds before restarting flicker
        timeoutRef.current = setTimeout(startFlicker, 3000);
      }, 3000);
    };

    // Initial delay before starting flicker
    timeoutRef.current = setTimeout(startFlicker, delay);

    // Cleanup on unmount or prop change
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [targetChar, delay]);

  return (
    <motion.span
      className="inline-block"
      style={{
        color: isMatrix ? "#00ff00" : "inherit",
        textShadow: isMatrix ? "0 2px 4px rgba(0,255,0,0.5)" : "none",
        fontVariantNumeric: "tabular-nums",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: delay / 1000 }}
      aria-label={targetChar === " " ? "space" : targetChar}
    >
      {char}
    </motion.span>
  );
};

export default MatrixLetter;
