import React, { useEffect, useState } from "react";
import AddMenuItemModal from "./modals/AddMenuItemModal";
import ViewItemModal from "./modals/ViewItemmodal";
import EditItemModal from "./modals/EditItemModal";
import api from "../../config/Api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Plus, 
  UtensilsCrossed, 
  MoreHorizontal, 
  Eye, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Ban,
  BookOpen
} from "lucide-react";

// ✨ Smooth Spring Animations
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const RestaurantMenu = () => {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // ✨ Added Local Search Filtering
  const filteredItems = menuItems?.filter(item => 
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Premium Status Badge Component
  const AvailabilityBadge = ({ status }) => {
    switch (status) {
      case "available":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100/50">
            <CheckCircle2 size={14} strokeWidth={2.5} /> Available
          </span>
        );
      case "unavailable":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-600 border border-red-100/50">
            <XCircle size={14} strokeWidth={2.5} /> Out of Stock
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 border border-gray-200/50">
            <Ban size={14} strokeWidth={2.5} /> Removed
          </span>
        );
    }
  };

  return (
    <>
      <div className="relative w-full min-h-screen bg-[#FCF8F3] p-4 sm:p-6 lg:p-10 font-sans text-gray-900 overflow-x-hidden">
        
        {/* 🎨 Ambient Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[120px]" />
        </div>

        <motion.div 
          initial="hidden" 
          animate="show" 
          variants={staggerContainer}
          className="max-w-7xl mx-auto relative z-10 space-y-6"
        >
          {/* ---------------- HEADER & CONTROLS ---------------- */}
          <motion.div variants={fadeUpItem} className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                <UtensilsCrossed size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Menu Manager</h1>
                <p className="text-sm font-medium text-gray-500 mt-1">Organize your dishes, prices, and availability.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full lg:w-auto items-center gap-4">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
                  <Search size={16} strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 rounded-2xl pl-11 pr-4 py-3.5 focus:outline-none border border-transparent focus:border-purple-200 focus:ring-4 focus:ring-purple-500/10 focus:bg-white transition-all font-medium text-sm placeholder:text-gray-400"
                />
              </div>

              {/* Add Item Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsAddItemModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 bg-gray-900 text-white rounded-2xl hover:bg-purple-600 transition-colors font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.1)] shrink-0"
              >
                <Plus size={18} strokeWidth={3} /> Add Dish
              </motion.button>
            </div>

          </motion.div>

          {/* ---------------- DATA GRID ---------------- */}
          <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                
                {/* Table Header */}
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">Dish Details</th>
                    <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">Price</th>
                    <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">Category</th>
                    <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">Status</th>
                    <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  <AnimatePresence>
                    {filteredItems?.length > 0 ? (
                      filteredItems.map((item, idx) => (
                        <motion.tr
                          key={item._id || idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="border-b border-gray-50 hover:bg-purple-50/30 transition-colors group"
                        >
                          {/* Dish Name & Cuisine */}
                          <td className="px-8 py-5">
                            <div className="flex flex-col">
                              <span className="font-black text-gray-900 text-base mb-1 group-hover:text-purple-600 transition-colors">
                                {item.itemName}
                              </span>
                              <span className="text-xs font-bold text-gray-500">
                                {item.cuisine}
                              </span>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="px-8 py-5">
                            <span className="font-black text-gray-900 tracking-tight text-lg">
                              ₹{item.price}
                            </span>
                          </td>

                          {/* Type / Category */}
                          <td className="px-8 py-5">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-600 border border-gray-200/60">
                              {item.type}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-8 py-5">
                            <AvailabilityBadge status={item.availability} />
                          </td>

                          {/* Actions */}
                          <td className="px-8 py-5">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => { setSelectedItem(item); setIsViewItemModalOpen(true); }}
                                className="p-2.5 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-900 hover:text-white transition-colors border border-transparent hover:border-gray-900"
                                title="View Details"
                              >
                                <Eye size={16} strokeWidth={2.5} />
                              </button>
                              <button
                                onClick={() => { setSelectedItem(item); setIsEditItemModalOpen(true); }}
                                className="p-2.5 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors border border-transparent hover:border-purple-600"
                                title="Edit Item"
                              >
                                <Edit3 size={16} strokeWidth={2.5} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      
                      /* ---------------- EMPTY STATE ---------------- */
                      <tr>
                        <td colSpan="5" className="px-8 py-24 text-center">
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center max-w-sm mx-auto"
                          >
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6 shadow-inner">
                              <BookOpen size={40} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
                              {searchQuery ? "No Matches Found" : "Your Menu is Empty"}
                            </h3>
                            <p className="text-sm font-medium text-gray-500 mb-8 leading-relaxed">
                              {searchQuery 
                                ? `We couldn't find any dishes matching "${searchQuery}". Try adjusting your search.` 
                                : "You haven't added any dishes to your restaurant yet. Start building your menu to receive orders!"}
                            </p>
                            {!searchQuery && (
                              <button
                                onClick={() => setIsAddItemModalOpen(true)}
                                className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-purple-600 transition-colors shadow-lg"
                              >
                                Add First Dish
                              </button>
                            )}
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ---------------- MODALS ---------------- */}
      <AnimatePresence>
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
      </AnimatePresence>
    </>
  );
};

export default RestaurantMenu;