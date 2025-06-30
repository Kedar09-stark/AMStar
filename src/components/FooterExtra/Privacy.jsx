// src/components/FooterExtra/Privacy.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaDatabase, FaShieldAlt, FaUserShield } from "react-icons/fa";

const sections = [
  {
    id: "privacy",
    title: "Your Privacy Matters",
    icon: <FaLock className="text-red-500 w-6 h-6 inline mr-2" />,
    content:
      "At Trackflix, safeguarding your privacy is our top priority. We are committed to protecting your personal data and being transparent about how it is collected, used, and stored.",
  },
  {
    id: "data",
    title: "Data Collection and Use",
    icon: <FaDatabase className="text-red-500 w-6 h-6 inline mr-2" />,
    content:
      "We only collect personal information when you voluntarily provide it, such as through account registration or contacting support. We never share your data with third parties without your explicit consent.",
  },
  {
    id: "security",
    title: "Security Measures",
    icon: <FaShieldAlt className="text-red-500 w-6 h-6 inline mr-2" />,
    content:
      "Our systems implement industry-leading security protocols to protect your information from unauthorized access, alteration, or disclosure.",
  },
  {
    id: "rights",
    title: "Your Rights",
    icon: <FaUserShield className="text-red-500 w-6 h-6 inline mr-2" />,
    content:
      "You have the right to access, update, or delete your personal information at any time. For any privacy-related inquiries or requests, please contact our support team.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Privacy() {
  const [openId, setOpenId] = useState(null);

  const toggleSection = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
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
          className="text-5xl font-bold mb-14 text-center tracking-tight"
          variants={itemVariants}
        >
          Privacy Policy
        </motion.h1>

        <div className="space-y-6">
          {sections.map(({ id, title, icon, content }) => (
            <motion.div
              key={id}
              className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 cursor-pointer select-none"
              onClick={() => toggleSection(id)}
              variants={itemVariants}
              layout
              aria-expanded={openId === id}
              role="button"
              tabIndex={0}
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
            Questions? Reach out anytime at{" "}
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
