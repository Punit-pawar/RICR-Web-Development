import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import api from "../config/Api";
import { Send, MapPin, Phone, Mail, RefreshCw } from "lucide-react";

// ✨ Upgraded Spring Animations
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
};

const floatingAnimation = {
  animate: {
    y: [0, -20, 0],
    x: [0, 15, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  }
};

const floatingAnimationReverse = {
  animate: {
    y: [0, 20, 0],
    x: [0, -15, 0],
    transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/public/new-contact", formData);
      toast.success(res.data.message);
      handleClearForm();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF8F3] text-gray-900 font-sans selection:bg-purple-200 selection:text-purple-900 relative overflow-hidden pt-32 pb-24">
      
      {/* 🎨 Animated Ambient Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <motion.div 
        variants={floatingAnimation}
        animate="animate"
        className="absolute w-[600px] h-[600px] bg-purple-400/20 blur-[120px] rounded-full -top-40 -left-20 pointer-events-none" 
      />
      <motion.div 
        variants={floatingAnimationReverse}
        animate="animate"
        className="absolute w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full bottom-0 -right-40 pointer-events-none" 
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        {/* ---------------- HEADER ---------------- */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div 
            variants={fadeUpItem} 
            whileHover={{ scale: 1.05, y: -5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-purple-100 shadow-md text-sm font-bold text-gray-700 mb-6 cursor-default transition-colors hover:border-purple-300"
          >
            <motion.div 
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="bg-purple-100 p-1.5 rounded-full text-purple-600"
            >
              <Mail size={14} />
            </motion.div>
            Get in Touch
          </motion.div>
          
          <motion.h1 variants={fadeUpItem} className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 mb-4">
            We're Here to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 inline-block hover:scale-105 transition-transform duration-300 cursor-default">Help.</span>
          </motion.h1>
          
          <motion.p variants={fadeUpItem} className="text-gray-500 text-lg font-medium leading-relaxed">
            Have a question, feedback, or need support with an order? Drop us a message and our team will get back to you swiftly.
          </motion.p>
        </div>

        {/* ---------------- LAYOUT GRID ---------------- */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: FORM CARD */}
          <motion.div 
            variants={slideInLeft} 
            className="lg:col-span-7 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white/60 p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-100 rounded-full blur-2xl pointer-events-none animate-pulse" />

            <motion.h2 variants={fadeUpItem} className="text-2xl font-black text-gray-900 mb-8 tracking-tight flex items-center gap-3">
              Send a Message
              <motion.span 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-purple-500 block"
              />
            </motion.h2>

            <form onSubmit={handleSubmit} onReset={handleClearForm} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-5">
                <motion.div variants={fadeUpItem} whileFocus={{ scale: 1.02, y: -2 }} className="col-span-1">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-purple-300 rounded-2xl px-5 py-4 focus:bg-white outline-none transition-all shadow-sm focus:shadow-[0_8px_20px_rgba(168,85,247,0.15)] font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </motion.div>

                <motion.div variants={fadeUpItem} whileFocus={{ scale: 1.02, y: -2 }} className="col-span-1">
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    maxLength="10"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-purple-300 rounded-2xl px-5 py-4 focus:bg-white outline-none transition-all shadow-sm focus:shadow-[0_8px_20px_rgba(168,85,247,0.15)] font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </motion.div>
              </div>

              <motion.div variants={fadeUpItem} whileFocus={{ scale: 1.01, y: -2 }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-purple-300 rounded-2xl px-5 py-4 focus:bg-white outline-none transition-all shadow-sm focus:shadow-[0_8px_20px_rgba(168,85,247,0.15)] font-medium text-gray-900 placeholder:text-gray-400"
                />
              </motion.div>

              <motion.div variants={fadeUpItem} whileFocus={{ scale: 1.01, y: -2 }}>
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  rows="5"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-purple-300 rounded-2xl px-5 py-4 focus:bg-white outline-none transition-all shadow-sm focus:shadow-[0_8px_20px_rgba(168,85,247,0.15)] font-medium text-gray-900 placeholder:text-gray-400 resize-none"
                />
              </motion.div>

              {/* Buttons */}
              <motion.div variants={fadeUpItem} className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "#e5e7eb" }}
                  whileTap={{ scale: 0.95 }}
                  type="reset"
                  disabled={isLoading}
                  className="px-8 py-4 rounded-2xl bg-gray-100 text-gray-600 transition-colors font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                >
                  <RefreshCw size={16} className="hover:rotate-180 transition-transform duration-500" /> Clear
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 15px 35px rgba(168,85,247,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(168,85,247,0.3)] hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <RefreshCw size={18} className="animate-spin" /> Submitting...
                      </motion.div>
                    ) : (
                      <motion.div key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        Send Message <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><Send size={16} /></motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* RIGHT: CONTACT INFO & MAP */}
          <motion.div variants={slideInRight} className="lg:col-span-5 space-y-6">
            
            {/* Contact Info Cards */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white/60 p-8">
              <h3 className="text-xl font-black text-gray-900 mb-6">Direct Connect</h3>
              
              <div className="space-y-6">
                <motion.div whileHover={{ x: 10 }} className="flex items-start gap-4 group cursor-pointer">
                  <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <Phone size={20} />
                  </motion.div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 group-hover:text-purple-400 transition-colors">Phone Support</p>
                    <p className="text-gray-900 font-bold text-lg">+1 (800) 123-4567</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 10 }} className="flex items-start gap-4 group cursor-pointer">
                  <motion.div whileHover={{ rotate: -15, scale: 1.1 }} className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Mail size={20} />
                  </motion.div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 group-hover:text-blue-400 transition-colors">Email Us</p>
                    <p className="text-gray-900 font-bold text-lg">support@dinex.com</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 10 }} className="flex items-start gap-4 group cursor-pointer">
                  <motion.div whileHover={{ y: -5, scale: 1.1 }} className="w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center shrink-0 group-hover:bg-fuchsia-600 group-hover:text-white transition-colors duration-300">
                    <MapPin size={20} />
                  </motion.div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 group-hover:text-fuchsia-400 transition-colors">Headquarters</p>
                    <p className="text-gray-900 font-bold leading-tight">bhopal<br/>Indrapuri Sector C </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Map Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white/60 p-4"
            >
              <div className="w-full h-[280px] rounded-[1.5rem] overflow-hidden bg-gray-100 relative group">
                <iframe
                  title="DineX Headquarters"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.538561111977!2d-118.40316418478477!3d34.08130832363198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d3d147ab%3A0x6b77203b5ba77eb!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                  className="w-full h-full border-0 filter grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

          </motion.div>
        </div>

        <motion.p variants={fadeUpItem} className="text-center text-gray-400 mt-12 text-sm font-medium">
          We typically respond within 24 hours. For urgent matters, please call our support line.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Contact;