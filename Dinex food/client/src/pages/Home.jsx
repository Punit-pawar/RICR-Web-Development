import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, Star, Flame, ArrowRight, ShieldCheck, Truck, ChefHat } from "lucide-react";

// ✨ Upgraded Animation Variants for buttery smooth physics
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 20 }
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
    <div className="bg-white text-gray-800 min-h-screen font-sans selection:bg-purple-200 selection:text-purple-900 overflow-x-hidden">

      <motion.div 
        initial="hidden" 
        animate="show" 
        variants={staggerContainer} 
      >
        {/* ---------------- HERO SECTION ---------------- */}
        <section className="relative h-[550px] w-full bg-zinc-900 overflow-hidden flex items-center">
          {/* Animated Cinematic Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />
            <motion.img
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
              alt="Hero Background"
              className="w-full h-full object-cover object-right-top opacity-80"
            />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div variants={fadeUpItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 font-bold text-xs uppercase tracking-widest mb-6 shadow-xl">
              <Flame size={16} className="text-orange-400" /> The New Standard of Delivery
            </motion.div>
            
            <motion.h1 variants={fadeUpItem} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-[1.1]">
              Crave It. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-300">
                We Deliver It.
              </span>
            </motion.h1>

            <motion.p variants={fadeUpItem} className="text-lg md:text-xl text-gray-300 mb-10 font-light tracking-wide max-w-2xl leading-relaxed">
              Discover handpicked local favorites and world-class kitchens, delivered hot and fresh directly to your door.
            </motion.p>

            {/* Glowing Magnetic Button */}
            <motion.button
              variants={fadeUpItem}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/order-now")}
              className="group bg-gradient-to-r from-[#4CAF50] to-[#43a047] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 text-base inline-flex items-center gap-3 shadow-[0_10px_40px_-10px_rgba(76,175,80,0.6)] hover:shadow-[0_20px_50px_-10px_rgba(76,175,80,0.8)]"
            >
              Explore Restaurants
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={20} className="group-hover:text-purple-100" />
              </motion.div>
            </motion.button>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20">
          
          {/* ---------------- FEATURE STRIP ---------------- */}
          <section className="mb-24">
            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
              {[
                { icon: ChefHat, title: "Elite Kitchens", desc: "Handpicked top-rated chefs." },
                { icon: ShieldCheck, title: "Quality Assured", desc: "Every meal passes strict standards." },
                { icon: Truck, title: "Lightning Fast", desc: "Hot food delivered in minutes." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpItem}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex items-start gap-5 transition-all duration-300 group hover:border-purple-100"
                >
                  <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                    <item.icon size={26} strokeWidth={2} />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-1.5">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Section Header */}
          <motion.div variants={fadeUpItem} className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Top Collections
              </h2>
              <p className="text-gray-500 text-lg font-medium">
                Explore curated lists of top restaurants based on trends.
              </p>
            </div>
          </motion.div>

          {/* ---------------- CATEGORY FILTER (Gliding Pills) ---------------- */}
          <section className="mb-10">
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-gray-50 rounded-2xl w-max border border-gray-100/80">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 z-10 overflow-hidden ${
                    activeCategory === cat ? "text-white" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 bg-gray-900 rounded-xl -z-10 shadow-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* ---------------- RESTAURANT GRID ---------------- */}
          <section className="pb-24">
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((r, i) => (
                  <motion.div
                    key={r.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05, type: "spring" }}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer rounded-[1.5rem] overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-gray-200 transition-all duration-300 bg-white flex flex-col h-full relative"
                    onClick={() => navigate("/order-now")}
                  >
                    {/* Glowing Accent Line at the top */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

                    {/* Image Area with beautiful pastel gradient */}
                    <div className="h-56 w-full overflow-hidden relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
                      <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors z-10" />
                      
                      {r.trending && (
                        <span className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-gray-900 font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-white/50">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                          </span>
                          Trending
                        </span>
                      )}
                      
                      {/* Floating Emoji Physics */}
                      <motion.div 
                        className="text-[5rem] drop-shadow-xl z-0"
                        whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        {r.emoji}
                      </motion.div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-grow flex flex-col bg-white">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2">
                        {r.badge}
                      </p>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                        {r.name}
                      </h3>
                      <p className="text-sm font-medium text-gray-500 mb-6 flex-grow">
                        {r.cuisine}
                      </p>

                      <div className="flex justify-between items-center text-sm font-bold mt-auto pt-5 border-t border-gray-100">
                        <span className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg">
                          <Star size={14} className="fill-purple-600 text-purple-600" /> {r.rating}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg group-hover:bg-gray-100 transition-colors">
                          <Clock size={14} className="text-gray-400" /> {r.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </section>

        </div>

        {/* ---------------- BRAND STATS ---------------- */}
        <section className="border-t border-gray-100 py-20 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
          {/* Decorative subtle background shape */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/40 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center relative z-10">
            {[
              { number: "500+", label: "Curated Kitchens", gradient: "from-blue-600 to-indigo-600" },
              { number: "180K", label: "Happy Foodies", gradient: "from-orange-500 to-red-500" },
              { number: "4.9", label: "Average Rating", gradient: "from-purple-500 to-emerald-500" },
              { number: "24/7", label: "Fast Delivery", gradient: "from-purple-600 to-pink-500" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                variants={fadeUpItem} 
                className="p-4"
              >
                <h3 className={`text-4xl md:text-5xl font-black tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}>
                  {stat.number}
                </h3>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

      </motion.div>
    </div>
  );
};

export default Home;