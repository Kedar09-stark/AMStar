// src/components/FooterExtra/Terms.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFileContract, FaUserShield, FaCogs, FaExclamationTriangle } from "react-icons/fa";

const termsSections = [
  {
    id: "usage",
    title: "Use of Service",
    icon: <FaFileContract className="text-red-500 w-5 h-5 inline mr-2" />,
    content:
      "By accessing and using Trackflix, you agree to abide by our terms and conditions. Use the platform responsibly, respecting all applicable laws and other users’ rights.",
  },
  {
    id: "account",
    title: "Account Responsibilities",
    icon: <FaUserShield className="text-red-500 w-5 h-5 inline mr-2" />,
    content:
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
  },
  {
    id: "modifications",
    title: "Modifications to Service",
    icon: <FaCogs className="text-red-500 w-5 h-5 inline mr-2" />,
    content:
      "Trackflix reserves the right to modify or discontinue any part of the service at any time, with or without notice.",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: <FaExclamationTriangle className="text-red-500 w-5 h-5 inline mr-2" />,
    content:
      "Trackflix is provided “as is” without warranties of any kind. We are not liable for any damages arising from your use of the platform.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export default function Terms() {
  const [openId, setOpenId] = useState(null);

  const toggleSection = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-6 md:px-12 lg:px-24 text-gray-100 font-sans">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-5xl font-extrabold mb-14 text-center tracking-tight"
          variants={itemVariants}
        >
          Terms of Service
        </motion.h1>

        <div className="space-y-6">
          {termsSections.map(({ id, title, icon, content }) => (
            <motion.div
              key={id}
              className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 cursor-pointer select-none"
              onClick={() => toggleSection(id)}
              variants={itemVariants}
              layout
              role="button"
              tabIndex={0}
              aria-expanded={openId === id}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  toggleSection(id);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white flex items-center">
                  {icon} {title}
                </h2>
                <motion.span
                  animate={{ rotate: openId === id ? 45 : 0 }}
                  className="text-red-500 text-3xl font-bold select-none"
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </div>

              <AnimatePresence initial={false}>
                {openId === id && (
                  <motion.p
                    className="mt-4 text-gray-300 leading-relaxed text-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {content}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.footer
          className="mt-20 text-center text-gray-400 text-base"
          variants={itemVariants}
        >
          <p>
            For any questions about our Terms of Service, please contact us at{" "}
            <a
              href="mailto:support@trackflix.com"
              className="text-red-500 underline hover:text-red-400"
            >
              support@trackflix.com
            </a>
            .
          </p>
        </motion.footer>
      </motion.div>
    </section>
  );
}
