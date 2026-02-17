import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../config/Api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FiClock, FiShoppingCart } from "react-icons/fi";

const RestaurantDisplayMenu = () => {
  const { isLogin, role } = useAuth();
  const navigate = useNavigate();
  const data = useLocation().state;

  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState(null);
  const [cartFlag, setCartFlag] = useState([]);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/public/restaurant/menu/${data._id}`);
      setMenuItems(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart?.cartItem?.length) {
      setCart(storedCart);
      setCartFlag(storedCart.cartItem.map(item => item._id));
    }
  }, []);

  const handleAddToCart = (NewItem) => {
    let newCart;

    if (cart) {
      if (cart.resturantID !== NewItem.resturantID._id) {
        toast.error("Clear the cart first");
        return;
      }

      const existingItem = cart.cartItem.find(
        item => item._id === NewItem._id
      );

      let updatedItems;

      if (existingItem) {
        updatedItems = cart.cartItem.map(item =>
          item._id === NewItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...cart.cartItem, { ...NewItem, quantity: 1 }];
      }

      newCart = {
        ...cart,
        cartItem: updatedItems,
        cartValue: updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    } else {
      newCart = {
        resturantID: NewItem.resturantID._id,
        cartItem: [{ ...NewItem, quantity: 1 }],
        cartValue: Number(NewItem.price),
      };
    }

    setCart(newCart);
    setCartFlag(newCart.cartItem.map(item => item._id));
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  };

  const handleCheckout = () => {
    if (isLogin && role === "customer") {
      navigate("/checkout-page");
    } else {
      toast.error("Please Login as Customer");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20 text-gray-500">
        Loading delicious items...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen pb-32">
      
      {/* RESTAURANT HERO */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden shadow-lg"
        >
          <img
            src={data.photo.url}
            alt=""
            className="w-full h-56 object-cover"
          />

          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <div className="absolute bottom-0 p-6 text-white">
            <h1 className="text-3xl font-bold">{data.restaurantName}</h1>
            <p className="text-sm opacity-90">{data.cuisine}</p>
            <p className="text-xs opacity-70">{data.city}</p>
          </div>
        </motion.div>
      </div>

      {/* MENU TITLE */}
      <div className="max-w-6xl mx-auto px-4 mt-10 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Recommended Items</h2>
        <p className="text-sm text-gray-500">
          Handpicked favourites just for you
        </p>
      </div>

      {/* MENU LIST */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-5">
        {menuItems.map((EachItem) => (
          <motion.div
            key={EachItem._id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="flex">
              
              {/* IMAGE */}
              <img
                src={EachItem.images?.[0]?.url}
                alt=""
                className="w-32 h-32 object-cover"
              />

              {/* CONTENT */}
              <div className="flex flex-col justify-between p-4 w-full">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {EachItem.itemName}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {EachItem.description}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>{EachItem.servingSize}</span>
                    <span className="flex items-center gap-1">
                      <FiClock size={12} />
                      {EachItem.preparationTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="text-lg font-bold text-gray-900">
                    ₹{EachItem.price}
                  </div>

                  <button
                    onClick={() => handleAddToCart(EachItem)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition
                      ${
                        cartFlag.includes(EachItem._id)
                          ? "bg-green-500 text-white"
                          : "bg-black text-white hover:scale-105"
                      }
                    `}
                  >
                    {cartFlag.includes(EachItem._id)
                      ? "Added"
                      : "Add"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FLOATING CHECKOUT BAR */}
      {cart && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-5 left-0 right-0 flex justify-center"
        >
          <div className="bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6">
            
            <div className="flex items-center gap-2 text-sm">
              <FiShoppingCart />
              {cart.cartItem.length} items
            </div>

            <div className="text-sm font-semibold">
              ₹ {cart.cartValue}
            </div>

            <button
              onClick={handleCheckout}
              className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:scale-105 transition"
            >
              Checkout
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RestaurantDisplayMenu;
