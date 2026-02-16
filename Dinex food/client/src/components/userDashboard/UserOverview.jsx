import React from "react";
import {
  FaShoppingBag,
  FaHeart,
  FaStar,
  FaTruck,
} from "react-icons/fa";
import { motion } from "framer-motion";

const UserOverview = () => {
  const stats = [
    {
      title: "Orders",
      value: 0,
      icon: FaShoppingBag,
      gradient: "from-blue-400 to-indigo-500",
    },
    {
      title: "Wishlist",
      value: 0,
      icon: FaHeart,
      gradient: "from-pink-400 to-rose-500",
    },
    {
      title: "Reviews",
      value: 0,
      icon: FaStar,
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      title: "Active Orders",
      value: 0,
      icon: FaTruck,
      gradient: "from-green-400 to-emerald-500",
    },
  ];

  return (
    <div className="relative h-full overflow-y-auto p-8 bg-gradient-to-br from-gray-100 via-white to-gray-100">

      {/* Decorative Background */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-blue-200 opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-52 h-52 bg-pink-200 opacity-20 rounded-full blur-3xl" />

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-3xl font-bold text-gray-800">
          My Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Overview of your account activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={idx}
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative p-6 rounded-3xl bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all"
            >
              <div
                className={`absolute inset-0 rounded-3xl opacity-10 bg-gradient-to-br ${stat.gradient}`}
              />

              <div className="relative flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {stat.title}
                  </p>
                  <h2 className="text-3xl font-bold text-gray-800 mt-2">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white text-xl shadow-md`}
                >
                  <Icon />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10 relative z-10">

        {/* Recent Orders */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="rounded-3xl bg-white border border-gray-100 shadow-md p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Orders
          </h2>

          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <FaShoppingBag className="text-3xl mb-3 opacity-40" />
            No orders found
          </div>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="rounded-3xl bg-white border border-gray-100 shadow-md p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Profile
          </h2>

          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <FaStar className="text-3xl mb-3 opacity-40" />
            Profile details will appear here
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserOverview;
