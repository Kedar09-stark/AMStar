import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
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

  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const tabsRef = useRef([]);
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
      // Redirect to login after successful logout
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show an error message to user
    }
  };

  return (
   <div className="w-full px-4 py-6 mt-20 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] rounded-xl shadow-2xl relative z-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-4xl font-bold text-yellow-600 hover:text-yellow-400 transition duration-200"
        >
          Admin Dashboard 👑
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg transition whitespace-nowrap"
        >
          Logout
        </button>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:flex flex-wrap justify-center items-center gap-4 relative pb-6">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.key;
          return (
            <motion.button
              key={tab.key}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => setActiveTab(tab.key)}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px #FFD700",
                boxShadow: "0px 0px 10px #FFD700",
              }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition duration-300
                ${
                  isActive
                    ? "text-white bg-gradient-to-r from-yellow-400 to-pink-500 shadow-md shadow-yellow-500"
                    : "text-gray-300 hover:text-yellow-300"
                }`}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 bg-yellow-400/20 backdrop-blur-sm rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}

        <motion.span
          className="absolute bottom-0 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full shadow-[0_0_20px_#facc15]"
          animate={{
            width: underlineStyle.width,
            left: underlineStyle.left,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      </div>

      {/* Mobile Tabs */}
      <div className="flex md:hidden justify-between items-center relative">
        <button
          className="relative px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-yellow-400 to-pink-500 shadow-md shadow-yellow-500 flex-1 text-center"
          onClick={() => setActiveTab(activeTab)}
        >
          {tabs.find((t) => t.key === activeTab)?.label || "Select"}
        </button>

        <div className="relative ml-3">
          <button
            onClick={() => setBurgerOpen(!burgerOpen)}
            className="p-2 rounded-md bg-yellow-400 text-black font-bold"
            aria-label="Toggle menu"
          >
            ☰
          </button>
          {burgerOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#302b63] rounded-md shadow-lg z-20">
              {otherTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setBurgerOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-black"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabsNav;
