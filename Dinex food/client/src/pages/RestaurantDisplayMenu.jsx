import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../config/Api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock, FiShoppingCart, FiChevronLeft, FiInfo, FiTrash2, FiPlus } from "react-icons/fi";
import Loading from "../components/Loading";

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
        toast.error("Clear the basket first to add items from another restaurant");
        return;
      }
      const existingItem = cart.cartItem.find(item => item._id === NewItem._id);
      let updatedItems;
      if (existingItem) {
        updatedItems = cart.cartItem.map(item =>
          item._id === NewItem._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedItems = [...cart.cartItem, { ...NewItem, quantity: 1 }];
      }
      newCart = {
        ...cart,
        cartItem: updatedItems,
        cartValue: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
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

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart(null);
    setCartFlag([]);
    window.dispatchEvent(new Event("storage"));
    toast.success("Basket cleared");
  };

  const handleCheckout = () => {
    if (isLogin && role === "customer") {
      navigate("/checkout-page");
    } else {
      toast.error("Please login to proceed");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [data]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FAFBFF]">
        <Loading />
        <p className="text-indigo-400 mt-6 text-xs uppercase tracking-widest animate-pulse font-medium">
          Preparing Menu...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFBFF] min-h-screen pb-40 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 🔙 MINIMAL BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-6 pt-8 absolute z-30">
        <motion.button 
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="h-12 w-12 flex items-center justify-center bg-white/80 backdrop-blur-xl rounded-full text-slate-900 border border-slate-200 hover:bg-indigo-600 hover:text-white hover:border-transparent transition-all shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
        >
          <FiChevronLeft size={22} />
        </motion.button>
      </div>

      {/* 🖼️ CINEMATIC HERO SECTION */}
      <div className="relative h-[65vh] w-full overflow-hidden bg-slate-900">
        <motion.img
          initial={{ scale: 1.1, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={data?.photo?.url}
          className="w-full h-full object-cover opacity-90"
          alt={data?.restaurantName}
        />
        {/* Dark gradient kept on the image so the white text always remains readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] block mb-2 drop-shadow-md">
                {data?.cuisine} • Premium Partner
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none drop-shadow-2xl">
                {data?.restaurantName}
              </h1>
              <div className="flex items-center gap-8 text-white/90 font-medium tracking-wide pt-2">
                <span className="flex items-center gap-2 text-sm uppercase tracking-widest drop-shadow-md">
                  <FiClock className="text-indigo-400" size={16} /> 15-25 min
                </span>
                <span className="flex items-center gap-2 text-sm uppercase tracking-widest drop-shadow-md">
                  <FiInfo className="text-indigo-400" size={16} /> {data?.city}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 🍽️ THE TASTING MENU */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 pt-16">
        <div className="flex items-center justify-between mb-12 px-4">
          <h2 className="text-2xl md:text-4xl font-light text-slate-400 tracking-tight">
            The <span className="font-black text-indigo-600">Collection</span>
          </h2>
          <div className="hidden md:block h-[1px] flex-grow mx-8 bg-gradient-to-r from-indigo-100 to-transparent" />
        </div>

        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {menuItems.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group flex flex-col sm:flex-row gap-6 bg-white p-4 rounded-[2rem] border border-slate-100 hover:border-indigo-200 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.1)] transition-all duration-500"
            >
              {/* ITEM IMAGE */}
              <div className="relative shrink-0 w-full sm:w-44 h-56 sm:h-44 overflow-hidden rounded-[1.5rem] bg-slate-50">
                <img
                  src={item.images?.[0]?.url}
                  alt={item.itemName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-indigo-900/5 group-hover:bg-transparent transition-colors" />
              </div>

              {/* ITEM DETAILS */}
              <div className="flex flex-col justify-between py-2 flex-grow min-w-0 pr-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                    {item.itemName}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed font-light">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-[9px] font-black text-indigo-700 bg-indigo-50 uppercase tracking-widest border border-indigo-100 px-3 py-1.5 rounded-full">
                      {item.servingSize}
                    </span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <FiClock size={12} className="text-indigo-500" /> {item.preparationTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 sm:mt-0 pt-4 border-t border-slate-50">
                  <span className="text-2xl font-light text-slate-900 tracking-tight">
                    ₹{item.price}
                  </span>
                  
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddToCart(item)}
                    className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${cartFlag.includes(item._id)
                        ? "bg-emerald-500 text-white shadow-[0_8px_20px_rgba(16,185,129,0.3)]"
                        : "bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-[0_8px_20px_rgba(79,70,229,0.3)]"
                      }
                    `}
                  >
                    {cartFlag.includes(item._id) ? "✓" : <FiPlus size={20} />}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 🛍️ LUXURY FLOATING CHECKOUT ISLAND (DARK/INDIGO) */}
      <AnimatePresence>
        {cart && cart.cartItem.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-0 right-0 z-[100] px-4"
          >
            <div className="max-w-3xl mx-auto bg-slate-900/95 backdrop-blur-2xl text-white p-3 pr-3 pl-6 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(79,70,229,0.25)] border border-slate-700/50 flex items-center justify-between gap-4">
              
              <div className="flex items-center gap-6">
                {/* Cart Icon & Total */}
                <div className="flex items-center gap-4">
                  <div className="relative hidden sm:flex h-12 w-12 bg-indigo-600 rounded-full items-center justify-center shadow-inner">
                    <FiShoppingCart size={18} className="text-white" />
                    <span className="absolute -top-1 -right-1 bg-white text-indigo-600 text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center ring-4 ring-slate-900 shadow-sm">
                      {cart.cartItem.length}
                    </span>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Your Order</p>
                    <p className="text-2xl font-light tracking-tighter">₹{cart.cartValue}</p>
                  </div>
                </div>

                {/* 🗑️ RESET BASKET */}
                <button
                  onClick={handleClearCart}
                  className="flex items-center gap-2 group ml-2 sm:ml-4 border-l border-slate-700 pl-6"
                >
                  <div className="h-8 w-8 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-red-500/50 group-hover:bg-red-500/10 group-hover:text-red-400 transition-all text-slate-400">
                    <FiTrash2 size={14} />
                  </div>
                  <span className="hidden md:inline text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-red-400 transition-colors">
                    Reset
                  </span>
                </button>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleCheckout}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 sm:px-10 py-4 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.1em] transition-all active:scale-95 shadow-[0_10px_30px_rgba(79,70,229,0.3)] flex items-center gap-3"
              >
                Checkout
                <FiChevronLeft className="rotate-180 text-white/70" size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantDisplayMenu;