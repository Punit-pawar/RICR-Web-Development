import React, { useEffect, useState } from "react";
import api from "../../config/Api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FiClock, FiShoppingBag } from "react-icons/fi";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/customer/orders");

      const fetchedOrders = res?.data?.data || [];
      setOrders(fetchedOrders);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Unable to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
        <div className="text-gray-500 text-lg animate-pulse">
          Loading your orders...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Your Orders
          </h1>
          <p className="text-sm text-gray-500">
            Track your recent and past orders
          </p>
        </div>

        {/* EMPTY STATE */}
        {orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-sm p-12 text-center"
          >
            <FiShoppingBag
              size={42}
              className="mx-auto text-gray-300 mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-700">
              No Orders Yet
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Start exploring restaurants and place your first order 🚀
            </p>
          </motion.div>
        )}

        {/* ORDERS */}
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-100"
            >

              {/* TOP */}
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {order.restaurant?.restaurantName}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Order ID: {order._id}
                  </p>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                    ${statusStyles[order.status] || "bg-gray-100 text-gray-600"}
                  `}
                >
                  {order.status}
                </div>
              </div>

              {/* ITEMS */}
              <div className="space-y-3">
                {order.items?.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center bg-gray-50 rounded-2xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.images?.[0]?.url}
                        alt=""
                        className="w-14 h-14 object-cover rounded-xl"
                      />

                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {item.itemName}
                        </div>
                        <div className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-gray-800">
                      ₹ {item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-5">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <FiClock size={14} />
                  {new Date(order.createdAt).toLocaleString()}
                </div>

                <div className="text-xl font-bold text-gray-900">
                  ₹ {order.totalAmount}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
