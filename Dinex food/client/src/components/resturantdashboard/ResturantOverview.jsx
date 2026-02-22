import React from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  Users, 
  IndianRupee, 
  Star, 
  TrendingUp, 
  ChevronRight,
  Utensils
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Mock Data for the Performance Chart
const performanceData = [
  { day: "Mon", orders: 24, earnings: 4500 },
  { day: "Tue", orders: 18, earnings: 3200 },
  { day: "Wed", orders: 35, earnings: 8500 },
  { day: "Thu", orders: 42, earnings: 9800 },
  { day: "Fri", orders: 58, earnings: 14200 },
  { day: "Sat", orders: 85, earnings: 21000 },
  { day: "Sun", orders: 72, earnings: 18500 },
];

// ✨ Smooth Spring Animations
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const RestaurantOverview = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "334",
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+12% vs last week"
    },
    {
      title: "Active Orders",
      value: "12",
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "Currently preparing"
    },
    {
      title: "Total Earnings",
      value: "₹79.7k",
      icon: IndianRupee,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "+18% vs last week"
    },
    {
      title: "Avg Rating",
      value: "4.8",
      icon: Star,
      color: "text-blue-500",
      bg: "bg-blue-50",
      trend: "Based on 142 reviews"
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#FCF8F3] p-4 md:p-8 font-sans text-gray-900 overflow-x-hidden">
      
      {/* 🎨 Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-300/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial="hidden" 
        animate="show" 
        variants={staggerContainer}
        className="max-w-7xl mx-auto relative z-10 space-y-8"
      >
        {/* ---------------- HEADER ---------------- */}
        <motion.div variants={fadeUpItem} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Restaurant Hub
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Welcome back! Here’s how your business is doing today.
            </p>
          </div>
          <div className="bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-bold text-gray-700">Accepting Orders</span>
          </div>
        </motion.div>

        {/* ---------------- STATS WIDGETS ---------------- */}
        <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUpItem}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(234,88,12,0.06)] transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-[1.2rem] ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                    This Week
                  </span>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-1">
                    {stat.value}
                  </h2>
                  <p className="text-sm font-bold text-gray-500 mb-3">
                    {stat.title}
                  </p>
                  <p className={`text-xs font-semibold flex items-center gap-1 ${stat.color}`}>
                    <TrendingUp size={12} /> {stat.trend}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ---------------- MIDDLE ROW (CHART) ---------------- */}
        <motion.div variants={fadeUpItem} className="w-full bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Weekly Performance</h2>
              <p className="text-sm font-medium text-gray-500 mt-1">Earnings and Order Volume over the last 7 days</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-sm font-bold text-gray-600">Earnings</span>
              </div>
            </div>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EA580C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EA580C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }} 
                  dy={10} 
                />
                <YAxis 
                  yAxisId="left"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }} 
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip 
                  cursor={{ stroke: '#EA580C', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    fontWeight: 'bold',
                    color: '#111827'
                  }}
                  formatter={(value) => [`₹${value}`, 'Earnings']}
                  labelStyle={{ color: '#6B7280', marginBottom: '4px' }}
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#EA580C" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorEarnings)" 
                  activeDot={{ r: 6, fill: '#EA580C', stroke: '#fff', strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ---------------- BOTTOM ROW ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
          
          {/* Active/Recent Orders Widget */}
          <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Active Orders</h2>
              <button className="text-sm font-bold text-purple-600 flex items-center hover:text-purple-700 transition-colors">
                View Queue <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center py-10 text-center bg-gray-50/50 rounded-[1.5rem] border border-gray-100 border-dashed">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 mb-4 shadow-sm">
                <Utensils size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Kitchen is Clear</h3>
              <p className="text-sm font-medium text-gray-500 max-w-[250px]">
                You have no active orders in the queue right now.
              </p>
            </div>
          </motion.div>

          {/* Quick Actions / Store Status */}
          <motion.div variants={fadeUpItem} className="bg-gray-900 rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex flex-col relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-[50px] pointer-events-none" />
            
            <h2 className="text-xl font-black mb-6 relative z-10 tracking-tight">Store Management</h2>

            <div className="flex-1 flex flex-col gap-4 relative z-10">
              <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/15 rounded-2xl transition-colors border border-white/10 group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl"><Utensils size={18} /></div>
                  <span className="font-bold text-sm">Update Menu Items</span>
                </div>
                <ChevronRight size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/15 rounded-2xl transition-colors border border-white/10 group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl"><IndianRupee size={18} /></div>
                  <span className="font-bold text-sm">Withdraw Earnings</span>
                </div>
                <ChevronRight size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/15 rounded-2xl transition-colors border border-white/10 group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-500/20 text-pink-400 rounded-xl"><Star size={18} /></div>
                  <span className="font-bold text-sm">Read Customer Reviews</span>
                </div>
                <ChevronRight size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default RestaurantOverview;