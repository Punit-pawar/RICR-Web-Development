import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, Star, Flame, ArrowRight, ShieldCheck, Truck, ChefHat, Sparkles, ChevronDown } from "lucide-react";

// ✨ Master Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 12, mass: 1 }
  }
};

const letterAnimation = {
  hidden: { opacity: 0, y: 30, rotateX: -90 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 12, stiffness: 200 } }
};

// New: For staggered grids
const gridItem = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
};

const Home = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Parallax Scroll Setup for the Hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Smoother Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]); // Added zoom effect
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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
    <div className="bg-[#f4f6f8] text-gray-800 min-h-screen font-sans selection:bg-emerald-300 selection:text-emerald-900 overflow-x-hidden">

      {/* ---------------- HERO SECTION ---------------- */}
      <section ref={heroRef} className="relative h-[95vh] w-full bg-zinc-950 overflow-hidden flex flex-col justify-center items-center">
        
        {/* Parallax Background with Zoom */}
        <motion.div 
          style={{ y: backgroundY, scale: backgroundScale }}
          className="absolute inset-0 z-0 w-full h-[120%] origin-top"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#f4f6f8] z-10" />
          <img
            src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover object-center opacity-80"
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ y: textY, opacity: opacityFade }}
          initial="hidden" animate="show" variants={staggerContainer}
          className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center flex flex-col items-center -mt-10"
        >
          <motion.div variants={fadeUpItem} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold text-xs uppercase tracking-[0.2em] mb-8 shadow-xl">
            <Flame size={16} className="text-orange-400 animate-pulse" /> The New Standard
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter leading-[0.95] perspective-1000">
            <motion.div variants={fadeUpItem} className="drop-shadow-2xl">
              Crave It.
            </motion.div>
            <motion.div variants={fadeUpItem} className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 pb-2">
              We Deliver It.
            </motion.div>
          </h1>

          <motion.p variants={fadeUpItem} className="text-lg md:text-2xl text-gray-200 mb-12 font-medium tracking-wide max-w-2xl leading-relaxed drop-shadow-md">
            Handpicked local favorites and world-class kitchens, delivered perfectly to your door.
          </motion.p>

          <motion.button
            variants={fadeUpItem}
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/order-now")}
            className="relative group bg-white text-gray-900 px-10 py-5 rounded-full font-black transition-all duration-300 text-lg inline-flex items-center gap-4 overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
            <span className="relative z-10 flex items-center gap-3">
              Explore Menu
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight size={22} className="group-hover:text-emerald-600 transition-colors" />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>

        {/* Bouncy Scroll Indicator */}
        <motion.div 
          style={{ opacity: opacityFade }}
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 z-20 text-white/50"
        >
          <ChevronDown size={36} />
        </motion.div>
      </section>

      {/* Main Content Wrapper */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 pb-32">
        
        {/* ---------------- UNIFIED FEATURE DASHBOARD ---------------- */}
        <section className="-mt-20 mb-24 relative">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white/50 w-full"
          >
            <div className="grid md:grid-cols-3 gap-10 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {[
                { icon: ChefHat, title: "Elite Kitchens", desc: "Curated top-tier local chefs." },
                { icon: ShieldCheck, title: "Quality Assured", desc: "Rigorous hygiene standards." },
                { icon: Truck, title: "Lightning Fast", desc: "Hot, fresh, and on time." },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={gridItem}
                  whileHover={{ y: -8 }}
                  className="flex flex-col items-center text-center px-4 pt-6 md:pt-0 first:pt-0 group cursor-default transition-transform duration-300"
                >
                  <div className="w-16 h-16 mb-5 bg-zinc-50 text-zinc-800 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500 shadow-sm relative overflow-hidden">
                     {/* Icon background burst on hover */}
                     <span className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out" />
                    <item.icon size={28} strokeWidth={2} className="relative z-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" />
                  </div>
                  <h3 className="font-extrabold text-xl text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ---------------- COLLECTION HEADER ---------------- */}
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="mb-12 flex flex-col items-center text-center gap-4"
        >
          <motion.div variants={fadeUpItem} className="flex items-center gap-2 px-4 py-1.5 bg-purple-100 rounded-full">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
              <Sparkles size={16} className="text-purple-600" />
            </motion.div>
            <span className="text-purple-700 font-bold uppercase tracking-widest text-xs">Curated For You</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter flex overflow-hidden perspective-1000">
            {Array.from("Trending Now").map((letter, index) => (
              <motion.span key={index} variants={letterAnimation} className={letter === " " ? "w-3 md:w-4" : "inline-block"}>
                {letter}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {/* ---------------- CATEGORY FILTER ---------------- */}
        <section className="mb-16 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex flex-wrap items-center justify-center gap-2 p-2 bg-white rounded-3xl border border-gray-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 z-10 ${
                  activeCategory === cat ? "text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategoryTab"
                    className="absolute inset-0 bg-gray-900 rounded-2xl -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </motion.div>
        </section>

        {/* ---------------- RESTAURANT GRID ---------------- */}
        <section>
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((r, i) => (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)", transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, delay: i * 0.08, type: "spring", bounce: 0.3 }}
                  whileHover={{ y: -12 }} // Explicit hover lift via Framer Motion
                  className="group cursor-pointer rounded-[2rem] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-shadow duration-500 bg-white flex flex-col h-full border border-gray-100"
                  onClick={() => navigate("/order-now")}
                >
                  {/* Image Area */}
                  <div className="h-52 w-full relative bg-gradient-to-br from-indigo-50 via-purple-50 to-emerald-50 overflow-hidden flex justify-center items-center">
                    
                    {/* Hover Image Scale effect */}
                    <div className="absolute inset-0 bg-black/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {r.trending && (
                      <span className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md text-gray-900 font-extrabold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        Trending
                      </span>
                    )}

                    {/* Continuous Floating Emoji Background Art */}
                    <motion.div 
                      animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: i * 0.2 }}
                      className="text-[5rem] drop-shadow-xl z-0 absolute"
                    >
                      <motion.div
                        variants={{ hover: { scale: 1.25, rotate: 10 } }} // Extra boost on hover
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        {r.emoji}
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-grow flex flex-col bg-white relative z-20">
                    <div className="absolute -top-4 right-6 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg z-20 transform group-hover:-translate-y-2 transition-transform duration-500">
                      {r.badge}
                    </div>

                    <h3 className="text-xl font-black text-gray-900 mb-1 mt-2 group-hover:text-emerald-600 transition-colors duration-300">
                      {r.name}
                    </h3>
                    <p className="text-sm font-bold text-gray-400 mb-6 flex-grow">
                      {r.cuisine}
                    </p>

                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" /> {r.rating}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm font-bold text-gray-500 bg-gray-50 px-3 py-1 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors duration-300">
                        <Clock size={14} /> {r.time}
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
      <section className="py-24 bg-zinc-950 relative overflow-hidden text-white rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] mt-10">
        
        {/* Ambient Breathing Background Glow */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-r from-purple-600/30 via-emerald-600/30 to-blue-600/30 blur-[120px] rounded-full pointer-events-none" 
        />
        
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10"
        >
          {[
            { number: "500+", label: "Curated Kitchens" },
            { number: "180K", label: "Happy Foodies" },
            { number: "4.9", label: "Average Rating" },
            { number: "24/7", label: "Fast Delivery" },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              variants={gridItem}
              className="flex flex-col items-center justify-center group"
            >
              <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-3 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-lg group-hover:scale-110 transition-transform duration-500 ease-out">
                {stat.number}
              </h3>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.2em] group-hover:text-zinc-300 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </div>
  );
};

export default Home;