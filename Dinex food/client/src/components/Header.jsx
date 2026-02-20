import React, { useEffect, useState } from "react";
import transparentLogo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User } from "lucide-react";

const Header = () => {
  const { user, isLogin, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [cartCount, setCartCount] = useState(0);
  const [animateBadge, setAnimateBadge] = useState(false);

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

  /* ✅ Calculate cart quantity */
  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart"));

      if (cart?.cartItem?.length) {
        const totalItems = cart.cartItem.reduce(
          (sum, item) => sum + Number(item.quantity || 0),
          0
        );

        if (totalItems !== cartCount) {
          setCartCount(totalItems);
          /* Trigger animation only if count changes */
          setAnimateBadge(true);
          setTimeout(() => setAnimateBadge(false), 300);
        }
      } else {
        setCartCount(0);
      }
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, [cartCount]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-orange-500 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ---------------- LEFT: LOGO ---------------- */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src={transparentLogo}
              alt="DineX Logo"
              className="h-10 w-auto object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* ---------------- CENTER: NAV LINKS ---------------- */}
        <nav className="hidden md:flex items-center gap-10">
          {["Home", "About", "Contact"].map((item) => {
            const path = `/${item.toLowerCase()}`;
            const isActive = location.pathname === path || (item === "Home" && location.pathname === "/");

            return (
              <Link
                key={item}
                to={path}
                className={`relative font-bold text-sm tracking-wide transition-colors duration-300 group
                  ${isActive ? "text-orange-600" : "text-black hover:text-white"}
                `}
              >
                {item}
                {/* Animated Underline */}
                <span className={`absolute left-0 -bottom-1.5 h-[3px] rounded-full bg-white transition-all duration-300 ease-out
                  ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                `} />
              </Link>
            );
          })}
        </nav>

        {/* ---------------- RIGHT: ACTIONS ---------------- */}
        <div className="flex items-center gap-4 md:gap-6">

          {/* 🛒 CART ICON - ONLY VISIBLE WHEN LOGGED IN */}
          {isLogin && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/checkout-page")}
              className="relative cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors shadow-sm">
                <ShoppingCart size={18} strokeWidth={2.5} />
              </div>

              {/* ✅ BADGE */}
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.div
                    key="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: animateBadge ? 1.3 : 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1.5 rounded-full bg-orange-600 text-white text-[10px] font-black tracking-tighter flex items-center justify-center shadow-md border-2 border-white"
                  >
                    {cartCount}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* 👤 USER / AUTH BUTTONS */}
          <div className="flex items-center gap-3">
            {isLogin ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNavigate}
                className="px-4 py-2.5 rounded-full bg-orange-50 text-orange-600 border border-orange-100 shadow-sm hover:bg-orange-100 transition-colors flex items-center gap-2 font-bold text-sm tracking-wide"
              >
                <User size={16} strokeWidth={2.5} />
                <span className="hidden sm:inline">{user?.fullName?.split(" ")[0]}</span>
              </motion.button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="hidden sm:block px-5 py-2.5 rounded-full text-gray-600 font-bold hover:text-gray-900 transition-colors text-sm"
                >
                  Log In
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/register")}
                  className="px-6 py-2.5 rounded-full bg-gray-900 text-white font-bold text-sm shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:bg-orange-600 transition-colors"
                >
                  Sign Up
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;