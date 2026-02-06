import React, { useEffect, useState } from "react";
import AddMenuItemModal from "./modals/AddMenuItemModal";
import api from "../../config/Api";
import toast from "react-hot-toast";

const RestaurantMenu = () => {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState();

  const fetchMenuItem = async () => {
    try {
      const res = await api.get("/restaurant/menuItems");
      toast.success(res.data.message);
      setMenuItems(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add menu item");
    }
  };

  useEffect(() => {
    if (!isAddItemModalOpen) fetchMenuItem();
  }, [isAddItemModalOpen]);
  return (
    <>
      <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 ">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Menu Management
            </h2>
            <button
              className="px-4 py-2 bg-(--color-secondary) text-white rounded-lg hover:bg-(--color-secondary-hover) transition font-semibold"
              onClick={() => setIsAddItemModalOpen(true)}
            >
              Add Item
            </button>
          </div>

          {menuItems && (
            <div>
              {menuItems.map((items, idx) => (
                <div key={idx}>{items.itemName}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isAddItemModalOpen && (
        <AddMenuItemModal onClose={() => setIsAddItemModalOpen(false)} />
      )}
    </>
  );
};

export default RestaurantMenu;