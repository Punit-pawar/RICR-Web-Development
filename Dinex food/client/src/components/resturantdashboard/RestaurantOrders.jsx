import React, { useEffect, useState } from "react";
import api from "../../config/Api"

const RestaurantOrders = () => {
  const [restaurants, setRestaurants] = useState();
  const [loading, setLoading] = useState(false);

  const fetchAllRestaurant = async () => {
    setLoading(true);
    try {
      const res = await api.get("/public/allRestaurants");
      setRestaurants(res.data.data);
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

  console.log(restaurants);

  return (
    <>
      <div className="bg-gray-100 p-3">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800">Order Now</h1>
          <p className="text-gray-600 mt-2">
            Browse our menu and place your order now!
          </p>
        </div>

        {restaurants ? (
          <div>
            {restaurants.map((restaurant, idx) => (
              <div key={idx} className="border">
                {restaurant.restaurantName}
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default RestaurantOrders;