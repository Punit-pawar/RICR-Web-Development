import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, Star, Flame, ArrowRight, ShieldCheck, Truck, ChefHat } from "lucide-react";

// ✨ Animation Variants for Staggered Loading
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Indian", "Italian", "Chinese", "American"];

  const restaurants = [
    { id: 1, name: "Spice Kingdom", cuisine: "Indian", rating: 4.8, time: "30 mins", trending: true, badge: "Chef’s Choice", emoji: "🍛" },
    { id: 2, name: "Pizza Paradise", cuisine: "Italian", rating: 4.6, time: "25 mins", trending: false, badge: "Awarded", emoji: "🍕" },
    { id: 3, name: "Dragon Wok", cuisine: "Chinese", rating: 4.9, time: "35 mins", trending: true, badge: "Exclusive", emoji: "🍜" },
    { id: 4, name: "Burger Haven", cuisine: "American", rating: 4.7, time: "20 mins", trending: false, badge: "Premium", emoji: "🍔" },
  ];

  const filtered =
    activeCategory === "All"
      ? restaurants
      : restaurants.filter(r => r.cuisine === activeCategory);

  return (
    <div className="bg-[#FCF8F3] text-gray-900 min-h-screen font-sans selection:bg-purple-200 selection:text-purple-900 overflow-hidden relative">

      {/* Decorative Warm Background Blurs */}
      <div className="absolute w-[600px] h-[600px] bg-purple-300/20 blur-[120px] rounded-full -top-40 -right-20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-yellow-300/20 blur-[120px] rounded-full top-1/2 -left-40 pointer-events-none" />

      <motion.div 
        initial="hidden" 
        animate="show" 
        variants={staggerContainer} 
        className="relative z-10"
      >
        {/* ---------------- HERO SECTION ---------------- */}
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
          <motion.div variants={fadeUpItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 font-bold text-xs uppercase tracking-widest mb-6">
            <Flame size={14} /> The New Standard of Delivery
          </motion.div>
          
          <motion.h1 variants={fadeUpItem} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-gray-900 mb-6">
            Crave It. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              We Deliver It.
            </span>
          </motion.h1>

          <motion.p variants={fadeUpItem} className="text-gray-500 md:text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            Discover handpicked local favorites and world-class kitchens, delivered hot and fresh directly to your door.
          </motion.p>

          <motion.button
            variants={fadeUpItem}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/order-now")}
            className="px-10 py-5 rounded-[2rem] bg-purple-600 text-white font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(234,88,12,0.3)] hover:bg-purple-500 transition-colors inline-flex items-center gap-3"
          >
            Explore Restaurants
            <ArrowRight size={18} />
          </motion.button>
        </section>

        {/* ---------------- FEATURE STRIP ---------------- */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ChefHat, title: "Elite Kitchens", desc: "Handpicked top-rated chefs." },
              { icon: ShieldCheck, title: "Quality Assured", desc: "Every meal passes our strict standards." },
              { icon: Truck, title: "Lightning Fast", desc: "Hot food delivered in minutes." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUpItem}
                className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col items-center text-center hover:border-purple-100 hover:shadow-[0_20px_40px_rgba(234,88,12,0.05)] transition-all duration-300"
              >
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-5">
                  <item.icon size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ---------------- CATEGORY FILTER ---------------- */}
        <section className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl font-bold tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-purple-300 hover:text-purple-600 shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ---------------- RESTAURANT GRID ---------------- */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((r, i) => (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[2rem] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all group flex flex-col cursor-pointer"
                  onClick={() => navigate("/order-now")}
                >
                  {/* Emoji Placeholder / Image Area */}
                  <div className="relative h-48 bg-purple-50/50 rounded-[1.5rem] flex items-center justify-center mb-5 overflow-hidden group-hover:bg-purple-100/50 transition-colors">
                    {r.trending && (
                      <span className="absolute top-3 right-3 bg-white text-purple-600 font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Flame size={12} /> Trending
                      </span>
                    )}
                    <span className="text-7xl group-hover:scale-110 transition-transform duration-500">{r.emoji}</span>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <p className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-1">
                      {r.badge}
                    </p>
                    <h3 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-purple-600 transition-colors truncate">
                      {r.name}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium mb-5">{r.cuisine}</p>

                    <div className="flex justify-between items-center text-sm font-bold mt-auto pt-4 border-t border-gray-50">
                      <span className="flex items-center gap-1.5 text-gray-900 bg-gray-50 px-2 py-1 rounded-lg">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" /> {r.rating}
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <Clock size={14} className="text-purple-400" /> {r.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ---------------- BRAND STATS ---------------- */}
        <section className="border-t border-gray-200/60 py-20 bg-white/50 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { number: "500+", label: "Curated Kitchens" },
              { number: "180K", label: "Happy Foodies" },
              { number: "4.9", label: "Average Rating" },
              { number: "24/7", label: "Fast Delivery" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUpItem}>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </motion.div>
    </div>
  );
};

export default Home;