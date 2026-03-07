import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import api from "../config/Api";
import logo from "../assets/logo.png";

const PromoCode = {
  NEW50: 50,
  SAVE20: 20,
  CRAVE10: 10,
};

const AvailablePaymentMethod = [
  { id: "razorPay", label: "Pay Online" },
  { id: "cod", label: "Cash on Delivery" },
];
const CheckoutPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");

  // Tax and charges calculation
  const TAX_RATE = 0.05; // 5% tax
  const DELIVERY_CHARGE = 50;

  useEffect(() => {
    if (!user || !cart || cart.cartItem.length === 0) {
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

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      return { ...prev, cartItem: updatedItems, cartValue: newTotal };
    });
  };

  const handleRemoveItem = (itemId) => {
    setCart((prev) => {
      const itemToRemove = prev.cartItem.find((item) => item._id === itemId);
      const newTotal =
        prev.cartValue - itemToRemove.price * itemToRemove.quantity;
      const updatedItems = prev.cartItem.filter((item) => item._id !== itemId);

      if (updatedItems.length === 0) {
        toast.error("Cart is now empty!");
        navigate("/order-now");
        return prev;
      }

      return { ...prev, cartItem: updatedItems, cartValue: newTotal };
    });
  };

  const calculatePrices = () => {
    const subtotal = cart?.cartValue || 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + DELIVERY_CHARGE;
    return { subtotal, tax, total };
  };

  const handlePromoCodeApply = () => {
    const discountPercent = PromoCode[promoCode.toUpperCase()];
    if (discountPercent) {
      const { subtotal } = calculatePrices();
      const discountAmount = (subtotal * discountPercent) / 100;
      const newSubTotal = subtotal - discountAmount;

      console.log("Applying promo code:", {
        promoCode,
        discountPercent,
        discountAmount,
        oldSubTotal: subtotal,
        newSubTotal: newSubTotal,
      });
      setCart((prev) => ({
        ...prev,
        cartValue: newSubTotal,
      }));
      toast.success(
        `Promo code applied! You saved ₹${discountAmount.toFixed(2)}`,
      );
      setAppliedPromo(true);
    } else {
      toast.error("Invalid promo code");
    }
  };

  const GeneratePayload = () => {
    const { subtotal, tax, total } = calculatePrices();
    return {
      restaurantId: cart.resturantID,
      userId: user._id,
      items: [...cart.cartItem],
      orderValue: {
        subtotal,
        tax,
        total,
        promoCode,
        deliveryFee: 50,
        discountPercentage: PromoCode[promoCode.toUpperCase()],
        paymentMethod,
        paymentStatus,
      },
      status: "pending",
      review: {},
    };
  };

  const handlePayment = async () => {
    try {
      //call Payment gateway API
      setPaymentStatus("paid");
    } catch (error) {
      setPaymentStatus("failed");
    }
  };

  const handleRazorpayPayment = async () => {
    const { total } = calculatePrices();
    try {
      const keyRes = await api.get("/payment/getRazorpayKey");
      const key = keyRes.data.key;

      const orderRes = await api.post("/payment/createOrder", {
        amount: total,
      });

      const orderdata = orderRes.data;

      const option = {
        key,
        amount: orderdata.amount,
        currency: orderdata.currency,
        name: "Cravings", //your business name
        description: "Test Transaction",
        image: "https://placehold.co/600x400?text=CR",
        order_id: orderdata.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${import.meta.env.VITE_FRONTEND_URL}/paymentSuccess`,
        prefill: {
          name: user.fullName, //your customer's name
          email: user.email,
          contact: user.mobileNumber, //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F16D34",
        },
      };

      const razorpay = new window.Razorpay(option);
      razorpay.open();

      razorpay.on("payment.failed", function (response) {
        console.log("Payment Failed");
        toast.error("Payment Failed");
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handlePlaceOrder = async () => {
    if (!user || !cart) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    setIsProcessing(true);

    console.log("Lets Start Payment");

    if (paymentMethod === "razorPay") {
      console.log("Calling RazorPay");

      handleRazorpayPayment();
    }

    // handlePayment();

    // const payload = GeneratePayload();
    // console.log(payload);

    // try {
    //   const res = await api.post("/user/placeorder", payload);
    //   toast.success(res.data.message);
    //   localStorage.removeItem("cart");
    //   navigate("/user-dashboard", { state: { tab: "orders" } });
    // } catch (error) {
    //   console.error("Order placement error:", error);
    //   toast.error(error?.response?.data?.message || "Failed to place order");
    // } finally {
    //   setIsProcessing(false);
    // }
  };

  if (!user || !cart) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const { subtotal, tax, total } = calculatePrices();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            Order Checkout
          </h1>
          <p className="text-gray-600 mt-2">
            Review your order and complete the payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Order Items */}
          <div className="lg:col-span-2">
            {/* Order Items Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--color-primary)" }}
              >
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-4">
                {cart.cartItem && cart.cartItem.length > 0 ? (
                  cart.cartItem.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 border-b pb-4 hover:bg-gray-50 p-3 rounded transition"
                    >
                      {/* Item Image */}
                      <div className="shrink-0">
                        <img
                          src={item.images?.[0]?.url || "🍔"}
                          alt={item.itemName}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <h3
                          className="text-lg font-bold"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {item.itemName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.cuisine} • {item.type}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {item.servingSize}
                          </span>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            {item.preparationTime}
                          </span>
                        </div>
                        <div className="text-lg font-semibold text-green-600 mt-2">
                          ₹{item.price}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-red-500 hover:text-red-700 transition p-2"
                          title="Remove item"
                        >
                          <FaTrash />
                        </button>

                        <div
                          className="flex items-center border rounded-lg overflow-hidden"
                          style={{
                            borderColor: "var(--color-secondary)",
                          }}
                        >
                          <button
                            onClick={() => handleQuantityChange(item._id, -1)}
                            className="p-2 hover:bg-gray-100 transition"
                            style={{
                              backgroundColor:
                                item.quantity === 1 ? "#f3f4f6" : "white",
                            }}
                            disabled={item.quantity === 1}
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="px-4 font-bold text-lg w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item._id, 1)}
                            className="p-2 hover:bg-gray-100 transition"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right mt-2">
                          <p className="text-sm text-gray-600">Subtotal</p>
                          <p
                            className="text-lg font-bold"
                            style={{ color: "var(--color-secondary)" }}
                          >
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 text-lg">Your cart is empty</p>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Address Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--color-primary)" }}
              >
                Delivery Address
              </h2>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p
                  className="font-bold text-lg"
                  style={{ color: "var(--color-primary)" }}
                >
                  {user.fullName}
                </p>
                <p className="text-gray-700 mt-2">{user.address}</p>
                <p className="text-gray-700">
                  {user.city}, {user.pin}
                </p>
                <p className="text-gray-700 mt-2">📞 {user.mobileNumber}</p>
              </div>

              <button
                onClick={() =>
                  navigate("/user-dashboard", { state: { tab: "profile" } })
                }
                className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 font-semibold transition"
              >
                ✎ Edit Address
              </button>
            </div>
          </div>

          {/* Right Section - Price Summary & Payment */}
          <div className="lg:col-span-1">
            {/* Price Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2
                className="text-xl font-bold mb-6"
                style={{ color: "var(--color-primary)" }}
              >
                Price Details
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Tax (5%)</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Delivery Charge</span>
                  <span className="font-semibold">
                    ₹{DELIVERY_CHARGE.toFixed(2)}
                  </span>
                </div>

                <div className="border-t pt-4 flex justify-between">
                  <span
                    className="text-lg font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Total Amount
                  </span>
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3
                  className="font-bold mb-3"
                  style={{ color: "var(--color-primary)" }}
                >
                  Promo Code
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    name="promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none disabled:bg-gray-100"
                    style={{ borderColor: "var(--color-secondary)" }}
                    disabled={appliedPromo}
                  />
                  <button
                    style={{ backgroundColor: "var(--color-secondary)" }}
                    className="text-white px-4 py-2 rounded hover:opacity-90 transition disabled:opacity-50"
                    onClick={handlePromoCodeApply}
                    disabled={appliedPromo}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6 border-t pt-6 mt-6">
                <h3
                  className="font-bold mb-4"
                  style={{ color: "var(--color-primary)" }}
                >
                  Payment Method
                </h3>

                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="razorPay"
                      checked={paymentMethod === "razorPay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 text-gray-700">{"Pay Online"}</span>
                  </label>
                  {total < 1000 && (
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 text-gray-700">
                        {"Cash on Delivery"}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                style={{
                  backgroundColor: "var(--color-secondary)",
                }}
                className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>

              {/* Continue Shopping Link */}
              <button
                onClick={() => navigate(-1)}
                className="w-full mt-3 text-blue-600 font-semibold py-2 rounded-lg hover:text-blue-800 transition"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;