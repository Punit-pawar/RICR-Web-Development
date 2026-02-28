import React from "react";
import { motion } from "framer-motion";
import { 
  Bike, 
  Wallet, 
  Star, 
  CheckCircle2, 
  TrendingUp, 
  ChevronRight,
  MapPin,
  Clock
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

// Mock Data for the Rider Earnings Chart
const earningsData = [
  { day: "Mon", income: 850 },
  { day: "Tue", income: 1200 },
  { day: "Wed", income: 980 },
  { day: "Thu", income: 1500 },
  { day: "Fri", income: 2100 },
  { day: "Sat", income: 2800 },
  { day: "Sun", income: 1900 },
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

const RiderOverview = () => {
  const stats = [
    {
      title: "Active Orders",
      value: "02",
      icon: Bike,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "In transit"
    },
    {
      title: "Completed",
      value: "142",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "+12 today"
    },
    {
      title: "Total Earnings",
      value: "₹8.4k",
      icon: Wallet,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+15% vs last week"
    },
    {
      title: "Rating",
      value: "4.9",
      icon: Star,
      color: "text-purple-500",
      bg: "bg-purple-50",
      trend: "Top Rated"
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#FCF8F3] p-4 md:p-8 font-sans text-gray-900 overflow-x-hidden">
      
      {/* 🎨 Ambient Background Blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-300/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-300/10 rounded-full blur-[100px]" />
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
              Rider Hub
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              On duty and ready. Here is your delivery performance.
            </p>
          </div>
          <div className="bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">Active Duty</span>
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
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                    Real-time
                  </span>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-1">
                    {stat.value}
                  </h2>
                  <p className="text-sm font-bold text-gray-500 mb-3">
                    {stat.title}
                  </p>
                  <p className={`text-[11px] font-bold flex items-center gap-1 ${stat.color} uppercase tracking-wide`}>
                    <TrendingUp size={12} /> {stat.trend}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ---------------- EARNINGS CHART ---------------- */}
        <motion.div variants={fadeUpItem} className="w-full bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] mb-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Earnings Pulse</h2>
              <p className="text-sm font-medium text-gray-500">Weekly revenue distribution</p>
            </div>
            <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
               <span className="block text-[10px] font-black text-emerald-600 uppercase tracking-widest">Total Income</span>
               <h3 className="text-2xl font-black text-emerald-700">₹13,230</h3>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 700 }} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 700 }} 
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip 
                  cursor={{ stroke: '#10B981', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    fontWeight: 'bold'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#10B981" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorIncome)" 
                  activeDot={{ r: 6, fill: '#10B981', stroke: '#fff', strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ---------------- BOTTOM ROW ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
          
          {/* Recent Delivery Task Card */}
          <motion.div variants={fadeUpItem} className="bg-gray-900 rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex flex-col text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
            
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h2 className="text-xl font-black tracking-tight">Active Delivery</h2>
              <span className="bg-blue-500 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest text-black">High Priority</span>
            </div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pickup From</p>
                  <p className="font-black text-lg">Spice Kitchen Central</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Time Remaining</p>
                  <p className="font-black text-lg text-blue-400">12 Minutes</p>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest transition-colors hover:bg-blue-500"
              >
                Go to Navigation
              </motion.button>
            </div>
          </motion.div>

          {/* Empty State / Schedule Card */}
          <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col justify-center text-center">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-4">
               <Bike size={32} strokeWidth={1.5} />
             </div>
             <h3 className="text-xl font-black text-gray-900 tracking-tight">Delivery History</h3>
             <p className="text-sm font-medium text-gray-500 mt-2 max-w-[280px] mx-auto">
               You haven't completed any deliveries in the last 24 hours.
             </p>
             <button className="mt-8 text-sm font-black text-blue-600 flex items-center justify-center gap-1 hover:gap-2 transition-all">
                View Past Earnings <ChevronRight size={16} />
             </button>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default RiderOverview;