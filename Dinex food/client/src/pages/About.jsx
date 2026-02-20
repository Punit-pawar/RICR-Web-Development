import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Eye, Zap, Utensils, ShieldCheck, Heart, ArrowRight, Info } from "lucide-react";

// ✨ Butter-smooth Spring Animations
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 90, damping: 14 } 
  }
};

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FCF8F3] text-gray-900 min-h-screen font-sans selection:bg-orange-200 selection:text-orange-900 overflow-hidden relative">
      
      {/* 🎨 Ambient Background Blurs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-orange-400/10 blur-[120px] rounded-full -top-40 -left-20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-amber-400/10 blur-[120px] rounded-full top-[40%] -right-40 pointer-events-none" />

      <motion.div initial="hidden" animate="show" variants={staggerContainer} className="relative z-10">
        
        {/* ---------------- HERO SECTION ---------------- */}
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center flex flex-col items-center">
          
          <motion.div variants={fadeUpItem} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-bold text-gray-700 mb-8">
            <div className="bg-orange-100 p-1.5 rounded-full text-orange-600"><Info size={14} /></div>
            Our Story
          </motion.div>

          <motion.h1 variants={fadeUpItem} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] text-gray-900 mb-6">
            Redefining the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
              Dining Experience.
            </span>
          </motion.h1>

          <motion.p variants={fadeUpItem} className="text-gray-500 md:text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            We connect food lovers with the best restaurants around them. Fast delivery, amazing taste, and a delightful digital experience.
          </motion.p>

          <motion.div
            variants={fadeUpItem}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-32 h-32 bg-white rounded-full shadow-[0_20px_40px_rgba(234,88,12,0.15)] flex items-center justify-center text-6xl border border-gray-100"
          >
            🍝
          </motion.div>
        </section>

        {/* ---------------- WHO WE ARE ---------------- */}
        <section className="py-24 bg-white/60 backdrop-blur-xl border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.h2 variants={fadeUpItem} className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
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
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative flex justify-center items-center h-[400px] bg-gradient-to-br from-orange-50 to-amber-100 rounded-[3rem] shadow-inner overflow-hidden border border-orange-100/50"
            >
              {/* Optional: You can replace this emoji with an actual image in your project */}
              
              <div className="absolute z-10 text-[140px] drop-shadow-2xl hover:scale-110 transition-transform duration-500 cursor-pointer">
                🍜
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------------- MISSION & VISION ---------------- */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
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
                whileHover={{ y: -10 }}
                className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-orange-200 hover:shadow-[0_20px_40px_rgba(234,88,12,0.08)] transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <item.icon size={28} strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
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
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight"
            >
              Why People Love <span className="text-orange-500">DineX</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  className="bg-white/5 backdrop-blur-sm rounded-[2rem] p-8 border border-white/10 text-center hover:bg-white/10 transition-colors"
                >
                  <div className="w-14 h-14 mx-auto bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mb-6">
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-bold text-xl mb-3 tracking-tight">
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
        <section className="py-24 border-b border-gray-200/60 bg-white">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: "500+", label: "Restaurants" },
              { value: "50K+", label: "Happy Customers" },
              { value: "1M+", label: "Orders Delivered" },
              { value: "24/7", label: "Priority Support" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
              >
                <p className="text-5xl font-black text-gray-900 tracking-tighter mb-2">{stat.value}</p>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section className="py-32 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Hungry Already?
            </h2>

            <p className="text-gray-500 text-lg font-medium mb-10">
              Explore our curated selection of top-tier restaurants and order your favorite meals right now.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/order-now")}
              className="px-10 py-5 bg-orange-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(234,88,12,0.3)] hover:bg-orange-500 transition-colors inline-flex items-center gap-3"
            >
              Order Now
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </section>

      </motion.div>
    </div>
  );
};

export default About;