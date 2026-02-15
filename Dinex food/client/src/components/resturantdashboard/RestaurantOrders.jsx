import React, { useEffect, useState } from "react";
import api from "../../config/Api";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

const RestaurantOrders = () => {
  const [restaurants, setRestaurants] = useState([]); // FIXED
  const [loading, setLoading] = useState(false);

  const fetchAllRestaurant = async () => {
    setLoading(true);
    try {
      const res = await api.get("/public/allRestaurants");
      setRestaurants(res.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to load restaurants"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRestaurant();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 p-6">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Order Now</h1>
        <p className="text-gray-500 mt-2">
          Browse restaurants and enjoy your favorite meals
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-gray-500 py-20">
          Loading restaurants...
        </div>
      ) : restaurants.length > 0 ? (

        /* Restaurants Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((restaurant, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl 
              transition duration-300 cursor-pointer border border-gray-100
              hover:-translate-y-1"
            >
              
              {/* Image / Placeholder */}
              {restaurant.image ? (
                <img
                  src={restaurant.image}
                  alt={restaurant.restaurantName}
                  className="h-40 w-full object-cover rounded-t-2xl"
                />
              ) : (
                <div className="h-40 w-full bg-gradient-to-r from-orange-200 to-pink-200 rounded-t-2xl" />
              )}

              {/* Content */}
              <div className="p-4">
                <h2 className="font-bold text-lg text-gray-800">
                  {restaurant.restaurantName}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {restaurant.cuisine || "Multi Cuisine"}
                </p>

                <div className="flex items-center justify-between mt-3">
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                    <FaStar className="text-xs" />
                    {restaurant.rating || "4.2"}
                  </div>

                  {/* Delivery Time */}
                  <span className="text-xs text-gray-400">
                    {restaurant.deliveryTime || "30–40 mins"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      ) : (
        /* Empty State */
        <div className="text-center text-gray-400 py-20">
          No restaurants available
        </div>
      )}
    </div>
  );
};

export default RestaurantOrders;
