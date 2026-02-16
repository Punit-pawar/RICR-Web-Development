import React from "react";
import transparentLogo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { user, isLogin, role } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    switch (role) {
      case "manager":
        navigate("/resturant-dashboard");
        break;
      case "partner":
        navigate("/rider-dashboard");
        break;
      case "customer":
        navigate("/user-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
      default:
        break;
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl
                 bg-gradient-to-r from-purple-600 via-purple-600 to-indigo-600
                 shadow-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">

          {/* PROFILE PHOTO */}
          <AnimatePresence>
            {isLogin && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNavigate}
                className="relative w-11 h-11 rounded-full cursor-pointer"
              >
        
              </motion.div>
            )}
          </AnimatePresence>

          {/* LOGO */}
          <Link to="/">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={transparentLogo}
              alt="logo"
              className="h-12 w-20 object-contain brightness-0 invert"
            />
          </Link>
        </div>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-8 text-white">
          {["Home", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="relative font-medium opacity-90 hover:opacity-100"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white
                               transition-all duration-300 hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {isLogin ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNavigate}
              className="px-4 py-2 rounded-xl bg-white/20 text-white
                         border border-white/30 backdrop-blur-md
                         shadow-md hover:bg-white/30 transition"
            >
              {user?.fullName}
            </motion.button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 rounded-xl bg-white/20 text-white
                           border border-white/30 hover:bg-white/30 transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 rounded-xl bg-white text-purple-700
                           font-semibold shadow-md hover:shadow-xl transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
