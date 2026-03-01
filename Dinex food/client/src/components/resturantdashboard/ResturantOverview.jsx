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

// 1. Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// 2. Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Mock Data
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
  // 3. Prepare Chart.js Data and Options
  const chartData = {
    labels: performanceData.map(d => d.day),
    datasets: [
      {
        fill: true,
        label: 'Earnings',
        data: performanceData.map(d => d.earnings),
        borderColor: '#EA580C', // Your specific orange
        borderWidth: 4,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(234, 88, 12, 0.3)'); // colorEarnings offset 5%
          gradient.addColorStop(1, 'rgba(234, 88, 12, 0)');   // colorEarnings offset 95%
          return gradient;
        },
        tension: 0.4, // Matches type="monotone"
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#EA580C',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#6B7280',
        bodyColor: '#111827',
        bodyFont: { weight: 'bold', size: 14 },
        padding: 12,
        cornerRadius: 16,
        displayColors: false,
        callbacks: {
          label: (context) => `Earnings: ₹${context.raw}`,
        },
        // Shadow and styling simulated via tooltip settings
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#9CA3AF', font: { size: 12, weight: '600' } }
      },
      y: {
        grid: {
          color: '#F3F4F6',
          borderDash: [3, 3], // Matches CartesianGrid strokeDasharray
          drawBorder: false,
        },
        ticks: {
          color: '#9CA3AF',
          font: { size: 12, weight: '600' },
          callback: (value) => `₹${value / 1000}k`
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const stats = [
    { title: "Total Orders", value: "334", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50", trend: "+12% vs last week" },
    { title: "Active Orders", value: "12", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50", trend: "Currently preparing" },
    { title: "Total Earnings", value: "₹79.7k", icon: IndianRupee, color: "text-purple-600", bg: "bg-purple-50", trend: "+18% vs last week" },
    { title: "Avg Rating", value: "4.8", icon: Star, color: "text-blue-500", bg: "bg-blue-50", trend: "Based on 142 reviews" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#FCF8F3] p-4 md:p-8 font-sans text-gray-900 overflow-x-hidden">
      {/* 🎨 Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-300/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-[100px]" />
      </div>

      <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* HEADER */}
        <motion.div variants={fadeUpItem} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Restaurant Hub</h1>
            <p className="text-gray-500 font-medium mt-1">Welcome back! Here’s how your business is doing today.</p>
          </div>
          <div className="bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-bold text-gray-700">Accepting Orders</span>
          </div>
        </motion.div>

        {/* STATS */}
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
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">This Week</span>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-1">{stat.value}</h2>
                  <p className="text-sm font-bold text-gray-500 mb-3">{stat.title}</p>
                  <p className={`text-xs font-semibold flex items-center gap-1 ${stat.color}`}>
                    <TrendingUp size={12} /> {stat.trend}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CHART ROW */}
        <motion.div variants={fadeUpItem} className="w-full bg-white rounded-[1rem] p-6 md:p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
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
            {/* 4. Use Chart.js Line Component */}
            <Line data={chartData} options={chartOptions} />
          </div>
        </motion.div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
          <motion.div variants={fadeUpItem} className="bg-white rounded-[1rem] p-6 md:p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col">
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
              <p className="text-sm font-medium text-gray-500 max-w-[250px]">You have no active orders in the queue right now.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUpItem} className="bg-white rounded-[1rem] p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex flex-col relative overflow-hidden text-black">
            <div className="absolute top-0 right-0 w-40 h-40  rounded-full blur-[50px] pointer-events-none" />
            <h2 className="text-xl font-black mb-6 relative z-10 tracking-tight">Store Management</h2>
            <div className="flex-1 flex flex-col gap-4 relative z-10">
              {[
                { label: "Update Menu Items", icon: Utensils, color: "text-purple-400", bg: "bg-purple-500/20" },
                { label: "Withdraw Earnings", icon: IndianRupee, color: "text-blue-400", bg: "bg-blue-500/20" },
                { label: "Read Customer Reviews", icon: Star, color: "text-pink-400", bg: "bg-pink-500/20" },
              ].map((action, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/15 rounded-2xl transition-colors border border-white/10 group">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${action.bg} ${action.color} rounded-xl`}><action.icon size={18} /></div>
                    <span className="font-bold text-sm">{action.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-black transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RestaurantOverview;