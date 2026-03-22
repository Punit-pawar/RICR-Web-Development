import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Target, Eye, Zap, Utensils, ShieldCheck, Heart, ArrowRight, Info, Award, ChefHat } from "lucide-react";

// ✨ Master Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)", scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 14, mass: 1 } 
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60, filter: "blur(8px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 90, damping: 15 } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60, filter: "blur(8px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 90, damping: 15 } }
};

const letterAnimation = {
  hidden: { opacity: 0, y: 30, rotateX: -90 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 12, stiffness: 200 } }
};

const floatContinuous = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
  }
};

const About = () => {
  const navigate = useNavigate();

  // Parallax Scroll Setup for Hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="bg-[#fdfbf9] text-gray-800 min-h-screen font-sans selection:bg-purple-300 selection:text-purple-900 overflow-x-hidden">
      
      {/* ---------------- HERO SECTION ---------------- */}
      <section ref={heroRef} className="relative h-[90vh] w-full bg-zinc-950 overflow-hidden flex flex-col justify-center items-center rounded-b-[3rem] md:rounded-b-[4rem] shadow-2xl z-10">
        
        {/* Parallax Background */}
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 w-full h-[120%]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-zinc-950/90 z-10" />
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80"
            alt="Dining Experience"
            className="w-full h-full object-cover object-center opacity-70"
          />
        </motion.div>

        {/* Floating Light Beams */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
          transition={{ rotate: { duration: 150, repeat: Infinity, ease: "linear" }, scale: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(168,85,247,0.15)_360deg)] z-0 pointer-events-none mix-blend-screen"
        />

        {/* Hero Content */}
        <motion.div 
          style={{ y: textY, opacity: opacityFade }}
          initial="hidden" animate="show" variants={staggerContainer}
          className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8 w-full text-center flex flex-col items-center -mt-10"
        >
          <motion.div variants={fadeUpItem} whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl text-white border border-white/20 font-bold text-xs uppercase tracking-[0.2em] mb-8 shadow-[0_0_30px_rgba(168,85,247,0.3)] cursor-default">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }} className="bg-purple-500/40 p-1.5 rounded-full text-purple-200">
              <Info size={14} />
            </motion.div>
            Our Story
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[1.05] perspective-1000">
            <motion.div variants={fadeUpItem} className="drop-shadow-2xl inline-block">
              Redefining the
            </motion.div>
            <br/>
            <motion.div variants={fadeUpItem} className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 pb-2 inline-block drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Dining Experience.
            </motion.div>
          </h1>

          <motion.p variants={fadeUpItem} className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-medium tracking-wide leading-relaxed mb-12 drop-shadow-md">
            Connecting food lovers with elite local kitchens. Fast delivery, breathtaking taste, and a flawless digital experience.
          </motion.p>
        </motion.div>
      </section>

      <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 -mt-24 pb-24">
        
        {/* ---------------- WHO WE ARE (Image + Text) ---------------- */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Cinematic Image Card */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="relative h-[500px] lg:h-[640px] rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] overflow-hidden group border-[6px] border-white bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700 z-10 pointer-events-none" />
              <motion.img 
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Chef preparing food" 
                className="w-full h-full object-cover"
              />
              
              {/* Floating Badge */}
              <motion.div 
                variants={floatContinuous}
                animate="animate"
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-8 left-8 lg:-left-6 z-20 bg-white/95 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl flex items-center gap-5 border border-white/60 cursor-default"
              >
                <motion.div whileHover={{ rotate: 15 }} className="bg-emerald-100 p-4 rounded-full text-emerald-600 shadow-inner">
                  <Award size={32} />
                </motion.div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Guarantee</p>
                  <p className="text-xl font-black text-gray-900 leading-none">100% Quality</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
              <motion.h2 variants={fadeUpItem} className="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">
                Crafted for the <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-emerald-500">Modern Foodie</span>
              </motion.h2>

              <motion.p variants={fadeUpItem} className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed mb-6">
                DineX is a premium food ordering platform designed to make your cravings disappear in minutes. We partner exclusively with top-rated local chefs and restaurants to bring world-class meals straight to your doorstep.
              </motion.p>

              <motion.p variants={fadeUpItem} className="text-gray-500 text-lg font-medium leading-relaxed mb-10">
                Our goal is simple — deliver happiness through food with a smooth, reliable, and highly curated digital experience that respects your time and your tastebuds.
              </motion.p>

              <motion.div variants={fadeUpItem} className="flex gap-6">
                <motion.div whileHover={{ y: -5, rotate: -5, shadow: "0 10px 25px rgba(168,85,247,0.3)" }} className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm border border-purple-100 transition-all">
                  <ChefHat size={30} />
                </motion.div>
                <motion.div whileHover={{ y: -5, rotate: 5, shadow: "0 10px 25px rgba(16,185,129,0.3)" }} className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100 transition-all">
                  <Heart size={30} />
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* ---------------- STATS STRIP ---------------- */}
        <section className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="bg-white rounded-[3rem] p-10 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-gray-100 relative overflow-hidden"
          >
            {/* Subtle background glow inside the stats card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-full bg-gradient-to-r from-transparent via-purple-50/50 to-transparent -rotate-12 pointer-events-none" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center divide-x divide-gray-100 relative z-10">
              {[
                { value: "500+", label: "Elite Partners", gradient: "from-blue-600 to-indigo-600" },
                { value: "50K+", label: "Happy Foodies", gradient: "from-orange-500 to-red-500" },
                { value: "1M+", label: "Meals Delivered", gradient: "from-emerald-500 to-teal-500" },
                { value: "24/7", label: "Priority Support", gradient: "from-purple-600 to-pink-500" },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center justify-center cursor-default group"
                >
                  <p className={`text-4xl md:text-6xl font-black tracking-tighter mb-3 text-transparent bg-clip-text bg-gradient-to-b ${stat.gradient} group-hover:drop-shadow-lg transition-all duration-300`}>
                    {stat.value}
                  </p>
                  <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs group-hover:text-gray-600 transition-colors">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ---------------- MISSION & VISION (Bento/Offset Layout) ---------------- */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-8 items-start relative">
            
            {/* Ambient Background blobs for Bento */}
            <div className="absolute top-0 left-10 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-10 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />

            {[
              {
                icon: Target,
                title: "Our Mission",
                text: "To make food ordering effortless, fast, and enjoyable while supporting local restaurants and delivering exceptional dining experiences right to your table.",
                margin: "md:mt-0",
                color: "purple"
              },
              {
                icon: Eye,
                title: "Our Vision",
                text: "To become the most loved food delivery platform globally by continuously innovating convenience, quality, and pushing the boundaries of customer satisfaction.",
                margin: "md:mt-16",
                color: "emerald"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, type: "spring", bounce: 0.3 }}
                whileHover={{ y: -10 }}
                className={`relative bg-white/80 backdrop-blur-xl p-12 md:p-14 rounded-[3rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-white hover:border-${item.color}-100 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500 group overflow-hidden ${item.margin}`}
              >
                {/* Sweep Glass Shine Effect */}
                <motion.div 
                  className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  whileHover={{ left: "150%" }}
                />

                <div className="relative z-10">
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-20 h-20 bg-${item.color}-50 text-${item.color}-600 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-${item.color}-500 group-hover:text-white transition-colors duration-500 shadow-sm`}
                  >
                    <item.icon size={36} strokeWidth={2} />
                  </motion.div>
                  <h3 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed text-lg">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* ---------------- WHY PEOPLE LOVE DINEX (Immersive Dark Section) ---------------- */}
      <section className="py-32 bg-zinc-950 text-white relative overflow-hidden rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.4)]">
        
        {/* Animated Orbs */}
        <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-gradient-to-b from-purple-600/30 to-transparent rounded-full blur-[150px] pointer-events-none" />
        <motion.div animate={{ rotate: -360, scale: [1, 1.3, 1] }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-emerald-600/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter flex overflow-hidden mb-6 drop-shadow-lg">
              {Array.from("Why Choose Us?").map((letter, index) => (
                <motion.span key={index} variants={letterAnimation} className={letter === " " ? "w-4 md:w-6" : "inline-block hover:text-purple-400 transition-colors duration-300"}>
                  {letter}
                </motion.span>
              ))}
            </h2>
            <motion.p variants={fadeUpItem} className="text-zinc-400 text-xl font-medium max-w-2xl">
              The details that make us the most loved food platform.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "AI-optimized routing for hot, rapid delivery." },
              { icon: Utensils, title: "World-Class", desc: "Only the finest, hand-vetted local kitchens." },
              { icon: ShieldCheck, title: "Hyper Secure", desc: "Bank-grade encryption for all transactions." },
              { icon: Heart, title: "Customer First", desc: "24/7 dedicated human support team." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, type: "spring", bounce: 0.5 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/10 text-center hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 group shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.2)]"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500/20 to-purple-500/5 text-purple-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-500 border border-purple-500/20 group-hover:border-transparent group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                >
                  <item.icon size={32} strokeWidth={1.5} />
                </motion.div>
                <h3 className="font-extrabold text-2xl mb-4 tracking-tight text-white group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-400 font-medium text-base leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA SECTION ---------------- */}
      <section className="py-32 text-center px-6 bg-[#fdfbf9] relative overflow-hidden">
        {/* Animated Background Mesh for CTA */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[radial-gradient(circle,rgba(168,85,247,0.05)_0%,transparent_50%)] pointer-events-none" />

        <motion.div
          variants={floatContinuous}
          animate="animate"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="max-w-4xl mx-auto relative z-10 bg-white rounded-[3rem] p-12 md:p-24 shadow-[0_30px_80px_rgba(0,0,0,0.06)] border border-gray-100"
          >
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter">
              Hungry Already?
            </h2>
            <p className="text-gray-500 text-xl font-medium mb-12 leading-relaxed max-w-2xl mx-auto">
              Stop waiting. Explore our curated selection of top-tier restaurants and order your next unforgettable meal right now.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, paddingRight: "4rem" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/order-now")}
              className="relative group bg-zinc-900 text-white px-12 py-6 rounded-full font-black transition-all duration-400 text-xl inline-flex items-center gap-4 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_50px_rgba(168,85,247,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-emerald-500 translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 z-0 rounded-full" />
              <span className="relative z-10 flex items-center gap-3">
                Start Your Order
                <motion.div className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:-right-4 transition-all duration-300">
                  <ArrowRight size={24} className="text-white" />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

export default About;