import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../config/Api";
import Loading from "../components/Loading";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderNow = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  const fetchAllRestaurants = async () => {
    setLoading(true);
    try {
      const res = await api.get("/public/allRestaurants");
      setRestaurants(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
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
      <div className="h-[80vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 relative overflow-hidden">
      
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-300 opacity-20 blur-3xl rounded-full"
        animate={{ x: [0, 60, 0], y: [0, -60, 0] }}
        transition={{ repeat: Infinity, duration: 14 }}
        style={{ top: "5%", left: "5%" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-purple-300 opacity-20 blur-3xl rounded-full"
        animate={{ x: [0, -70, 0], y: [0, 70, 0] }}
        transition={{ repeat: Infinity, duration: 18 }}
        style={{ bottom: "5%", right: "5%" }}
      />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Discover Amazing Food Near You 🍽️
          </h1>
          <p className="text-gray-500 mt-3">
            Choose from top-rated restaurants and enjoy fast delivery
          </p>
        </motion.div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -8, scale: 1.03 }}
              onClick={() => handleRestaurantClick(restaurant)}
              className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 cursor-pointer overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={restaurant.photo?.url}
                  alt={restaurant.restaurantName}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
              </div>

              {/* Content */}
              <div className="p-4 space-y-1">
                <h2 className="font-semibold text-lg text-gray-800">
                  {restaurant.restaurantName}
                </h2>

                <p className="text-sm text-gray-500">
                  {restaurant.cuisine}
                </p>

                <p className="text-xs text-gray-400 truncate">
                  {restaurant.address}, {restaurant.city}
                </p>

                {/* Explore */}
                <div className="flex items-center gap-2 text-sm text-purple-600 pt-2 font-medium">
                  Explore Menu
                  <motion.span
                    className="group-hover:translate-x-1 transition"
                  >
                    <FaArrowRight size={12} />
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderNow;
