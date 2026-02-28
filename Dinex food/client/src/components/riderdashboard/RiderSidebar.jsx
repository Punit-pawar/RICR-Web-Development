import React from "react";
import toast from "react-hot-toast";
import api from "../../config/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  UserRound,
  Bike,
  History,
  Info,
  Menu,
  LogOut,
  ChevronLeft,
  Map
} from "lucide-react";

const menuItems = [
  { id: "overview", label: "Rider Hub", icon: LayoutDashboard },
  { id: "profile", label: "My Profile", icon: UserRound },
  { id: "orders", label: "Live Orders", icon: Bike },
  { id: "OrderHistory", label: "Order History", icon: History },
  { id: "helpdesk", label: "Rider Help Desk", icon: Info },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

const RiderSidebar = ({ active, setActive, isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser("");
      setIsLogin(false);
      sessionStorage.removeItem("DineXUser");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout Failed");
    }
  };

  return (
    <div className="h-full py-4 pl-4 pr-2 bg-gray-50/50">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ width: isCollapsed ? 88 : 280, x: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0, duration: 0.6 }}
        className="h-full relative flex flex-col bg-white/80 backdrop-blur-2xl rounded-[2rem] border border-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] z-40 overflow-visible"
      >
        {/* 🎨 Ambient Map & Glowing Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]">
          {/* Subtle moving abstract route/map icon in background */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -right-32 text-indigo-50/40"
          >
            <Map size={400} strokeWidth={0.5} />
          </motion.div>
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-indigo-50/80 to-transparent" />
        </div>

        {/* ---------------- FLOATING TOGGLE BUTTON ---------------- */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-10 p-2.5 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-colors z-50 flex items-center justify-center"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            {isCollapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
          </motion.div>
        </motion.button>

        {/* ---------------- HEADER ---------------- */}
        <div className="flex items-center h-28 px-6 relative z-20">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div
                key="expanded-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                className="w-full flex flex-col justify-center"
              >
                <div className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-1.5">
                  DineX
                  <span className="bg-gradient-to-br from-indigo-500 to-blue-600 bg-clip-text text-transparent">
                    Rider
                  </span>
                </div>
                {/* Radar Pulse Status */}
                <div className="flex items-center gap-2 mt-1.5 bg-green-50 w-max px-2.5 py-1 rounded-full border border-green-100">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-green-700">
                    Active
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed-header"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="w-full flex justify-center"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
                  D
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
          className="flex-1 px-4 py-4 space-y-2 relative z-10 overflow-y-auto overflow-x-visible scrollbar-hide"
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
                {/* Active State: Neon Left Border & Soft Fade */}
                {isActive && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute left-0 top-1 bottom-1 w-1.5 bg-indigo-500 rounded-r-full shadow-[0_0_12px_rgba(99,102,241,0.8)] z-20"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                
                {isActive && (
                  <motion.div
                    layoutId="activeBg"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-50/80 to-transparent rounded-2xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Hover State Background */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gray-50/80 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}

                {/* Icon Container */}
                <motion.div 
                  className="relative z-10 w-[56px] flex justify-center shrink-0"
                  whileHover={!isActive ? { scale: 1.15, rotate: 8 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={`transition-colors duration-300 ${
                      isActive ? "text-indigo-600 drop-shadow-sm" : "text-gray-400 group-hover:text-indigo-500"
                    }`}
                  />
                </motion.div>

                {/* Label Text */}
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className={`relative z-10 text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-300 transform ${
                        isActive 
                          ? "text-indigo-900 translate-x-1" 
                          : "text-gray-500 group-hover:text-gray-800 group-hover:translate-x-2"
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Collapsed Tooltip */}
                {isCollapsed && (
                  <div className="absolute left-full ml-6 bg-white text-gray-800 text-xs font-bold tracking-wide px-4 py-2.5 rounded-xl whitespace-nowrap z-50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100 pointer-events-none opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 duration-300 flex items-center gap-2">
                    {item.label}
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-l border-b border-gray-100"></div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </motion.nav>

        {/* ---------------- FOOTER (LOGOUT) ---------------- */}
        <div className="p-4 relative z-10 mb-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full flex items-center py-4 rounded-2xl group transition-all duration-300 bg-gray-50 hover:bg-red-50 border border-transparent hover:border-red-100 relative overflow-hidden"
          >
            <div className="w-[56px] flex justify-center shrink-0 relative z-10">
              <LogOut size={20} className="text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
            </div>

            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-bold tracking-wide text-gray-500 group-hover:text-red-600 whitespace-nowrap relative z-10 transition-colors duration-300"
                >
                  End Shift
                </motion.span>
              )}
            </AnimatePresence>

            {/* Collapsed Tooltip for Logout */}
            {isCollapsed && (
              <div className="absolute left-full ml-6 bg-red-500 text-white text-xs font-bold tracking-wide px-4 py-2.5 rounded-xl whitespace-nowrap z-50 shadow-xl shadow-red-500/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 duration-300 flex items-center gap-2">
                End Shift
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rotate-45"></div>
              </div>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default RiderSidebar;