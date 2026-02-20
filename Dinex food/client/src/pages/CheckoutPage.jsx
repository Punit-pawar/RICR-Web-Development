import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import api from "../config/Api";
import { FiTrash2, FiPlus, FiMinus, FiMapPin, FiTag, FiCreditCard, FiSmartphone, FiDollarSign, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Loading from "../components/Loading";

const PromoCode = {
  NEW50: 50,
  SAVE20: 20,
  CRAVE10: 10,
};

const TAX_RATE = 0.05;
const DELIVERY_CHARGE = 40;

// ✨ Animation Variants for Staggered Loading
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const CheckoutPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || null
  );
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!user || !cart || !cart.cartItem || cart.cartItem.length === 0) {
      toast.error("Cart is empty or session expired");
      navigate("/order-now");
    }
  }, []);

  const handleQuantityChange = (itemId, change) => {
    setCart((prev) => {
      const updatedItems = prev.cartItem.map((item) => {
        if (item._id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const updatedCart = { ...prev, cartItem: updatedItems, cartValue: newTotal };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveItem = (itemId) => {
    setCart((prev) => {
      const updatedItems = prev.cartItem.filter((item) => item._id !== itemId);
      if (updatedItems.length === 0) {
        toast.error("Cart is now empty!");
        localStorage.removeItem("cart");
        navigate("/order-now");
        return prev;
      }
      const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const updatedCart = { ...prev, cartItem: updatedItems, cartValue: newTotal };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const calculatePrices = () => {
    const subtotal = cart?.cartValue || 0;
    const discountPercent = appliedPromo ? PromoCode[appliedPromo] : 0;
    const discountAmount = (subtotal * discountPercent) / 100;
    const discountedSubtotal = subtotal - discountAmount;
    const tax = discountedSubtotal * TAX_RATE;
    const total = discountedSubtotal + tax + DELIVERY_CHARGE;
    return { subtotal, discountAmount, tax, total };
  };

  const handlePromoCodeApply = () => {
    const code = promoCode.toUpperCase();
    const discountPercent = PromoCode[code];
    if (!discountPercent) {
      toast.error("Invalid promo code");
      return;
    }
    setAppliedPromo(code);
    toast.success(`Promo applied! ${discountPercent}% discount`);
  };

  const generatePayload = () => {
    const { subtotal, discountAmount, tax, total } = calculatePrices();
    return {
      restaurantId: cart.resturantID,
      userId: user._id,
      items: [...cart.cartItem],
      orderValue: {
        subtotal, discountAmount, tax, total,
        deliveryFee: DELIVERY_CHARGE,
        discountType: appliedPromo,
        discountPercentage: PromoCode[appliedPromo],
        paymentMethod,
      },
      status: "pending",
      review: {},
    };
  };

  const handlePlaceOrder = async () => {
    if (!user || !cart) return navigate("/login");
    setIsProcessing(true);
    try {
      const payload = generatePayload();
      const res = await api.post("/user/placeorder", payload);
      toast.success(res.data.message);
      localStorage.removeItem("cart");
      navigate("/user-dashboard", { state: { tab: "orders" } });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Order failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user || !cart) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FCF8F3]">
        <Loading />
      </div>
    );
  }

  const { subtotal, discountAmount, tax, total } = calculatePrices();

  const paymentOptions = [
    { id: "credit-card", label: "Credit / Debit Card", icon: FiCreditCard },
    { id: "upi", label: "UPI Transfer", icon: FiSmartphone },
    { id: "cod", label: "Cash on Delivery", icon: FiDollarSign },
  ];

  return (
    <div className="min-h-screen bg-[#FCF8F3] pt-12 pb-32 px-4 sm:px-6 font-sans text-gray-900 selection:bg-blue-200 selection:text-blue-900">
      
      <motion.div 
        initial="hidden" 
        animate="show" 
        variants={staggerContainer} 
        className="max-w-7xl mx-auto"
      >
        {/* HEADER */}
        <motion.div variants={fadeUpItem} className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 text-gray-900">
            Secure <span className="text-blue-600">Checkout</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg">Just a few steps away from a delicious meal.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ---------------- LEFT SECTION (CART & ADDRESS) ---------------- */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">

            {/* DELIVERY ADDRESS */}
            <motion.div variants={fadeUpItem} className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-600 p-2.5 rounded-2xl"><FiMapPin size={22} /></span>
                  Delivery Destination
                </h2>
              </div>
              <div className="bg-[#FCF8F3] border border-blue-100/50 p-5 rounded-2xl">
                <p className="text-lg font-bold text-gray-900 mb-1">{user.fullName}</p>
                <p className="text-gray-600 font-medium leading-relaxed">{user.address}</p>
              </div>
            </motion.div>

            {/* ORDER ITEMS */}
            <motion.div variants={fadeUpItem} className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-8">
              <h2 className="text-2xl font-bold mb-8">Review Order</h2>

              <div className="space-y-5">
                <AnimatePresence>
                  {cart.cartItem.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col sm:flex-row gap-6 items-center p-4 rounded-[1.5rem] border border-gray-100 hover:border-blue-200 transition-colors group"
                    >
                      <img
                        src={item.images?.[0]?.url}
                        alt={item.itemName}
                        className="w-full sm:w-28 h-32 sm:h-28 rounded-2xl object-cover shadow-sm group-hover:shadow-md transition-shadow"
                      />

                      <div className="flex-1 text-center sm:text-left w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.itemName}</h3>
                        <p className="text-sm text-gray-500 font-medium mb-4">
                          <span className="text-blue-600 font-bold text-base">₹{item.price}</span> • {item.cuisine}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center sm:justify-start gap-4">
                          <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
                            <button 
                              onClick={() => handleQuantityChange(item._id, -1)}
                              className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-600 hover:text-blue-600 shadow-sm transition-colors active:scale-90"
                            >
                              <FiMinus size={16} />
                            </button>
                            <span className="w-10 text-center font-black text-gray-900">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item._id, 1)}
                              className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-600 hover:text-blue-600 shadow-sm transition-colors active:scale-90"
                            >
                              <FiPlus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="w-11 h-11 flex items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="hidden sm:block text-right pr-4">
                        <p className="text-xs uppercase font-bold text-gray-400 mb-1">Item Total</p>
                        <p className="text-2xl font-black text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>

          {/* ---------------- RIGHT SECTION (SUMMARY & PAYMENT) ---------------- */}
          {/* Using sticky positioning so it stays on screen when scrolling down a long cart */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-8 lg:sticky lg:top-8">

            {/* PROMO CODE */}
            <motion.div variants={fadeUpItem} className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600"><FiTag size={20} /></span> Apply Promo Code
              </h3>
              
              <AnimatePresence mode="wait">
                {appliedPromo ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-between bg-green-50 border border-green-200 p-4 rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <FiCheckCircle className="text-green-600" size={24} />
                      <div className="flex flex-col">
                        <span className="text-green-800 font-bold uppercase tracking-wide">{appliedPromo}</span>
                        <span className="text-green-600 text-xs font-semibold">Code applied successfully!</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setAppliedPromo(null)}
                      className="text-green-700 hover:text-red-500 text-sm font-bold transition-colors p-2"
                    >
                      Remove
                    </button>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-3">
                    <input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. SAVE20"
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all font-medium text-gray-900 uppercase placeholder:normal-case placeholder:font-normal"
                    />
                    <button
                      onClick={handlePromoCodeApply}
                      className="bg-gray-900 text-white px-7 rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-lg active:scale-95"
                    >
                      Apply
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* PAYMENT METHOD */}
            <motion.div variants={fadeUpItem} className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Select Payment Method</h3>
              <div className="space-y-4">
                {paymentOptions.map((method) => {
                  const Icon = method.icon;
                  const isSelected = paymentMethod === method.id;
                  return (
                    <label 
                      key={method.id} 
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        isSelected ? "border-blue-500 bg-blue-50/50" : "border-gray-100 hover:border-blue-200 bg-white"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? "bg-blue-500 text-white shadow-lg shadow-blue-200" : "bg-gray-100 text-gray-500"
                      }`}>
                        <Icon size={20} />
                      </div>
                      <span className={`font-bold text-lg flex-1 ${isSelected ? "text-blue-900" : "text-gray-700"}`}>
                        {method.label}
                      </span>
                      <input
                        type="radio"
                        className="hidden"
                        checked={isSelected}
                        onChange={() => setPaymentMethod(method.id)}
                      />
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-blue-500" : "border-gray-300"}`}>
                        <motion.div 
                          initial={false}
                          animate={{ scale: isSelected ? 1 : 0 }}
                          className="w-3 h-3 bg-blue-500 rounded-full" 
                        />
                      </div>
                    </label>
                  );
                })}
              </div>
            </motion.div>

            {/* SUMMARY & CHECKOUT */}
            <motion.div variants={fadeUpItem} className="bg-gray-900 rounded-[2rem] shadow-2xl p-8 text-white relative overflow-hidden">
              {/* Decorative background circle */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

              <h2 className="text-xl font-bold mb-6 text-white">Payment Summary</h2>

              <div className="space-y-4 text-sm font-medium text-gray-400 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">₹{subtotal.toFixed(2)}</span>
                </div>

                <AnimatePresence>
                  {discountAmount > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between text-green-400"
                    >
                      <span>Discount ({PromoCode[appliedPromo]}%)</span>
                      <span className="font-bold">- ₹{discountAmount.toFixed(2)}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span className="text-white">₹{tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Partner Fee</span>
                  <span className="text-white">₹{DELIVERY_CHARGE}</span>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6 mb-8 flex justify-between items-end">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">Total to Pay</span>
                <span className="text-4xl font-black text-white tracking-tighter">₹{total.toFixed(2)}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={`w-full py-5 rounded-2xl text-[15px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(234,88,12,0.3)]
                  ${isProcessing 
                    ? "bg-blue-400 text-white cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                  }
                `}
              >
                {isProcessing ? "Processing..." : "Confirm Order"}
                {!isProcessing && <FiArrowRight size={20} />}
              </motion.button>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;