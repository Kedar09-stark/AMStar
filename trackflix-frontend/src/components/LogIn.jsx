import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTimes,
  FaGoogle,
  FaFacebook,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { adminEmails } from "../constants/adminEmails";

// Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // On mount, show toast from localStorage if exists, then clear it
  useEffect(() => {
    const message = localStorage.getItem("toastMessage");
    const type = localStorage.getItem("toastType");
    if (message && type) {
      if (type === "success") toast.success(message);
      else if (type === "error") toast.error(message);
      else if (type === "warn") toast.warn(message);
      else toast.info(message);

      localStorage.removeItem("toastMessage");
      localStorage.removeItem("toastType");
    }
  }, []);

  // Save toast info before navigation
  const saveToast = (message, type) => {
    localStorage.setItem("toastMessage", message);
    localStorage.setItem("toastType", type);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.warn("All fields are required.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      const isAdminEmail = adminEmails.includes(userEmail);
      setIsAdmin(isAdminEmail);

      localStorage.setItem("isAdmin", isAdminEmail ? "true" : "false");
      localStorage.setItem("userEmail", userEmail);

      const successMessage = isAdminEmail ? "Admin login successful!" : "User login successful!";
      toast.success(successMessage);

      // Save toast to localStorage before navigation so it can re-show on next page if refreshed
      saveToast(successMessage, "success");

      setTimeout(() => {
        navigate(isAdminEmail ? "/admin" : "/dashboard");
      }, 1500);
    } catch (error) {
      toast.error("Login failed. Check your email or password.");
      console.error("Firebase login error:", error.message);
      setIsAdmin(false);
      localStorage.setItem("isAdmin", "false");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('images/he4.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl relative"
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl p-2 rounded-full hover:bg-gray-200 transition"
            aria-label="Close and go to home"
          >
            <FaTimes />
          </button>

          <div className="flex justify-center items-center mb-8 sm:mb-10">
            <img
              src="images/lo-removebg-preview2.png"
              alt="Trackflix Logo"
              className="w-[8rem] sm:w-[12rem] h-auto object-contain"
            />
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 text-black bg-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Email Address"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 text-black bg-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Password"
              />
              <div
                className="absolute right-4 top-4 text-gray-500 cursor-pointer hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded transition"
            >
              Login {isAdmin && <FaUserShield className="inline ml-2" />}
            </button>
          </form>

          <div className="my-6 border-t border-gray-300 text-center text-sm text-gray-500">
            or sign in with
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => toast.info("Google login coming soon!")}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
            >
              <FaGoogle /> Google
            </button>
            <button
              onClick={() => toast.info("Facebook login coming soon!")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
            >
              <FaFacebook /> Facebook
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-700">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Sign up here
            </span>
          </p>

          {/* Toast popup container */}
<ToastContainer
  position="top-center"
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick={true}
  rtl={false}
  pauseOnFocusLoss={false}
  pauseOnHover={false}
  draggable={true}
  theme="colored"
  style={{ top: "80px" }} // adjust this value to your header height
/>


        </motion.div>
      </div>
    </div>
  );
};

export default LogIn;
