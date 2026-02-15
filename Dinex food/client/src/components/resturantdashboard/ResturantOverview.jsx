import React from "react";
import {
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
  FaStar,
} from "react-icons/fa";
import { motion } from "framer-motion";

const RestaurantOverview = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "0",
      icon: FaShoppingCart,
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      title: "Active Orders",
      value: "0",
      icon: FaUsers,
      gradient: "from-green-400 to-emerald-500",
    },
    {
      title: "Total Earnings",
      value: "₹0",
      icon: FaRupeeSign,
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      title: "Rating",
      value: "4.5",
      icon: FaStar,
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 bg-gradient-to-br from-gray-100 via-white to-gray-100">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm">
          Welcome back, here’s what’s happening today
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative rounded-2xl bg-white/70 backdrop-blur-lg border border-white/40 shadow-lg p-5 overflow-hidden"
            >
              {/* Glow Gradient Background */}
              <div
                className={`absolute inset-0 opacity-10 bg-gradient-to-br ${stat.gradient}`}
              />

              <div className="relative flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {stat.title}
                  </p>
                  <h2 className="text-3xl font-bold text-gray-800 mt-1">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white text-xl shadow-md`}
                >
                  <Icon />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-6">
        
        {/* Recent Orders */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="rounded-2xl bg-white shadow-lg border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Orders
          </h2>

          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <FaShoppingCart className="text-3xl mb-3 opacity-40" />
            No recent orders to display
          </div>
        </motion.div>

        {/* Weekly Performance */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="rounded-2xl bg-white shadow-lg border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Weekly Performance
          </h2>

          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <FaStar className="text-3xl mb-3 opacity-40" />
            Performance chart will appear here
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantOverview;
