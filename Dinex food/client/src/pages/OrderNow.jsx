import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import api from "../config/Api";
import Loading from "../components/Loading";
import { FaArrowRight, FaUtensils, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const OrderNow = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  const fetchAllRestaurants = async () => {
    setLoading(true);
    try {
      const res = await api.get("/public/allRestaurants");
      setRestaurants(res.data.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const handleRestaurantClick = (restaurantInfo) => {
    navigate("/restaurantMenu", { state: restaurantInfo });
  };

  if (loading) {
    return (
      <div className="h-[90vh] flex flex-col items-center justify-center space-y-4">
        <Loading />
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-slate-400 font-medium animate-pulse"
        >
          Finding the best kitchens...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbff] relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 🌌 Modern Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 60, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-200/30 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        
        {/* ✨ Elevated Hero Header */}
        <header className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
              Premium Selection
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
              Flavor at your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                Front Door.
              </span>
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-lg">
              Explore curated menus from top-rated local favorites, delivered with speed and care.
            </p>
          </motion.div>
        </header>

        {/* 🧊 Restaurant Grid */}
        <AnimatePresence>
          {restaurants.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-white/50 backdrop-blur-md rounded-3xl border-2 border-dashed border-slate-200"
            >
              <FaUtensils className="mx-auto text-slate-200 text-5xl mb-4" />
              <h3 className="text-xl font-bold text-slate-400">No restaurants found today.</h3>
              <p className="text-slate-400">Check back soon for new local flavors!</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {restaurants.map((restaurant, idx) => (
                <motion.div
                  key={restaurant._id || idx}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  onClick={() => handleRestaurantClick(restaurant)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-[2.5rem] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_50px_rgba(79,70,229,0.12)] border border-slate-100 transition-all duration-500">
                    
                    {/* Media Container */}
                    <div className="relative h-52 rounded-[2rem] overflow-hidden mb-4">
                      <img
                        src={restaurant.photo?.url}
                        alt={restaurant.restaurantName}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1 shadow-sm">
                        <FaStar className="text-blue-400" size={12} />
                        <span className="text-xs font-bold text-slate-800">4.8</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-3 pb-4">
                      <h2 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors truncate">
                        {restaurant.restaurantName}
                      </h2>
                      
                      <div className="flex items-center gap-2 text-slate-500 text-sm mb-3 font-medium">
                        <span className="text-indigo-400 italic">
                          {restaurant.cuisine || "Multi-Cuisine"}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          25-35 min
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-5">
                        <FaMapMarkerAlt className="shrink-0" />
                        <span className="truncate">{restaurant.address}, {restaurant.city}</span>
                      </div>

                      {/* Dynamic CTA Button */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-bold text-slate-900">View Menu</span>
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center transform group-hover:bg-indigo-600 group-hover:rotate-[-45deg] transition-all duration-300">
                          <FaArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderNow;