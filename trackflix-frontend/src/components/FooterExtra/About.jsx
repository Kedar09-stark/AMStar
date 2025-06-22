import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaGlobeAmericas,
  FaThumbsUp,
  FaHeart,
  FaUsers,
  FaFilm,
  FaMobileAlt,
  FaAward,
  FaComments,
  FaShieldAlt,
  FaRocket,
} from "react-icons/fa";

// Fixed ParallaxWrapper with combined refs
const ParallaxWrapper = ({ children, offset = 50 }) => {
  const controls = useAnimation();
  const [inViewRef, inView] = useInView({ threshold: 0, triggerOnce: false });
  const domRef = useRef(null);

  // Combine refs: assign both the domRef and the inViewRef to the element
  const setRefs = (node) => {
    domRef.current = node;
    inViewRef(node);
  };

  useEffect(() => {
    if (!inView) return;

    const handleScroll = () => {
      if (!domRef.current) return;

      const rect = domRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const percentVisible =
        Math.min(
          Math.max(windowHeight - rect.top, 0),
          windowHeight + rect.height
        ) / (windowHeight + rect.height);

      const y = offset * (0.5 - percentVisible);

      controls.start({ y });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, inView, offset]);

  return (
    <motion.div
      ref={setRefs}
      animate={controls}
      style={{ willChange: "transform" }}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Scroll-triggered fade + slide animation wrapper
const ScrollAnimationWrapper = ({ children, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Granular text reveal animation by words with stagger
const TextReveal = ({ text, className, staggerDelay = 0.1 }) => {
  const words = text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap gap-1 ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span
          variants={child}
          key={idx}
          className="whitespace-nowrap"
          aria-label={word}
        >
          {word}
          {idx !== words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.div>
  );
};

const About = () => {
  const featureSets = [
    [
      {
        icon: FaGlobeAmericas,
        title: "Global Reach",
        text:
          "Connecting over half a billion fans across 190+ countries and 50+ languages — delivering content tailored for every culture and preference.",
      },
      {
        icon: FaThumbsUp,
        title: "Personalized Recommendations",
        text:
          "Leveraging intelligent algorithms to surface curated films and series, so you always discover something you'll love.",
      },
      {
        icon: FaHeart,
        title: "Passionate Fandom",
        text:
          "When stories transcend screens and inspire culture — from music and books to fashion and travel, our fans lead the way.",
      },
    ],
    [
      {
        icon: FaUsers,
        title: "Thriving Community",
        text:
          "Join millions of enthusiasts sharing reviews, discussions, and fan creations that enrich your viewing experience.",
      },
      {
        icon: FaFilm,
        title: "Exclusive Originals",
        text:
          "Dive into groundbreaking series and films produced exclusively for Trackflix, pushing creative boundaries and redefining storytelling.",
      },
      {
        icon: FaMobileAlt,
        title: "Anytime, Anywhere",
        text:
          "Stream seamlessly across devices — whether at home or on the go, entertainment is always within reach.",
      },
    ],
    [
      {
        icon: FaAward,
        title: "Award-Winning Content",
        text:
          "Celebrated by critics and fans alike, our curated content boasts numerous awards and accolades worldwide.",
      },
      {
        icon: FaComments,
        title: "Interactive Discussions",
        text:
          "Engage with fellow fans in lively discussions, polls, and live Q&As that deepen your connection with the stories you love.",
      },
      {
        icon: FaShieldAlt,
        title: "Safe & Secure",
        text:
          "Your privacy and security are our top priorities — enjoy worry-free streaming with robust data protection.",
      },
      {
        icon: FaRocket,
        title: "Innovative Features",
        text:
          "From cutting-edge streaming technology to immersive AR/VR experiences, Trackflix is always pushing the envelope.",
      },
    ],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="min-h-screen bg-black text-white px-6 py-16 md:py-24"
    >
      {/* Hero Section with Parallax */}
      <ParallaxWrapper offset={30}>
        <section className="max-w-4xl mx-auto text-center mb-20 pt-28 md:pt-36">
          <ScrollAnimationWrapper>
            <motion.h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-wide">
              <TextReveal text="Entertaining the World," className="block" />
              <br />
              <motion.span className="text-gray-400 block mt-2">
                <TextReveal text="One Fan at a Time." />
              </motion.span>
            </motion.h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-6">
              <TextReveal text="Trackflix is your premier gateway to global storytelling — explore, follow, and immerse yourself in cinema that moves hearts and sparks conversations worldwide." />
            </p>
          </ScrollAnimationWrapper>
        </section>
      </ParallaxWrapper>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-0">
        <ParallaxWrapper offset={20}>
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-semibold mb-14 text-center tracking-wide">
              <TextReveal text="How We Bring Stories to Life" />
            </h2>
          </ScrollAnimationWrapper>
        </ParallaxWrapper>

        {featureSets.map((features, idx) => {
          const gridColsClass =
            features.length === 4
              ? "grid-cols-1 md:grid-cols-4"
              : "grid-cols-1 md:grid-cols-3";

          return (
            <ParallaxWrapper key={idx} offset={15 * (idx + 1)}>
              <div className={`mt-10 grid ${gridColsClass} gap-16 text-center`}>
                {features.map(({ icon: Icon, title, text }, i) => (
                  <ScrollAnimationWrapper
                    key={i}
                    className="flex flex-col items-center max-w-xs mx-auto cursor-pointer rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-[0_8px_20px_rgba(255,69,96,0.5)]"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: [0, 10, -10, 10, 0] }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <Icon className="text-red-600 text-6xl mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold mb-3">
                      <TextReveal text={title} staggerDelay={0.05} />
                    </h3>
                    <p className="text-gray-300">
                      <TextReveal text={text} staggerDelay={0.01} />
                    </p>
                  </ScrollAnimationWrapper>
                ))}
              </div>
            </ParallaxWrapper>
          );
        })}
      </section>
    </motion.div>
  );
};

export default About;
