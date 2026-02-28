import React from "react";
import { 
  X, 
  MapPin, 
  Store, 
  User, 
  CreditCard, 
  Package, 
  Navigation,
  CheckCircle
} from "lucide-react";

const ViewDetailsModal = ({ order, onClose, onAccept }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300">
      {/* Modal Container */}
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in slide-in-from-bottom-8 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-lg font-bold text-gray-800 tracking-tight">
              Order Details
            </h2>
            <p className="text-sm font-medium text-gray-500 mt-0.5">
              ID: #{order?.orderNumber || order?._id?.substring(0, 8)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          
          {/* Earnings / Total Amount */}
          <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CreditCard size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wider">Order Total</p>
                <p className="text-2xl font-bold text-gray-800">
                  ₹{order?.orderValue?.total || 0}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 font-medium">Payment</p>
              <p className="text-sm font-bold text-gray-700 capitalize">
                {order?.orderValue?.paymentMethod || "Online"}
              </p>
            </div>
          </div>

          {/* Route Info */}
          <div className="relative pl-4 space-y-6">
            {/* Visual connecting line */}
            <div className="absolute left-[27px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-gray-200"></div>

            {/* Pickup */}
            <div className="flex gap-4 items-start relative z-10">
              <div className="bg-white ring-4 ring-white rounded-full">
                <div className="bg-indigo-100 p-2.5 rounded-full">
                  <Store size={18} className="text-indigo-600" />
                </div>
              </div>
              <div className="flex-1 pt-1.5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pickup</p>
                <p className="text-base font-bold text-gray-800 mt-0.5">
                  {order?.restaurantId?.restaurantName || order?.restaurantId?.fullName || "Unknown Restaurant"}
                </p>
                {/* Add restaurant address here if available in your data */}
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {order?.restaurantId?.address || "Address not provided"}
                </p>
              </div>
            </div>

            {/* Dropoff */}
            <div className="flex gap-4 items-start relative z-10">
              <div className="bg-white ring-4 ring-white rounded-full">
                <div className="bg-orange-100 p-2.5 rounded-full">
                  <MapPin size={18} className="text-orange-600" />
                </div>
              </div>
              <div className="flex-1 pt-1.5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Drop-off</p>
                <p className="text-base font-bold text-gray-800 mt-0.5">
                  {order?.userId?.fullName || "Unknown Customer"}
                </p>
                {/* Add customer address here if available in your data */}
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {order?.deliveryAddress?.street || "Address not provided"}
                </p>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 border border-gray-100">
              <Package size={18} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Items</p>
                <p className="text-sm font-semibold text-gray-800">
                  {order?.items?.length || 0} items
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 border border-gray-100">
              <Navigation size={18} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Distance</p>
                <p className="text-sm font-semibold text-gray-800">
                  {order?.distance || "-- km"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-100 p-4 bg-white grid grid-cols-2 gap-3 pb-8 sm:pb-4">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 active:scale-[0.98] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onAccept && onAccept(order._id)}
            className="w-full py-3 px-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} />
            Accept Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;