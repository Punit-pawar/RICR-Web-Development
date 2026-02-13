import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../config/Api";
import toast from "react-hot-toast";

const OrderNow = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllRestaurant = async () => {
    setLoading(true);
    try {
      const res = await api.get("/public/allRestaurants");
      setRestaurants(res?.data?.data || []);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRestaurant();
  }, []);

  const handleResturantClick = (restaurantID) => {
    navigate(`/restaurant/${restaurantID}`);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading restaurants...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">Order Now</h1>
        <p className="text-gray-500 mt-2">
          Discover restaurants and enjoy your favorite meals
        </p>
      </motion.div>

      {/* Empty State */}
      {!restaurants.length ? (
        <div className="text-center text-gray-400">
          No restaurants available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant, idx) => (
            <motion.div
              key={restaurant._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              whileHover={{ y: -5 }}
              onClick={() => handleResturantClick(restaurant._id)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
            >
              {/* Image (important for beauty) */}
              <div className="h-36 bg-gray-200">
                <img
                  src={
                    restaurant.images?.[0]?.url ||
                    "https://via.placeholder.com/300x200"
                  }
                  alt={restaurant.restaurantName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                {/* Name */}
                <h2 className="font-semibold text-lg text-gray-800">
                  {restaurant.restaurantName}
                </h2>

                {/* Cuisine Chips */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {restaurant.cuisine
                    ?.split(", ")
                    ?.slice(0, 3)
                    ?.map((cuisine, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full capitalize"
                      >
                        {cuisine.toLowerCase()}
                      </span>
                    ))}
                </div>

                {/* Optional subtle footer */}
                <div className="mt-3 text-xs text-gray-400">
                  Click to view menu →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderNow;
