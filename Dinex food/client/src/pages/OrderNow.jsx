import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import api from "../config/Api";
import Loading from "../components/Loading";
import { ArrowRight, UtensilsCrossed, Star, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-6 pt-20">
        <Loading />
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex flex-col items-center gap-2"
        >
          <p className="text-gray-800 font-bold text-xl">Curating the best kitchens</p>
          <p className="text-gray-500 font-medium text-sm animate-pulse">This will only take a moment...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] relative overflow-hidden selection:bg-purple-200 selection:text-purple-900">
      
      {/* 🌌 Modern Ambient Background (Subtle) */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-[#F8F9FA] z-0" />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-20 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[120px] z-0"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 -left-40 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[120px] z-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        
        {/* ✨ Elevated Hero Header */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-gray-600 text-[11px] font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              Live Delivery Available
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-4">
              Explore Top <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-400">
                Local Restaurants
              </span>
            </h1>
            <p className="text-lg text-gray-500 font-medium max-w-lg leading-relaxed">
              Discover curated menus from the best kitchens around you, delivered hot and fresh to your door.
            </p>
          </motion.div>

          {/* Optional Search/Filter visual placeholder matching the new design language */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center bg-white rounded-2xl p-2 shadow-sm border border-gray-100"
          >
             <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-gray-400">
                <Search size={18} />
                <span className="text-sm font-medium">Search restaurants...</span>
             </div>
          </motion.div>
        </header>

        {/* 🧊 Restaurant Grid */}
        <AnimatePresence mode="wait">
          {restaurants.length === 0 ? (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-32 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100 shadow-inner">
                <UtensilsCrossed className="text-gray-400" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No restaurants available</h3>
              <p className="text-gray-500 font-medium text-center max-w-md">
                We couldn't find any restaurants in your area right now. Please check back later or try a different location.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="restaurant-grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {restaurants.map((restaurant, idx) => (
                <motion.div
                  key={restaurant._id || idx}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  onClick={() => handleRestaurantClick(restaurant)}
                  className="group cursor-pointer bg-white rounded-[2rem] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(76,175,80,0.1)] border border-gray-100 hover:border-purple-100 transition-all duration-300 flex flex-col h-full"
                >
                  
                  {/* Media Container */}
                  <div className="relative h-48 rounded-[1.5rem] overflow-hidden mb-4 bg-gray-100">
                    <img
                      src={restaurant.photo?.url || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"}
                      alt={restaurant.restaurantName}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    {/* Soft gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm border border-white/20">
                      <Star className="text-purple-500 fill-purple-500" size={12} />
                      <span className="text-xs font-bold text-gray-900">
                        {restaurant.rating || "4.5"}
                      </span>
                    </div>

                    {/* Delivery Time Pill (Appears on Hover) */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-gray-900 shadow-sm translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      20-30 min
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="px-2 pb-2 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <h2 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors line-clamp-1">
                        {restaurant.restaurantName}
                      </h2>
                      
                      <div className="text-gray-500 text-sm mb-3 font-medium line-clamp-1">
                        {restaurant.cuisine || "Multi-Cuisine, Beverages"}
                      </div>

                      <div className="flex items-start gap-1.5 text-gray-400 text-xs mb-4">
                        <MapPin size={14} className="shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-relaxed">
                          {restaurant.address}, {restaurant.city}
                        </span>
                      </div>
                    </div>

                    {/* Dynamic CTA Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                      <span className="text-sm font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                        Explore Menu
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center transform group-hover:bg-purple-500 group-hover:text-white group-hover:-rotate-45 transition-all duration-300 shadow-sm">
                        <ArrowRight size={18} />
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