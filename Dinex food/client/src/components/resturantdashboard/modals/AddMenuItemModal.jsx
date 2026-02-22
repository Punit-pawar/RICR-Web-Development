import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/Api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, AlertCircle, ImagePlus } from "lucide-react";

// Minimal, zero-bounce enterprise fade
const modalVariant = {
  hidden: { opacity: 0, scale: 0.99 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, scale: 0.99, transition: { duration: 0.05 } }
};

const AddMenuItemModal = ({ onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    price: "",
    cuisine: "",
    type: "",
    preparationTime: "",
    servingSize: "",
    availability: true,
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.itemName.trim()) newErrors.itemName = "Required";
    if (!formData.description.trim()) newErrors.description = "Required";
    if (!formData.price) newErrors.price = "Required";
    if (!formData.servingSize.trim()) newErrors.servingSize = "Required";
    if (!formData.preparationTime) newErrors.preparationTime = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      document.getElementById('modal-scroll-area').scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    try {
      const form_data = new FormData();
      form_data.append("itemName", formData.itemName);
      form_data.append("description", formData.description);
      form_data.append("price", formData.price);
      form_data.append("servingSize", formData.servingSize);
      form_data.append("cuisine", formData.cuisine);
      form_data.append("type", formData.type);
      form_data.append("preparationTime", formData.preparationTime);
      form_data.append(
        "availability",
        formData.availability ? "available" : "unavailable"
      );
      
      images.forEach((img) => {
        form_data.append("itemImages", img);
      });

      const res = await api.post("/restaurant/addMenuItem", form_data);
      toast.success(res.data.message);
      setTimeout(handleClose, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add menu item");
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
      availability: true,
    });
    setImagePreviews([]);
    setImages([]);
    setErrors({});
    setLoading(false);
    onClose();
  };

  // Strictly Formatted Enterprise Input Wrapper
  const InputWrapper = ({ label, id, error, required, children }) => (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 flex justify-between">
        <span>{label} {required && <span className="text-red-500">*</span>}</span>
        {error && <span className="text-xs text-red-600 font-medium flex items-center gap-1"><AlertCircle size={12}/>{error}</span>}
      </label>
      {children}
    </div>
  );

  // Standard SaaS Input Styles
  const inputStyles = "w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors shadow-sm disabled:bg-gray-100 disabled:text-gray-500";

  // Panel Wrapper Component
  const SettingsPanel = ({ title, children }) => (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm mb-6 last:mb-0">
      <div className="px-5 py-3 border-b border-gray-200 bg-gray-50/50">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {children}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-center items-center p-4 sm:p-6 bg-gray-900/50 backdrop-blur-sm">
        
        <div className="absolute inset-0" onClick={handleClose} />

        <motion.div
          variants={modalVariant}
          initial="hidden"
          animate="show"
          exit="exit"
          className="bg-gray-50 w-full max-w-3xl max-h-[90vh] flex flex-col rounded-lg shadow-xl relative z-10 overflow-hidden border border-gray-300"
        >
          {/* ---------------- HEADER ---------------- */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white shrink-0">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Add Menu Item
              </h2>
            </div>
            <button 
              onClick={handleClose} 
              className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1 rounded transition-colors"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* ---------------- SCROLLABLE FORM ---------------- */}
          <div id="modal-scroll-area" className="overflow-y-auto p-6 flex-1 custom-scrollbar">
            <form id="add-item-form" onSubmit={handleSubmit}>
              
              {/* Media Upload Panel */}
              <SettingsPanel title="Item Media">
                <div className="md:col-span-2">
                  <label 
                    htmlFor="image" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <ImagePlus size={24} className="text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Click to upload images</span>
                    <span className="text-xs text-gray-500 mt-1">Max 5 images, up to 1MB each</span>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                      multiple
                    />
                  </label>

                  {imagePreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-5 gap-3">
                      {imagePreviews.map((itemImg, idx) => (
                        <div key={idx} className="aspect-square rounded-md overflow-hidden border border-gray-200 bg-white">
                          <img src={itemImg} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </SettingsPanel>

              {/* Basic Information Panel */}
              <SettingsPanel title="Basic Information">
                <div className="md:col-span-2">
                  <InputWrapper label="Item Name" id="itemName" required error={errors.itemName}>
                    <input type="text" id="itemName" name="itemName" value={formData.itemName} onChange={handleInputChange} placeholder="e.g., Butter Chicken" className={inputStyles} />
                  </InputWrapper>
                </div>

                <div className="md:col-span-2">
                  <InputWrapper label="Description" id="description" required error={errors.description}>
                    <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows="3" placeholder="Describe the dish, ingredients, and taste..." className={`${inputStyles} resize-none`} />
                  </InputWrapper>
                </div>
              </SettingsPanel>

              {/* Pricing & Category Panel */}
              <SettingsPanel title="Pricing & Categorization">
                <InputWrapper label="Price (₹)" id="price" required error={errors.price}>
                  <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} step="0.01" min="0" placeholder="0.00" className={inputStyles} />
                </InputWrapper>

                <InputWrapper label="Serving Size" id="servingSize" required error={errors.servingSize}>
                  <input type="text" id="servingSize" name="servingSize" value={formData.servingSize} onChange={handleInputChange} placeholder="e.g., 2 Persons" className={inputStyles} />
                </InputWrapper>

                <div className="md:col-span-2">
                  <InputWrapper label="Cuisine" id="cuisine">
                    <input type="text" id="cuisine" name="cuisine" value={formData.cuisine} onChange={handleInputChange} placeholder="e.g., Indian, Italian" className={inputStyles} />
                  </InputWrapper>
                </div>
              </SettingsPanel>

              {/* Attributes Panel */}
              <SettingsPanel title="Attributes & Availability">
                <InputWrapper label="Food Type" id="type">
                  <select id="type" name="type" value={formData.type} onChange={handleInputChange} className={inputStyles}>
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
                </InputWrapper>

                <InputWrapper label="Preparation Time (mins)" id="preparationTime" required error={errors.preparationTime}>
                  <input type="number" id="preparationTime" name="preparationTime" value={formData.preparationTime} onChange={handleInputChange} min="0" placeholder="e.g., 15" className={inputStyles} />
                </InputWrapper>

                <div className="md:col-span-2 pt-2">
                  <label htmlFor="availability" className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        id="availability" 
                        name="availability" 
                        checked={formData.availability} 
                        onChange={handleInputChange} 
                        className="peer sr-only" 
                      />
                      <div className="w-5 h-5 border border-gray-300 rounded bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors shadow-sm"></div>
                      <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">Item is currently available</span>
                      <span className="text-xs text-gray-500">Uncheck to temporarily hide this item from the public menu.</span>
                    </div>
                  </label>
                </div>
              </SettingsPanel>

            </form>
          </div>

          {/* ---------------- FOOTER ACTIONS ---------------- */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-white shrink-0">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors disabled:opacity-50 shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="add-item-form"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 border border-transparent text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              Create Item
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddMenuItemModal;