// src/animations/MDanimation.js

export const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
      ease: "easeOut",
      duration: 0.6,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

// New variant for rotating 360 degrees on click
export const rotateVariant = {
  initial: { rotate: 0 },
  rotate360: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};
