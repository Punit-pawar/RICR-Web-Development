import React from "react";
import AddMenuItemModal from "./modals/AddMenuItemModal";

const RestaurantMenu = () => {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = React.useState(false);
  return (
    <>
      <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex justify-between">
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
      </div>

      {isAddItemModalOpen && (
        <AddMenuItemModal onClose={() => setIsAddItemModalOpen(false)} />
      )}
    </>
  );
};

export default RestaurantMenu;