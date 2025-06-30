// src/components/FooterExtra/Contact.jsx

import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaGlobe, FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

const contactItems = [
  {
    icon: <FaEnvelope className="text-red-500 w-6 h-6" />,
    label: "Email",
    value: "support@trackflix.com",
    href: "mailto:support@trackflix.com",
  },
  {
    icon: <FaPhoneAlt className="text-red-500 w-6 h-6" />,
    label: "Phone",
    value: "+880 1234 567890",
    href: "tel:+8801234567890",
  },
  {
    icon: <FaGlobe className="text-red-500 w-6 h-6" />,
    label: "Website",
    value: "www.trackflix.com",
    href: "https://www.trackflix.com",
  },
];

const socialLinks = [
  { icon: <FaTwitter />, href: "https://twitter.com/trackflix" },
  { icon: <FaFacebookF />, href: "https://facebook.com/trackflix" },
  { icon: <FaInstagram />, href: "https://instagram.com/trackflix" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Contact = () => {
  return (
    <motion.section
      className="max-w-3xl mx-auto bg-gray-900 rounded-xl shadow-xl p-10 pt-20 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-4xl font-extrabold mb-8 text-center tracking-tight"
        variants={itemVariants}
      >
        Get in Touch
      </motion.h1>

      <motion.div className="space-y-8" variants={containerVariants}>
        {contactItems.map(({ icon, label, value, href }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 hover:text-red-500 transition-colors duration-300"
            variants={itemVariants}
          >
            <span aria-hidden="true">{icon}</span>
            <span className="font-semibold min-w-[70px]">{label}:</span>
            <span className="underline">{value}</span>
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        className="mt-10 flex justify-center space-x-6 text-gray-400 text-2xl"
        variants={itemVariants}
      >
        {socialLinks.map(({ icon, href }, idx) => (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors duration-300"
            aria-label={`Trackflix on ${href.split('//')[1].split('.')[0]}`}
          >
            {icon}
          </a>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Contact;
