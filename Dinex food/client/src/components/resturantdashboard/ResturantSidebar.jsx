import React from "react";
import toast from "react-hot-toast";
import api from "../../config/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  UserRound,
  CookingPot,
  Info,
  Menu,
  LogOut,
  ShoppingBasket,
  IndianRupee,
} from "lucide-react";

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "menuitem", label: "Menu Items", icon: CookingPot },
  { id: "orders", label: "Orders", icon: ShoppingBasket },
  { id: "earnings", label: "Earnings", icon: IndianRupee },
  { id: "helpdesk", label: "Help Desk", icon: Info },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

const ResturantSidebar = ({
  active,
  setActive,
  isCollapsed,
  setIsCollapsed,
}) => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser("");
      setIsLogin(false);
      sessionStorage.removeItem("DineXUser");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1, width: isCollapsed ? 85 : 270 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full relative flex flex-col
                 bg-gradient-to-b from-[#ffffffcc] to-[#f3e8ffcc]
                 backdrop-blur-xl border-r border-purple-100 shadow-2xl"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-10 -right-10 w-32 h-32 bg-indigo-400 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="flex items-center h-20 px-3 border-b border-purple-100">
        <motion.button
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl bg-white shadow hover:shadow-md text-gray-700"
        >
          <Menu size={20} />
        </motion.button>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="ml-3"
            >
              <div className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Restaurant Dashborad
              </div>
              <div className="text-xs text-gray-400">
                Manage your business
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 px-2 py-6 space-y-3"
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <motion.button
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.04, x: 6 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActive(item.id)}
              className="relative w-full flex items-center py-3 rounded-xl group overflow-hidden"
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="liquid-restaurant"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"
                  />
                )}
              </AnimatePresence>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-purple-500" />

              <div className="relative w-16 flex justify-center">
                <motion.div
                  animate={{
                    scale: isActive ? [1, 1.25, 1] : 1,
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: isActive ? Infinity : 0,
                  }}
                  className={isActive ? "text-white" : "text-gray-600"}
                >
                  <Icon size={20} />
                </motion.div>
              </div>

              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`relative text-sm font-medium ${
                      isActive ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {isCollapsed && (
                <span className="absolute left-20 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100">
                  {item.label}
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.nav>

      <div className="p-2 border-t border-purple-100">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full flex items-center py-3 rounded-xl text-purple-600 hover:bg-purple-50 transition"
        >
          <div className="w-16 flex justify-center">
            <LogOut size={20} />
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                Log Out
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ResturantSidebar;
