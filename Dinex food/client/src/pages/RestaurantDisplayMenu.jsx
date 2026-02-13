import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../config/Api";
import toast from "react-hot-toast";

const RestaurantDisplayMenu = () => {
  const { id: restaurantId } = useParams();

  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurantMenu = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/public/restaurant-menu/${restaurantId}/1`);
      setMenu(res?.data?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantId) fetchRestaurantMenu();
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading menu...
      </div>
    );
  }

  if (!menu.length) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        No menu items available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6"
      >
        Restaurant Menu
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {menu.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            {/* Image */}
            <div className="h-40 w-full bg-gray-100">
              <img
                src={item.images?.[0]?.url}
                alt={item.itemName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              {/* Name + Price */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">
                  {item.itemName}
                </h2>
                <span className="font-semibold text-green-600">
                  ₹ {item.price}
                </span>
              </div>

              {/* Meta Info */}
              <div className="text-sm text-gray-500 mt-1">
                <p>{item.cuisine}</p>
                <p>{item.servingSize} • {item.preparationTime}</p>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                  {item.type}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                {item.description}
              </p>

              {/* Availability */}
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.availability === "available"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />
                <span className="text-xs text-gray-500 capitalize">
                  {item.availability}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDisplayMenu;
 