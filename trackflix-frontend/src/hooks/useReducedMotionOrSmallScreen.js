import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const useReducedMotionOrSmallScreen = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    const checkScreen = () => setIsSmallScreen(mediaQuery.matches);
    checkScreen();

    mediaQuery.addEventListener("change", checkScreen);
    return () => mediaQuery.removeEventListener("change", checkScreen);
  }, []);

  return prefersReducedMotion || isSmallScreen;
};

export default useReducedMotionOrSmallScreen;
