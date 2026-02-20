import React from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  Truck, 
  TrendingUp, 
  ChevronRight,
  User
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

// Mock Data for the Chart
const spendingData = [
  { day: "Mon", spent: 450 },
  { day: "Tue", spent: 0 },
  { day: "Wed", spent: 850 },
  { day: "Thu", spent: 300 },
  { day: "Fri", spent: 1200 },
  { day: "Sat", spent: 1800 },
  { day: "Sun", spent: 900 },
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

const UserOverview = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "12",
      icon: ShoppingBag,
      color: "text-orange-600",
      bg: "bg-orange-50",
      trend: "+2 this week"
    },
    {
      title: "Active Orders",
      value: "1",
      icon: Truck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "Arriving in 15m"
    },
    {
      title: "Wishlist",
      value: "8",
      icon: Heart,
      color: "text-rose-500",
      bg: "bg-rose-50",
      trend: "3 items on sale"
    },
    {
      title: "Reviews",
      value: "5",
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-50",
      trend: "4.8 avg rating"
    },
  ];

  return (
    // REMOVED: h-full, overflow-y-auto, scrollbar-hide so the parent scroller takes over.
    <div className="relative w-full bg-[#FCF8F3] p-4 md:p-8 font-sans text-gray-900">
      
      {/* 🎨 Subtle Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-300/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-300/10 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial="hidden" 
        animate="show" 
        variants={staggerContainer}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* ---------------- HEADER ---------------- */}
        <motion.div variants={fadeUpItem} className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Welcome back! Here is your account overview.
            </p>
          </div>
          <div className="bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold text-gray-700">System Online</span>
          </div>
        </motion.div>

        {/* ---------------- STATS WIDGETS ---------------- */}
        <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                    All Time
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
        <motion.div variants={fadeUpItem} className="w-full bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Spending Overview</h2>
              <p className="text-sm font-medium text-gray-500">Your order expenses over the last 7 days</p>
            </div>
            <h3 className="text-3xl font-black text-orange-600">₹4,800</h3>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
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
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }} 
                  tickFormatter={(value) => `₹${value}`}
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
                  itemStyle={{ color: '#EA580C' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="spent" 
                  stroke="#EA580C" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorSpent)" 
                  activeDot={{ r: 6, fill: '#EA580C', stroke: '#fff', strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ---------------- BOTTOM ROW ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
          
          {/* Recent Orders Widget */}
          <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Recent Orders</h2>
              <button className="text-sm font-bold text-orange-600 flex items-center hover:text-orange-700 transition-colors">
                View All <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No Recent Orders</h3>
              <p className="text-sm font-medium text-gray-500 max-w-[250px]">
                Looks like you haven't ordered anything yet. Time to treat yourself!
              </p>
              <button className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors shadow-lg">
                Explore Menu
              </button>
            </div>
          </motion.div>



        </div>
      </motion.div>
    </div>
  );
};

export default UserOverview;