import React from "react";
import toast from "react-hot-toast";
import api from "../../config/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  UserRound,
  ArchiveRestore,
  ArrowLeftRight,
  Info,
  Menu,
  LogOut,
} from "lucide-react";

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "orders", label: "Orders", icon: ArchiveRestore },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "helpdesk", label: "Help Desk", icon: Info },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

const UserSidebar = ({ active, setActive, isCollapsed, setIsCollapsed }) => {
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
      animate={{ x: 0, opacity: 1, width: isCollapsed ? 88 : 280 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full relative flex flex-col bg-white/90 backdrop-blur-2xl border-r border-gray-100 shadow-[4px_0_40px_rgba(0,0,0,0.02)] z-40"
    >
      {/* 🎨 Subtle Ambient Background Blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-orange-400 rounded-full blur-[80px] opacity-10" />
        <div className="absolute bottom-10 -right-10 w-40 h-40 bg-amber-400 rounded-full blur-[80px] opacity-10" />
      </div>

      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center h-24 px-5 border-b border-gray-100 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2.5 rounded-2xl bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors shadow-sm border border-gray-100 shrink-0"
        >
          <Menu size={22} />
        </motion.button>

        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="ml-4 whitespace-nowrap overflow-hidden"
            >
              <div className="text-lg font-black text-gray-900 tracking-tight">
                Dashboard
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-orange-500">
                Welcome Back
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------------- NAVIGATION ---------------- */}
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 px-4 py-8 space-y-2 relative z-10 overflow-y-auto overflow-x-hidden scrollbar-hide"
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <motion.button
              key={item.id}
              variants={itemVariants}
              onClick={() => setActive(item.id)}
              className="relative w-full flex items-center py-3.5 rounded-2xl group outline-none"
            >
              {/* Active State Background (Gliding Pill) */}
              {isActive && (
                <motion.div
                  layoutId="activeSidebarTab"
                  className="absolute inset-0 bg-orange-600 rounded-2xl shadow-[0_8px_20px_rgba(234,88,12,0.25)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}

              {/* Hover State Background (For inactive items) */}
              {!isActive && (
                <div className="absolute inset-0 bg-gray-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              )}

              {/* Icon Container */}
              <div className="relative z-10 w-[60px] flex justify-center shrink-0">
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-orange-500"
                  }`} 
                />
              </div>

              {/* Label Text */}
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className={`relative z-10 text-sm font-bold tracking-wide whitespace-nowrap transition-colors duration-300 ${
                      isActive ? "text-white" : "text-gray-500 group-hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Collapsed Tooltip */}
              <AnimatePresence>
                {isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 0, x: 0 }} // stays hidden normally
                    whileHover={{ opacity: 1, x: 5 }} // shows on hover
                    className="absolute left-[85px] bg-gray-900 text-white text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-xl whitespace-nowrap z-50 shadow-lg pointer-events-none"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </motion.nav>

      {/* ---------------- FOOTER (LOGOUT) ---------------- */}
      <div className="p-4 border-t border-gray-100 relative z-10">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full flex items-center py-3.5 rounded-2xl group transition-colors hover:bg-red-50 text-gray-500 hover:text-red-500 relative"
        >
          <div className="w-[60px] flex justify-center shrink-0">
            <LogOut size={20} className="transition-transform group-hover:-translate-x-1" />
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-bold tracking-wide whitespace-nowrap"
              >
                Log Out
              </motion.span>
            )}
          </AnimatePresence>

          {/* Collapsed Tooltip for Logout */}
          <AnimatePresence>
            {isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 0, x: 0 }}
                whileHover={{ opacity: 1, x: 5 }}
                className="absolute left-[85px] bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-xl whitespace-nowrap z-50 shadow-lg pointer-events-none"
              >
                Log Out
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default UserSidebar;