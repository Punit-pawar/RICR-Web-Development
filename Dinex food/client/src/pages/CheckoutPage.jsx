import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const DELIVERY_FEE = 40;
const TAX_RATE = 0.05;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);

  // Load Cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));

    if (!storedCart || storedCart.cartItem.length === 0) {
      toast.error("Your cart is empty");
      navigate("/");
      return;
    }

    setCart(storedCart);
  }, []);

  // Calculations
  const calculateSubtotal = (items) =>
    items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );

  const subtotal = cart ? calculateSubtotal(cart.cartItem) : 0;
  const taxes = Math.round(subtotal * TAX_RATE);
  const total = subtotal + taxes + DELIVERY_FEE;

  // Persist Cart
  useEffect(() => {
    if (cart) {
      localStorage.setItem(
        "cart",
        JSON.stringify({ ...cart, cartValue: total })
      );
    }
  }, [total]);

  if (!cart) return null;

  // Quantity Controls
  const increaseQty = (index) => {
    const updated = [...cart.cartItem];
    updated[index].quantity += 1;
    setCart({ ...cart, cartItem: updated });
  };

  const decreaseQty = (index) => {
    const updated = [...cart.cartItem];
    if (updated[index].quantity === 1) return;
    updated[index].quantity -= 1;
    setCart({ ...cart, cartItem: updated });
  };

  const removeItem = (index) => {
    const updated = cart.cartItem.filter((_, i) => i !== index);

    if (updated.length === 0) {
      localStorage.removeItem("cart");
      toast.success("Cart cleared");
      navigate("/");
      return;
    }

    setCart({ ...cart, cartItem: updated });
  };

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully 🎉");
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT — CART ITEMS */}
        <div className="md:col-span-2 space-y-5">

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your Order
          </h1>

          {cart.cartItem.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-4 flex gap-4"
            >
              {/* Image */}
              <img
                src={item.images?.[0]?.url}
                alt={item.itemName}
                className="w-28 h-28 object-cover rounded-xl"
              />

              {/* Details */}
              <div className="flex justify-between w-full">

                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    {item.itemName}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>

                  <div className="mt-3 text-sm text-gray-600">
                    ₹{item.price} × {item.quantity}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col justify-between items-end">

                  <div className="text-lg font-bold text-gray-800">
                    ₹{item.price * item.quantity}
                  </div>

                  <div className="flex items-center gap-2">

                    <button
                      onClick={() => decreaseQty(idx)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    >
                      <FaMinus size={11} />
                    </button>

                    <span className="font-semibold w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(idx)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    >
                      <FaPlus size={11} />
                    </button>

                    <button
                      onClick={() => removeItem(idx)}
                      className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center ml-2"
                    >
                      <FaTrash size={11} />
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — PRICE BREAKDOWN */}
        <div className="bg-white rounded-3xl shadow-lg p-6 h-fit sticky top-6">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Price Details
          </h2>

          <div className="space-y-4 text-gray-600">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Taxes (5%)</span>
              <span>₹{taxes}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{DELIVERY_FEE}</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-800">
              <span>Total Amount</span>
              <span className="text-(--color-primary)">
                ₹{total}
              </span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl text-lg font-semibold hover:scale-105 transition"
          >
            Place Order
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            Secure checkout • Fast delivery 
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
