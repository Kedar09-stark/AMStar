import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { adminEmails } from "../constants/adminEmails"; // adjust the path if needed

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const activeClass = "text-yellow-400 font-bold";

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserEmail(user.email);
        setIsAdmin(adminEmails.includes(user.email));
      } else {
        setCurrentUserEmail(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDashboard = () => {
    setIsMenuOpen(false);
    navigate(isAdmin ? "/admin" : "/dashboard");
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setCurrentUserEmail(null);
      setIsAdmin(false);
      setIsMenuOpen(false);
      navigate("/"); // Redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-lg fixed w-full z-40">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className="select-none"
          aria-label="TrackFlix Home"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src="images/hader5.png"
            alt="TrackFlix Logo"
            className="w-32 h-auto"
          />
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center font-medium text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClass : "hover:text-yellow-400 transition duration-200"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? activeClass : "hover:text-yellow-400 transition duration-200"
            }
          >
            Movies
          </NavLink>
          <NavLink
            to="/Tvshow"
            className={({ isActive }) =>
              isActive ? activeClass : "hover:text-yellow-400 transition duration-200"
            }
          >
            TV Show
          </NavLink>

          {currentUserEmail ? (
            <>
              <div
                onClick={handleDashboard}
                className="cursor-pointer hover:text-yellow-400 transition duration-200 text-xl"
                title={`Logged in as ${currentUserEmail}`}
                aria-label="User Profile or Admin Dashboard"
              >
                {isAdmin ? "🛡️" : "👤"}
              </div>

              <button
                onClick={handleLogout}
                className="ml-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded hover:bg-yellow-500 transition duration-200"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? activeClass : "hover:text-yellow-400 transition duration-200"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive ? activeClass : "hover:text-yellow-400 transition duration-200"
                }
              >
                Sign In
              </NavLink>
            </>
          )}
        </nav>

        {/* Mobile Burger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className={`w-8 h-8 transition-transform duration-300 ${
                isMenuOpen ? "rotate-90" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <nav
          className="md:hidden mt-2 px-4 py-3 space-y-3 bg-gray-800 rounded-lg shadow-lg max-w-screen-xl mx-auto transition-opacity duration-300"
          aria-label="Mobile menu"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "block text-yellow-400 font-bold text-lg"
                : "block hover:text-yellow-400 text-lg font-medium"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive
                ? "block text-yellow-400 font-bold text-lg"
                : "block hover:text-yellow-400 text-lg font-medium"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Movies
          </NavLink>
          <NavLink
            to="/Tvshow"
            className={({ isActive }) =>
              isActive
                ? "block text-yellow-400 font-bold text-lg"
                : "block hover:text-yellow-400 text-lg font-medium"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Tv Show
          </NavLink>

          {currentUserEmail ? (
            <>
              <div
                onClick={handleDashboard}
                className="block hover:text-yellow-400 text-xl font-semibold cursor-pointer"
                aria-label="User Profile or Admin Dashboard"
                title={`Logged in as ${currentUserEmail}`}
              >
                {isAdmin ? "🛡️ Admin Dashboard" : "👤 Dashboard"}
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-yellow-400 font-bold text-lg hover:text-yellow-500"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "block text-yellow-400 font-bold text-lg"
                    : "block hover:text-yellow-400 text-lg font-medium"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive
                    ? "block text-yellow-400 font-bold text-lg"
                    : "block hover:text-yellow-400 text-lg font-medium"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </NavLink>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
