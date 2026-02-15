import React, { useEffect, useState } from "react";
import AddMenuItemModal from "./modals/AddMenuItemModal";
import api from "../../config/Api";
import toast from "react-hot-toast";
import { FaEye, FaEdit } from "react-icons/fa";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";
import ViewItemModal from "./modals/ViewItemmodal";
import EditItemModal from "./modals/EditItemModal";

const RestaurantMenu = () => {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [menuItems, setMenuItems] = useState();

  const fetchMenuItem = async () => {
    try {
      const res = await api.get("/restaurant/menuItems");
      setMenuItems(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load menu");
    }
  };

  useEffect(() => {
    if (!isAddItemModalOpen && !isEditItemModalOpen) fetchMenuItem();
  }, [isAddItemModalOpen, isEditItemModalOpen]);

  const AvailabilityBadge = ({ status }) => {
    const styles = {
      available: "bg-green-50 text-green-600",
      unavailable: "bg-red-50 text-red-500",
      removed: "bg-gray-100 text-gray-500",
    };

    return (
      <span
        className={`px-2.5 py-1 text-xs rounded-md font-medium ${
          styles[status] || styles.removed
        }`}
      >
        {status === "available"
          ? "Available"
          : status === "unavailable"
          ? "Unavailable"
          : "Removed"}
      </span>
    );
  };

  return (
    <>
      <div className="p-6 h-full overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
          
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-5 
          bg-gradient-to-r from-purple-600 to-purple-600 text-white">
            <div>
              <h2 className="text-2xl font-bold">
                Menu Management
              </h2>
              <p className="text-sm text-purple-100">
                Manage your restaurant items & availability
              </p>
            </div>

            <button
              onClick={() => setIsAddItemModalOpen(true)}
              className="px-5 py-2.5 bg-white/20 backdrop-blur-md 
              hover:bg-white/30 rounded-lg transition font-medium"
            >
              + Add Item
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Item</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Cuisine</th>
                  <th className="px-6 py-3">Availability</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {menuItems?.length > 0 ? (
                  menuItems.map((items, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-50 hover:bg-purple-50/40 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-400">
                        {idx + 1}
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {items.itemName}
                      </td>

                      <td className="px-6 py-4 text-gray-700 font-medium">
                        ₹ {items.price}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 text-xs rounded-md 
                        bg-purple-100 text-purple-700 font-medium">
                          {items.type.toUpperCase()}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {items.cuisine}
                      </td>

                      <td className="px-6 py-4 flex items-center gap-3">
                        {items.availability === "available" ? (
                          <FaToggleOn className="text-green-500 text-lg" />
                        ) : items.availability === "unavailable" ? (
                          <FaToggleOff className="text-red-500 text-lg" />
                        ) : (
                          <ImBlocked className="text-gray-400 text-lg" />
                        )}

                        <AvailabilityBadge status={items.availability} />
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => {
                              setSelectedItem(items);
                              setIsViewItemModalOpen(true);
                            }}
                            className="p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 
                            text-blue-600 transition shadow-sm"
                          >
                            <FaEye />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedItem(items);
                              setIsEditItemModalOpen(true);
                            }}
                            className="p-2.5 rounded-lg bg-purple-50 hover:bg-purple-100 
                            text-purple-600 transition shadow-sm"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-12 text-gray-400"
                    >
                      No menu items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isAddItemModalOpen && (
        <AddMenuItemModal onClose={() => setIsAddItemModalOpen(false)} />
      )}

      {isViewItemModalOpen && (
        <ViewItemModal
          onClose={() => setIsViewItemModalOpen(false)}
          selectedItem={selectedItem}
        />
      )}

      {isEditItemModalOpen && (
        <EditItemModal
          onClose={() => setIsEditItemModalOpen(false)}
          selectedItem={selectedItem}
        />
      )}
    </>
  );
};

export default RestaurantMenu;
