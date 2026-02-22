import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../config/Api";
import { Send, MapPin, Phone, Mail, RefreshCw } from "lucide-react";

// ✨ Butter-smooth Spring Animations
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 90, damping: 14 } 
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
      
      {/* 🎨 Ambient Background & Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-purple-400/10 blur-[120px] rounded-full -top-40 -left-20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full bottom-0 -right-40 pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        {/* ---------------- HEADER ---------------- */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div variants={fadeUpItem} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-bold text-gray-700 mb-6">
            <div className="bg-purple-100 p-1.5 rounded-full text-purple-600"><Mail size={14} /></div>
            Get in Touch
          </motion.div>
          <motion.h1 variants={fadeUpItem} className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 mb-4">
            We're Here to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Help.</span>
          </motion.h1>
          <motion.p variants={fadeUpItem} className="text-gray-500 text-lg font-medium leading-relaxed">
            Have a question, feedback, or need support with an order? Drop us a message and our team will get back to you swiftly.
          </motion.p>
        </div>

        {/* ---------------- LAYOUT GRID ---------------- */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: FORM CARD */}
          <motion.div variants={fadeUpItem} className="lg:col-span-7 bg-white rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-8 md:p-12 relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-50 rounded-full blur-2xl pointer-events-none" />

            <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Send a Message</h2>

            <form onSubmit={handleSubmit} onReset={handleClearForm} className="space-y-5 relative z-10">
              <div className="grid md:grid-cols-2 gap-5">
                <motion.div whileFocus={{ scale: 1.01 }} className="col-span-1">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-purple-500/50 focus:bg-white outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.01 }} className="col-span-1">
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    maxLength="10"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-purple-500/50 focus:bg-white outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </motion.div>
              </div>

              <motion.div whileFocus={{ scale: 1.01 }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-purple-500/50 focus:bg-white outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.01 }}>
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  rows="5"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-purple-500/50 focus:bg-white outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 resize-none"
                />
              </motion.div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  type="reset"
                  disabled={isLoading}
                  className="px-8 py-4 rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                >
                  <RefreshCw size={16} /> Clear
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-4 rounded-2xl bg-purple-600 text-white font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(234,88,12,0.3)] hover:bg-purple-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Submitting..." : "Send Message"}
                  {!isLoading && <Send size={16} />}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* RIGHT: CONTACT INFO & MAP */}
          <motion.div variants={fadeUpItem} className="lg:col-span-5 space-y-6">
            
            {/* Contact Info Cards */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-8">
              <h3 className="text-xl font-black text-gray-900 mb-6">Direct Connect</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Phone Support</p>
                    <p className="text-gray-900 font-bold text-lg">+1 (800) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Email Us</p>
                    <p className="text-gray-900 font-bold text-lg">support@dinex.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Headquarters</p>
                    <p className="text-gray-900 font-bold leading-tight">123 Culinary Blvd, Suite 400<br/>Beverly Hills, CA 90210</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-4">
              <div className="w-full h-[280px] rounded-[1.5rem] overflow-hidden bg-gray-100 relative">
                {/* Fallback styling for the iframe so it looks good embedded */}
                <iframe
                  title="DineX Headquarters"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.538561111977!2d-118.40316418478477!3d34.08130832363198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d3d147ab%3A0x6b77203b5ba77eb!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                  className="w-full h-full border-0 filter grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

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