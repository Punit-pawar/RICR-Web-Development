import React from "react";

const RestaurantOrders = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Orders</h2>
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">Orders will be displayed and managed here</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantOrders;