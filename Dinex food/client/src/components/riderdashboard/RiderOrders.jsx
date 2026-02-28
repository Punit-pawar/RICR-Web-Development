import React, { useEffect, useState } from "react";
import api from "../../config/Api";
// import axios from "axios";
import Loading from "../Loading";
import ViewDetailsModal from "./modals/ViewDetailsModal";
import { useAuth } from "../../context/AuthContext";

const RiderCurrentOrder = () => {
  const { user } = useAuth();
  const [currentOrder, setCurrentOrder] = useState([]);
  const [availableOrder, setAvailableOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewdetailsModalOpen, setViewDetailsModalOpen] = useState(false);
  const [riderLocation, setRiderLocation] = useState(user.geoLocation);

  const statusBadgeClass = (status = "") => {
    if (["delivered"].includes(status)) return "bg-green-100 text-green-800";
    if (["cancelled", "rejected", "refused", "damaged"].includes(status)) {
      return "bg-red-100 text-red-800";
    }
    if (["ready", "pickedUp", "onTheWay"].includes(status)) {
      return "bg-blue-100 text-blue-800";
    }
    return "bg-yellow-100 text-yellow-800";
  };

  const fetchOngoingOrder = async () => {
    setIsLoading(true);
    try {
      let response = await api.get("/rider/ongoingOrder");
      if (response.data.data.length > 0) {
        setCurrentOrder(response.data.data);
        setAvailableOrder([]);
      } else {
        setCurrentOrder([]);
        console.log("riderLocation", riderLocation);
        response = await api.post("/rider/availableOrder", riderLocation);
        setAvailableOrder(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching current order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refershLocation();
  }, []);
  useEffect(() => {
    fetchOngoingOrder();
    const interval = setInterval(() => {
      fetchOngoingOrder();
    }, 1000 * 30); // Refresh every 30 sec
    return () => clearInterval(interval);
  }, []);

  const refershLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(
          "Current Location:",
          position.coords.latitude,
          position.coords.longitude,
        );
        // You can also send this location to the server if needed
        setRiderLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
    );
  };

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Loading />
      </div>
    );
  }


  console.log("Available order : ",availableOrder);
  

  return (
    <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Current Order</h2>
          <button
            onClick={refershLocation}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            Refresh Location
          </button>
        </div>
        <div className="border mt-3" />

        {currentOrder.length > 0 && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {currentOrder.map((order, idx) => (
              <div
                key={order._id || idx}
                className="rounded-lg border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {order.orderNumber || order._id?.substring(0, 8)}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusBadgeClass(order.status)}`}
                  >
                    {order.status || "pending"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                  <div>
                    <p className="text-gray-500">Customer</p>
                    <p className="font-medium text-gray-800">
                      {order.userId?.fullName || "Unknown"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Restaurant</p>
                    <p className="font-medium text-gray-800">
                      {order.restaurantId?.restaurantName ||
                        order.restaurantId?.fullName ||
                        "Unknown"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Amount</p>
                    <p className="font-medium text-gray-800">
                      ₹{order.orderValue?.total || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Items</p>
                    <p className="font-medium text-gray-800">
                      {order.items?.length || 0} item
                      {order.items?.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Payment Method</p>
                    <p className="font-medium text-gray-800 capitalize">
                      {order.orderValue?.paymentMethod || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Placed On</p>
                    <p className="font-medium text-gray-800">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentOrder.length === 0 && availableOrder.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Available Orders
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Order Number
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Customer
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Restaurant
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Total
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Items
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Distance (Km)
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {availableOrder.map((order, idx) => (
                    <tr
                      key={order._id || idx}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-gray-800 font-medium">
                        {order.orderNumber || order._id?.substring(0, 8)}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {order.userId?.fullName || "Unknown"}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {order.restaurantId?.restaurantName ||
                          order.restaurantId?.fullName ||
                          "Unknown"}
                      </td>
                      <td className="px-4 py-3 text-gray-800 font-semibold">
                        ₹{order.orderValue?.total || 0}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {order.items?.length || 0}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusBadgeClass(order.status)}`}
                        >
                          {order.status || "pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {order.distanceFromRider || 0}
                      </td>
                      <td className="ps-4 py-3">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
                          onClick={() => {
                            setSelectedOrder(order);
                            setViewDetailsModalOpen(true);
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentOrder.length === 0 && availableOrder.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg">No current or available orders right now</p>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {viewdetailsModalOpen && selectedOrder && (
        <ViewDetailsModal
          order={selectedOrder}
          onClose={() => setViewDetailsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default RiderCurrentOrder;