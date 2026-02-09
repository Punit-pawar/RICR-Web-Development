import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../config/Api";
import { useState } from "react";
import toast from "react-hot-toast";

const RestaurantDisplayMenu = () => {
  const restaurantId = useParams().id;
  console.log("Menu Page", restaurantId);

  const [restaurantData, setRestaurantData] = useState();

  const fetchRestaurantMenu = async () => {
    try {
      const res = await api.get(`/public/restaurant-menu/${restaurantId}/1`);
      setRestaurantData(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  useEffect(() => {
    fetchRestaurantMenu();
  }, [restaurantId]);

  console.log(restaurantData || "No data");

  return (
    <>
      <div>RestaurantDisplayMenu</div>
    </>
  );
};

export default RestaurantDisplayMenu;