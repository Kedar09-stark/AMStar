import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const UserTabsNav = () => {
  const tabs = [
    { key: "", label: "Watchlist" },
    { key: "ratings", label: "My Ratings" },
    { key: "recommendations", label: "Recommendations" },
    { key: "settings", label: "Account Settings" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const tabsRef = useRef([]);
  const [activeTab, setActiveTab] = useState("");
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

  // Sync active tab from URL
  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const currentTab = pathParts[2] || "";
    setActiveTab(currentTab);
  }, [location.pathname]);

  // Update underline position/width
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

  const handleTabClick = (key) => {
    setActiveTab(key);
    navigate(`/dashboard${key ? `/${key}` : ""}`);
  };

  return (
    <div className="w-full px-4 py-6 bg-gray-100 rounded-xl shadow relative z-10 mb-6">

      {/* Desktop Tabs */}
      <div className="hidden md:flex space-x-6 relative pb-4 border-b border-gray-300">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.key;
          return (
            <motion.button
              key={tab.key || "watchlist"}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => handleTabClick(tab.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`relative px-4 py-2 font-semibold text-md rounded-md transition ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {tab.label}
            </motion.button>
          );
        })}

        {/* Underline */}
        <motion.span
          className="absolute bottom-0 h-1 bg-blue-600 rounded-full"
          animate={{
            width: underlineStyle.width,
            left: underlineStyle.left,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>

      {/* Mobile Active Tab Display */}
      <div className="flex md:hidden justify-between items-center relative">
        <button
          className="relative px-6 py-2 rounded-md font-semibold text-md bg-blue-600 text-white w-full"
          onClick={() => handleTabClick(activeTab)}
        >
          {tabs.find((t) => t.key === activeTab)?.label || "Select Tab"}
        </button>

        {/* Optional: Add dropdown logic here for better mobile experience */}
      </div>
    </div>
  );
};

export default UserTabsNav;
