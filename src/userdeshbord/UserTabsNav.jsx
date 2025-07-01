import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const tabs = [
  { key: "", label: "🎬 Watchlist" },
  { key: "ratings", label: "⭐ My Ratings" },
  { key: "recommendations", label: "🎯 Recommendations" },
  { key: "settings", label: "⚙️ Account Settings" },
];

const UserTabsNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);
  const tabsRef = useRef([]);
  
  const [activeTab, setActiveTab] = useState("");
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const pathKey = location.pathname.split("/")[2] || "";
    setActiveTab(pathKey);
  }, [location.pathname]);

  const updateUnderline = useCallback(() => {
    const index = tabs.findIndex((tab) => tab.key === activeTab);
    const tabElement = tabsRef.current[index];
    if (tabElement) {
      setUnderlineStyle({
        width: tabElement.offsetWidth,
        left: tabElement.offsetLeft,
      });
    }
  }, [activeTab]);

  useEffect(() => {
    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [updateUnderline]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && containerRef.current && !containerRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const handleTabClick = (key) => {
    setMobileMenuOpen(false);
    navigate(`/dashboard${key ? `/${key}` : ""}`);
  };

  const activeLabel = tabs.find((tab) => tab.key === activeTab)?.label || "Select";

  const renderDesktopTabs = () => (
    <div className="hidden md:flex space-x-8 relative border-b border-white/20 pb-5">
      {tabs.map((tab, index) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            ref={(el) => (tabsRef.current[index] = el)}
            onClick={() => handleTabClick(tab.key)}
            className={`relative text-sm font-semibold tracking-wide transition duration-300 px-2 py-1 rounded focus:outline-none ${
              isActive
                ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500"
                : "text-gray-500 hover:text-indigo-400 hover:scale-105"
            }`}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
          >
            {tab.label}
          </button>
        );
      })}
      <motion.div
        className="absolute bottom-0 h-[3px] rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500"
        animate={underlineStyle}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );

  const renderMobileDropdown = () => (
    <div className="md:hidden relative mt-4">
      <button
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-pink-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-pink-300"
        aria-haspopup="listbox"
        aria-expanded={mobileMenuOpen}
      >
        <span>{activeLabel}</span>
        <FaChevronDown
          className={`ml-2 transition-transform duration-300 ${mobileMenuOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            role="listbox"
            className="absolute top-[110%] left-0 w-full bg-white/90 backdrop-blur-md shadow-xl rounded-xl border border-white/30 z-30 overflow-hidden"
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                className={`w-full px-5 py-3 text-left font-medium border-b border-white/20 last:border-none focus:outline-none transition-all duration-200 ${
                  tab.key === activeTab
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
                role="option"
                tabIndex={0}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <nav
      ref={containerRef}
      className="w-full px-4 py-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg ring-1 ring-indigo-100 mb-6 border border-white/20"
      aria-label="User dashboard navigation"
    >
      {renderDesktopTabs()}
      {renderMobileDropdown()}
    </nav>
  );
};

export default UserTabsNav;
