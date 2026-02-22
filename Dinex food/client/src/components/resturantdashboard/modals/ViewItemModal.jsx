import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  IndianRupee, 
  Clock, 
  Users, 
  ChefHat, 
  CheckCircle2, 
  XCircle, 
  Ban,
  Calendar,
  Image as ImageIcon
} from "lucide-react";

// Crisp, fast enterprise animations (no bouncy springs)
const modalVariant = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.15, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.98, y: 10, transition: { duration: 0.1 } }
};

const ViewItemModal = ({ onClose, selectedItem }) => {
  if (!selectedItem) return null;

  const images = selectedItem.images || [];

  // Strict, standard enterprise status badges
  const getAvailabilityBadge = (status) => {
    switch (status) {
      case "available":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
            <CheckCircle2 size={14} /> Available
          </span>
        );
      case "unavailable":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            <XCircle size={14} /> Out of Stock
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300">
            <Ban size={14} /> Removed
          </span>
        );
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-center items-center p-4 sm:p-6 bg-gray-900/60">
        
        {/* Backdrop for click-to-close */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0"
          onClick={onClose}
        />

        <motion.div
          variants={modalVariant}
          initial="hidden"
          animate="show"
          exit="exit"
          className="bg-white w-full max-w-5xl max-h-[90vh] flex flex-col rounded-xl shadow-2xl relative z-10 overflow-hidden border border-gray-200"
        >
          {/* ---------------- HEADER ---------------- */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-50/50 shrink-0">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                Item Details
              </h2>
              <span className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                ID: {selectedItem._id ? selectedItem._id.slice(-6).toUpperCase() : "N/A"}
              </span>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 p-1.5 rounded-md transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* ---------------- SCROLLABLE BODY (2-Column Layout) ---------------- */}
          <div className="overflow-y-auto flex-1 custom-scrollbar">
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
              
              {/* LEFT COLUMN: IMAGES */}
              <div className="w-full md:w-5/12 p-6 bg-gray-50/30">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <ImageIcon size={16} className="text-gray-400" /> Media
                </h3>
                
                {images.length > 0 ? (
                  <div className="space-y-3">
                    {/* Main Image */}
                    <div className="aspect-square w-full rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm">
                      <img 
                        src={images[0].url} 
                        alt={selectedItem.itemName} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    {/* Thumbnails */}
                    {images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {images.slice(1, 5).map((image, idx) => (
                          <div key={idx} className="aspect-square rounded-md border border-gray-200 bg-white overflow-hidden">
                            <img src={image.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-square w-full rounded-lg border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon size={32} className="mb-2 opacity-50" />
                    <span className="text-sm font-medium">No images uploaded</span>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: DATA */}
              <div className="w-full md:w-7/12 p-6">
                
                {/* Header Block */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedItem.itemName}
                    </h1>
                    <div className="flex items-center gap-3">
                      {getAvailabilityBadge(selectedItem.availability)}
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                        selectedItem.type === "veg" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        {selectedItem.type === "veg" ? "Veg" : "Non-Veg"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-500 mb-1">Selling Price</p>
                    <p className="text-2xl font-semibold text-gray-900 flex items-center justify-end">
                      <IndianRupee size={20} className="mr-1 text-gray-500" />
                      {parseFloat(selectedItem.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {selectedItem.description && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 border border-gray-100 p-4 rounded-lg">
                      {selectedItem.description}
                    </p>
                  </div>
                )}

                {/* Attributes Data Table (Strict Definition List) */}
                <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">Attributes</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 text-sm">
                  
                  <div>
                    <dt className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                      <ChefHat size={16} className="text-gray-400" /> Cuisine
                    </dt>
                    <dd className="text-gray-900 font-medium">{selectedItem.cuisine || "Unspecified"}</dd>
                  </div>

                  <div>
                    <dt className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                      <Users size={16} className="text-gray-400" /> Serving Size
                    </dt>
                    <dd className="text-gray-900 font-medium">{selectedItem.servingSize ? `${selectedItem.servingSize} Persons` : "Unspecified"}</dd>
                  </div>

                  <div>
                    <dt className="text-gray-500 font-medium flex items-center gap-2 mb-1">
                      <Clock size={16} className="text-gray-400" /> Prep Time
                    </dt>
                    <dd className="text-gray-900 font-medium">{selectedItem.preparationTime ? `${selectedItem.preparationTime} Minutes` : "Unspecified"}</dd>
                  </div>

                </dl>

              </div>
            </div>
          </div>

          {/* ---------------- FOOTER / METADATA ---------------- */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 shrink-0 gap-2">
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> Created: {new Date(selectedItem.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: '2-digit', minute:'2-digit' })}
              </span>
            </div>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> Last Modified: {new Date(selectedItem.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: '2-digit', minute:'2-digit' })}
            </span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ViewItemModal;