import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Eye, Zap, Utensils, ShieldCheck, Heart, ArrowRight, Info } from "lucide-react";

// ✨ Upgraded Animation Variants matching the Home page
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  }
};

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans selection:bg-purple-200 selection:text-purple-900 overflow-x-hidden">
      
      <motion.div initial="hidden" animate="show" variants={staggerContainer} className="relative z-10">
        
        {/* ---------------- HERO SECTION (Cinematic) ---------------- */}
        <section className="relative h-[600px] w-full bg-zinc-900 overflow-hidden flex flex-col items-center justify-center text-center px-6">
          {/* Animated Cinematic Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10" />
            <motion.img
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
              alt="Dining Experience"
              className="w-full h-full object-cover opacity-60"
            />
          </div>

          <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
            <motion.div variants={fadeUpItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 font-bold text-xs uppercase tracking-widest mb-8 shadow-xl">
              <div className="bg-purple-500/20 p-1.5 rounded-full text-purple-400"><Info size={14} /></div>
              Our Story
            </motion.div>

            <motion.h1 variants={fadeUpItem} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-white mb-6">
              Redefining the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-300">
                Dining Experience.
              </span>
            </motion.h1>

            <motion.p variants={fadeUpItem} className="text-gray-300 md:text-xl max-w-2xl mx-auto font-light tracking-wide leading-relaxed mb-12">
              We connect food lovers with the best restaurants around them. Fast delivery, amazing taste, and a delightful digital experience.
            </motion.p>

            <motion.div
              variants={fadeUpItem}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full shadow-[0_0_30px_rgba(76,175,80,0.3)] flex items-center justify-center text-5xl border border-white/20"
            >
              🍝
            </motion.div>
          </div>
        </section>

        {/* ---------------- WHO WE ARE ---------------- */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.h2 variants={fadeUpItem} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Who We Are
              </motion.h2>

              <motion.p variants={fadeUpItem} className="text-gray-500 text-lg font-medium leading-relaxed mb-6">
                DineX is a modern food ordering platform designed to make your cravings disappear in minutes. We partner with top-rated local restaurants to bring quality meals straight to your doorstep.
              </motion.p>

              <motion.p variants={fadeUpItem} className="text-gray-500 text-lg font-medium leading-relaxed">
                Our goal is simple — deliver happiness through food with a smooth, reliable, and highly curated digital experience.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative flex justify-center items-center h-[450px] bg-gradient-to-br from-purple-50 via-emerald-50 to-teal-50 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-purple-100/50 group"
            >
              <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors z-10" />
              <motion.div 
                className="absolute z-20 text-[140px] drop-shadow-2xl cursor-pointer"
                whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                🍜
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ---------------- MISSION & VISION ---------------- */}
        <section className="pb-24 pt-10 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                text: "To make food ordering effortless, fast, and enjoyable while supporting local restaurants and delivering exceptional dining experiences.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                text: "To become the most loved food delivery platform by continuously improving convenience, quality, and overall customer satisfaction.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUpItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white p-10 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-purple-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                  <item.icon size={28} strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed text-lg">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------- WHY PEOPLE LOVE DINEX ---------------- */}
        <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight"
            >
              Why People Love <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">DineX</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Zap, title: "Lightning Fast", desc: "Quick delivery you can rely on" },
                { icon: Utensils, title: "Wide Variety", desc: "Hundreds of elite kitchens" },
                { icon: ShieldCheck, title: "Secure Payments", desc: "Safe & trusted checkout" },
                { icon: Heart, title: "Customer First", desc: "We value every single order" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white/5 backdrop-blur-md rounded-[1.5rem] p-8 border border-white/10 text-center hover:bg-white/10 transition-colors group"
                >
                  <div className="w-14 h-14 mx-auto bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                    <item.icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-xl mb-3 tracking-tight text-gray-100">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-medium text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- STATS ---------------- */}
        <section className="py-20 bg-gray-50/50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: "500+", label: "Restaurants", gradient: "from-blue-600 to-indigo-600" },
              { value: "50K+", label: "Happy Customers", gradient: "from-orange-500 to-red-500" },
              { value: "1M+", label: "Orders Delivered", gradient: "from-purple-500 to-emerald-500" },
              { value: "24/7", label: "Priority Support", gradient: "from-purple-600 to-pink-500" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="p-4"
              >
                <p className={`text-4xl md:text-5xl font-black tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}>
                  {stat.value}
                </p>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section className="py-32 text-center px-6 bg-white relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-50 rounded-full blur-[100px] pointer-events-none opacity-50" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Hungry Already?
            </h2>

            <p className="text-gray-500 text-lg font-medium mb-10 leading-relaxed">
              Explore our curated selection of top-tier restaurants and order your favorite meals right now.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/order-now")}
              className="group bg-gradient-to-r from-[#4CAF50] to-[#43a047] text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 text-base inline-flex items-center gap-3 shadow-[0_10px_40px_-10px_rgba(76,175,80,0.6)] hover:shadow-[0_20px_50px_-10px_rgba(76,175,80,0.8)]"
            >
              Order Now
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={20} className="group-hover:text-purple-100" />
              </motion.div>
            </motion.button>
          </motion.div>
        </section>

      </motion.div>
    </div>
  );
};

export default About;