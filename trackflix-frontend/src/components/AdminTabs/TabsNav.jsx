import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const TabsNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "celebrities", label: "Celebrities" },
    { key: "fanfavourites", label: "Fan Favourites" },
    { key: "fullmoviedetails", label: "Full Movie Details" },
    { key: "fullmovies", label: "Full Movies" },
    { key: "livetvdetails", label: "TV Show Details" },
    { key: "livetvshows", label: "TV Show" },
    { key: "featureditems", label: "Featured Items" },
    { key: "ftrecommendations", label: "Featured Today" },
    { key: "interests", label: "Interests" },
    { key: "toptenmovies", label: "Top Ten Movies" },
    { key: "morecelebrity", label: "Recommendation Celebrities" },
    { key: "users", label: "Users" },
    { key: "loginstats", label: "Login Stats" },
  ];

  const tabsRef = useRef([]);
const [underlineStyle, setUnderlineStyle] = useState({ width: '8.33%', left: 0 });

  const [burgerOpen, setBurgerOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const activeIndex = tabs.findIndex((t) => t.key === activeTab);
    const node = tabsRef.current[activeIndex];
    if (node) {
      setUnderlineStyle({
        width: node.offsetWidth,
        left: node.offsetLeft,
      });
    }
  }, [activeTab]); 

  const otherTabs = tabs.filter((t) => t.key !== activeTab);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, show toast or alert
    }
  };

  return (
    <nav
      className="w-full max-w-7xl mx-auto px-6 py-6 mt-20 bg-gradient-to-br from-[#1a1c2c] via-[#2d2f4a] to-[#3c3e66] rounded-2xl shadow-2xl
      backdrop-blur-sm
      relative z-20
      "
      aria-label="Main navigation"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate("/")}
          className="text-4xl font-extrabold tracking-tight text-yellow-500 hover:text-yellow-400 transition duration-300 select-none"
          aria-label="Go to Home"
        >
          Admin Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
            text-white font-semibold px-6 py-3 rounded-full shadow-lg
            focus:outline-none focus:ring-4 focus:ring-red-400
            transition duration-300 select-none"
          aria-label="Logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
            />
          </svg>
          Logout
        </button>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:flex flex-wrap justify-center items-center gap-6 relative pb-6">
        {tabs.map((tab, i) => {
          const isActive = activeTab === tab.key;
          return (
            <motion.button
              key={tab.key}
              ref={(el) => (tabsRef.current[i] = el)}
              onClick={() => setActiveTab(tab.key)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-7 py-3 rounded-full font-semibold text-sm uppercase tracking-wider
                transition-colors duration-300
                select-none
                ${
                  isActive
                    ? "text-yellow-400 bg-gradient-to-r from-yellow-600 to-pink-500 shadow-lg shadow-yellow-500/70"
                    : "text-gray-300 hover:text-yellow-400"
                }
              `}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Switch to ${tab.label} tab`}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="active-tab-highlight"
                  className="absolute inset-0 rounded-full bg-yellow-400/20 backdrop-blur-sm -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </motion.button>
          );
        })}

        {/* Animated underline */}
        <motion.span
          className="absolute bottom-0 h-1 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 shadow-[0_0_20px_#facc15]"
          animate={{
            width: underlineStyle.width,
            left: underlineStyle.left,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
          aria-hidden="true"
        />
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden flex justify-between items-center relative">
        <button
          className="flex-1 text-center px-6 py-3 rounded-full font-semibold uppercase tracking-wider text-yellow-400 bg-gradient-to-r from-yellow-600 to-pink-500 shadow-lg
          select-none truncate"
          aria-haspopup="listbox"
          aria-expanded={burgerOpen}
          aria-label="Select active tab"
          onClick={() => setBurgerOpen(!burgerOpen)}
        >
          {tabs.find((t) => t.key === activeTab)?.label || "Select"}
        </button>

        <button
          onClick={() => setBurgerOpen(!burgerOpen)}
          aria-label="Toggle menu"
          aria-expanded={burgerOpen}
          className="ml-4 relative w-12 h-12 flex flex-col justify-center items-center rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600
            shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400
            transition-colors duration-300 select-none"
        >
          {/* Hamburger Icon */}
          <span
            className={`block w-7 h-1.5 bg-black rounded-md origin-center transition-transform duration-300 ease-in-out
              ${burgerOpen ? "rotate-45 translate-y-2.5" : ""}`}
          />
          <span
            className={`block w-7 h-1.5 bg-black rounded-md my-1.5 transition-opacity duration-300 ease-in-out
              ${burgerOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block w-7 h-1.5 bg-black rounded-md origin-center transition-transform duration-300 ease-in-out
              ${burgerOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
          />
        </button>

        <AnimatePresence>
          {burgerOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-14 right-0 w-52 bg-[#302b63cc] backdrop-blur-md rounded-lg shadow-xl z-30 ring-1 ring-yellow-400 ring-opacity-30"
              role="listbox"
            >
              {otherTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setBurgerOpen(false);
                  }}
                  className="w-full text-left px-5 py-3 text-gray-300 hover:bg-yellow-500 hover:text-black transition-colors duration-200 rounded-md focus:outline-none focus:bg-yellow-500 focus:text-black"
                  role="option"
                  aria-selected={false}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default TabsNav;
