import React from "react";
import transparentLogo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

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

  const navItemClass =
    "relative text-white/90 hover:text-white transition font-medium";

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={transparentLogo}
            alt="logo"
            className="h-12 w-20 object-contain brightness-0 invert"
          />
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -2 }}>
              <Link to={item.path} className={navItemClass}>
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          {isLogin ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNavigate}
              className="px-4 py-2 rounded-xl bg-white text-purple-700 font-semibold cursor-pointer shadow-md hover:shadow-lg transition"
            >
              {user?.fullName}
            </motion.div>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="px-5 py-2 rounded-xl bg-white/20 text-white border border-white/30 font-medium hover:bg-white/30 transition"
              >
                Login
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="px-5 py-2 rounded-xl bg-white text-purple-700 font-semibold shadow-md hover:shadow-xl transition"
              >
                Register
              </motion.button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
