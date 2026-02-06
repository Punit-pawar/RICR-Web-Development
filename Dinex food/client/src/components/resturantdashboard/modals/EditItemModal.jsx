import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/Api";
import toast from "react-hot-toast";

const EditItemModal = ({ onClose, selectedItem }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    itemName: selectedItem?.itemName || "",
    description: selectedItem?.description || "",
    price: selectedItem?.price || "",
    cuisine: selectedItem?.cuisine || "",
    type: selectedItem?.type || "",
    preparationTime: selectedItem?.preparationTime || "",
    servingSize: selectedItem?.servingSize || "",
    availability: selectedItem?.availability || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    let temp = [];
    fileArray.forEach((img) => {
      let imgURL = URL.createObjectURL(img);
      temp.push(imgURL);
    });
    setImagePreviews(temp.slice(0, 5));
    setImages(fileArray.slice(0, 5));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const form_data = new FormData();
    //   form_data.append("itemID", selectedItem._id);
      form_data.append("itemName", formData.itemName);
      form_data.append("description", formData.description);
      form_data.append("price", formData.price);
      form_data.append("servingSize", formData.servingSize);
      form_data.append("cuisine", formData.cuisine);
      form_data.append("type", formData.type);
      form_data.append("preparationTime", formData.preparationTime);
      form_data.append("availability", formData.availability);

      images.forEach((img) => {
        form_data.append("itemImages", img);
      });

      const res = await api.put(
        `/restaurant/updateMenuItem/${selectedItem._id}`,
        form_data,
      );
      toast.success(res.data.message);
      setTimeout(handleClose, 1500);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to update menu item",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      itemName: "",
      description: "",
      price: "",
      cuisine: "",
      type: "",
      preparationTime: "",
      servingSize: "",
      availability: "",
    });

    setImagePreviews([]);
    setImages([]);
    setErrors("");
    setLoading(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-100">
        <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
          <div className="flex justify-between px-6 py-4 border-b border-gray-300 items-center sticky top-0 bg-white">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Menu Item
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-red-600 text-2xl transition"
            >
              ⊗
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Item Image Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Update Item Image
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Upload new images if you want to change them
              </p>
              <div className="flex items-end gap-4">
                <label
                  htmlFor="image"
                  className="px-6 py-2 w-fit bg-(--color-secondary) text-white rounded-md hover:bg-(--color-secondary-hover) cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Add Image
                </label>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">
                    (Upto 5 Images Allowed)
                  </span>
                  <span className="text-sm text-gray-600">
                    (Max Size: 1MB each)
                  </span>
                </div>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  multiple
                />
              </div>

              {imagePreviews.length !== 0 && (
                <div className="mt-3 grid grid-cols-5 gap-1">
                  {imagePreviews.map((itemImg, idx) => (
                    <div
                      className="border rounded-md w-30 h-30 overflow-hidden"
                      key={idx}
                    >
                      <img
                        src={itemImg}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Basic Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.itemName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., Butter Chicken"
                  />
                  {errors.itemName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.itemName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Describe the dish, ingredients, and taste"
                  />
                  {errors.description && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing & Category Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Pricing & Category
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-red-600 text-xs mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Serving Size *
                  </label>
                  <input
                    type="text"
                    name="servingSize"
                    value={formData.servingSize}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.servingSize ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., 2 Persons"
                  />
                  {errors.servingSize && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.servingSize}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cuisine
                  </label>
                  <input
                    type="text"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Indian, Italian"
                  />
                </div>
              </div>
            </div>

            {/* Attributes Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Item Attributes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Food Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="border w-full border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="egg">Egg</option>
                    <option value="jain">Jain</option>
                    <option value="gluten-free">Gluten-Free</option>
                    <option value="contains-nuts">Contains Nuts</option>
                    <option value="dairy">Dairy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preparation Time (minutes) *
                  </label>
                  <input
                    type="number"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleInputChange}
                    min="0"
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.preparationTime
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="e.g., 15"
                  />
                  {errors.preparationTime && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.preparationTime}
                    </p>
                  )}
                </div>

                <div className="flex items-end gap-3 ">
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="border w-full border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Availability</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                    <option value="removed">Removed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-300">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⟳</span> Updating...
                  </>
                ) : (
                  "Update Menu Item"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditItemModal;