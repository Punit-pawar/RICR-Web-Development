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
      toast.success(res.data.message);
      setMenuItems(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add menu item");
    }
  };

  useEffect(() => {
    if (!isAddItemModalOpen && !isEditItemModalOpen) fetchMenuItem();
  }, [isAddItemModalOpen,isEditItemModalOpen]);
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
          <div className="border mt-3" />

          <div>
            <table className="w-full mt-3">
              <thead>
                <tr className="grid grid-cols-8 text-lg bg-(--color-secondary) text-white">
                  <th className="font-semibold">S.no</th>
                  <th className="font-semibold col-span-2">Item Name</th>
                  <th className="font-semibold">Price</th>
                  <th className="font-semibold">Type</th>
                  <th className="font-semibold">Cuisine</th>
                  <th className="font-semibold">Availability</th>
                  <th className="font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {menuItems &&
                  menuItems.map((items, idx) => (
                    <tr
                      className="grid grid-cols-8 text-center py-2 border-b border-gray-300"
                      key={idx}
                    >
                      <td className="">{idx + 1}</td>
                      <td className="col-span-2">{items.itemName}</td>
                      <td className="">{items.price}</td>
                      <td className="">{items.type.toUpperCase()}</td>
                      <td className="">{items.cuisine}</td>
                      <td className="flex justify-center items-center text-2xl">
                        {items.availability === "available" ? (
                          <FaToggleOn
                            className="text-green-500"
                            title="Available"
                          />
                        ) : items.availability === "unavailable" ? (
                          <FaToggleOff
                            className="text-red-500"
                            title="Unavailable"
                          />
                        ) : (
                          <ImBlocked
                            className="font-bold text-black"
                            title="Removed form Menu"
                          />
                        )}
                      </td>
                      <td className="flex gap-4 justify-center">
                        <button
                          className="text-gray-500 p-2 rounded-lg bg-gray-200 shadow"
                          onClick={() => {
                            setSelectedItem(items);
                            setIsViewItemModalOpen(true);
                          }}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="text-purple-500  p-2 rounded-lg bg-gray-200 shadow"
                          onClick={() => {
                            setSelectedItem(items);
                            setIsEditItemModalOpen(true);
                          }}
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
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