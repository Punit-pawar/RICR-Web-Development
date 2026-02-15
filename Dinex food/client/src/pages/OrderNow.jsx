import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

const OrderNow = () => {
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState();

  const fetctAllRestaurants = async () => {
    setLoading(true);
    try {
      const res = await api.get("/public/allRestaurants");
      setRestaurant(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetctAllRestaurants();
  }, []);

  const handleRestaurantClick = () => {
    console.log("Restaurant Clicked");
  };

  if (loading) {
    return (
      <div className="h-[80vh]">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-4 gap-4 mt-4 mx-10">
        {restaurant &&
          restaurant.map((EachRestaurant, idx) => (
            <div
              className="h-100 border border-gray-100 rounded-xl p-2 group cursor-pointer hover:scale-103 hover:shadow-xl hover:border-(--color-secondary) duration-100"
              key={idx}
              onClick={handleRestaurantClick}
            >
              <img
                src={EachRestaurant.photo.url}
                alt=""
                className="w-full h-[50%] object-cover rounded-t-xl"
              />
              <div className="text-2xl font-semibold text-(--color-secondary)">
                {EachRestaurant.restaurantName}
              </div>
              <div>{EachRestaurant.cuisine}</div>
              <div>{EachRestaurant.address}</div>
              <div>{EachRestaurant.city}</div>
              <div>{EachRestaurant.pin}</div>
              <div>{EachRestaurant.mobileNumber}</div>
              <div className="flex float-end items-center text-(--color-secondary) gap-2 group-hover:border-b-2 w-fit">
                Explore Menu <FaArrowRight />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default OrderNow;