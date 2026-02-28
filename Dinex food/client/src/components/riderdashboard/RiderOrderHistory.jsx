import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Calendar, 
  ChevronRight, 
  MapPin, 
  CircleDollarSign,
  ArrowUpRight,
  Clock,
  ExternalLink
} from "lucide-react";

// Mock Data for the History
const historyData = [
  { id: "#DX-8821", date: "Oct 24, 2023", time: "14:20", status: "Delivered", amount: "120", restaurant: "Spice Kitchen", address: "42nd Street, New York" },
  { id: "#DX-8819", date: "Oct 24, 2023", time: "12:05", status: "Delivered", amount: "85", restaurant: "Burger King", address: "Park Avenue, New York" },
  { id: "#DX-8790", date: "Oct 23, 2023", time: "19:45", status: "Cancelled", amount: "0", restaurant: "Pasta House", address: "7th Ave, New York" },
  { id: "#DX-8755", date: "Oct 23, 2023", time: "18:10", status: "Delivered", amount: "150", restaurant: "Sushi Zen", address: "Broadway, New York" },
  { id: "#DX-8701", date: "Oct 22, 2023", time: "21:30", status: "Delivered", amount: "95", restaurant: "Taco Bell", address: "Lexington Ave, New York" },
];

const RiderOrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#FCF8F3] p-4 md:p-10 font-sans text-gray-900">
      <motion.div 
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Order History</h1>
            <p className="text-gray-500 font-medium">Review your past deliveries and earnings.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
              <Calendar size={18} className="text-purple-600" />
              <span className="text-sm font-bold">Last 30 Days</span>
            </div>
            <button className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors text-gray-500">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* --- Search Bar --- */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search by Order ID or Restaurant..."
            className="w-full bg-white border border-white rounded-[2rem] pl-14 pr-6 py-5 shadow-sm focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all font-medium text-gray-700"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        {/* --- History Table / List --- */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-[2.5rem] border border-white shadow-sm overflow-hidden"
        >
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-6 gap-4 px-8 py-6 bg-gray-50/50 border-b border-gray-100 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <div className="col-span-1">Order ID</div>
            <div className="col-span-2">Details</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Earnings</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          <div className="divide-y divide-gray-50">
            {historyData.map((order) => (
              <div 
                key={order.id}
                className="group p-6 md:px-8 md:py-7 hover:bg-gray-50/50 transition-all flex flex-col md:grid md:grid-cols-6 gap-4 md:items-center"
              >
                {/* ID & Date */}
                <div className="col-span-1">
                  <span className="text-sm font-black text-gray-900 block mb-1">{order.id}</span>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                    <Clock size={12} /> {order.time}
                  </div>
                </div>

                {/* Restaurant & Address */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-black text-gray-900">{order.restaurant}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                    <MapPin size={12} className="shrink-0" />
                    <span className="truncate">{order.address}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    order.status === 'Delivered' 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'bg-red-50 text-red-600'
                  }`}>
                    {order.status}
                  </span>
                </div>

                {/* Amount */}
                <div className="col-span-1 flex items-center gap-2">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                    <CircleDollarSign size={16} />
                  </div>
                  <span className="text-lg font-black text-gray-900">₹{order.amount}</span>
                </div>

                {/* Action */}
                <div className="col-span-1 text-right flex md:block justify-between items-center mt-4 md:mt-0">
                  <span className="md:hidden text-xs font-bold text-gray-400">{order.date}</span>
                  <button className="p-2 bg-gray-100 text-gray-400 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* --- Pagination / Footer --- */}
          <div className="p-6 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing 5 of 142 Orders</span>
            <div className="flex items-center gap-2">
              <button className="px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-black text-gray-400 cursor-not-allowed">Prev</button>
              <button className="px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-black text-gray-900 hover:border-purple-500 transition-all">Next</button>
            </div>
          </div>
        </motion.div>

        {/* --- Empty State Placeholder (Logic for when no orders exist) --- */}
        {historyData.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <ExternalLink size={32} />
             </div>
             <h3 className="text-xl font-black">No Orders Found</h3>
             <p className="text-gray-500">Try adjusting your filters or search term.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RiderOrderHistory;