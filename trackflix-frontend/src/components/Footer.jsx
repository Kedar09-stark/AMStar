import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <h2 className="text-white text-lg font-semibold">Trackflix</h2>
            <p className="mt-2">
              Discover movies, shows, and trailers. Your ultimate movie tracker.
            </p>
            <p className="mt-4">
              <Link
                to="/new-to-movies"
                className="inline-block text-yellow-400 hover:underline hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded transition-colors"
                aria-label="New to movies? Start your journey here"
              >
                New to movies? Start your journey here.
              </Link>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Service" },
                 { to: "/teams", label: "Meet team" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded transition-colors"
                    aria-label={label}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                {
                  href: "https://www.facebook.com/",
                  label: "Facebook",
                  icon: <FaFacebook />,
                },
                {
                  href: "https://x.com/?lang=en",
                  label: "X",
                  icon: <FaTwitter />,
                },
                {
                  href: "https://www.instagram.com/",
                  label: "Instagram",
                  icon: <FaInstagram />,
                },
                {
                  href: "https://www.youtube.com/",
                  label: "YouTube",
                  icon: <FaYoutube />,
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded p-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Trackflix.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
