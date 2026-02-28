import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MessageCircle, 
  Phone, 
  ShoppingBag, 
  User, 
  CreditCard, 
  MapPin, 
  ChevronDown, 
  Zap, 
  LifeBuoy,
  Clock,
  ArrowRight,
  Headphones
} from "lucide-react";

// ✨ Smooth Spring Animations
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const UserHelpDesk = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const supportCategories = [
    { id: 1, title: "Order Issues", desc: "Missing items or late delivery", icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-50" },
    { id: 2, title: "Payments", desc: "Refunds and transaction status", icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 3, title: "Account", desc: "Security and profile settings", icon: User, color: "text-emerald-600", bg: "bg-emerald-50" },
    { id: 4, title: "Addresses", desc: "Manage delivery locations", icon: MapPin, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  const faqs = [
    { q: "How can I track my order in real-time?", a: "Once your order is confirmed, you can track it via the 'Active Orders' section on your dashboard. You will see the rider's live location and estimated arrival time." },
    { q: "What is the refund policy for cancelled orders?", a: "Refunds are processed within 5-7 business days to your original payment method. If you used DineX Wallet, the refund is instant." },
    { q: "How do I apply a coupon code?", a: "You can enter your promo code at the checkout page under the 'Offers & Benefits' section before completing your payment." },
    { q: "Can I change my delivery address after placing an order?", a: "Address changes are only possible before the restaurant starts preparing your food. Please contact our live support immediately for assistance." },
  ];

  return (
    <div className="relative min-h-screen bg-[#FCF8F3] p-4 md:p-8 font-sans text-gray-900 overflow-x-hidden">
      
      {/* 🎨 Ambient Background Blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial="hidden" 
        animate="show" 
        variants={staggerContainer}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* ---------------- HEADER ---------------- */}
        <motion.div variants={fadeUpItem} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-100 shadow-sm mb-6">
            <LifeBuoy className="text-purple-500" size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Concierge Support</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-4">
            Hello! How can we <br /><span className="text-purple-600 underline decoration-purple-200 underline-offset-8">help you today?</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-xl mx-auto mt-6">
            Search our knowledge base or select a category below to get the help you need.
          </p>
        </motion.div>

        {/* ---------------- SEARCH BOX ---------------- */}
        <motion.div variants={fadeUpItem} className="max-w-2xl mx-auto mb-16 relative">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
            <Search size={22} strokeWidth={2.5} />
          </div>
          <input 
            type="text" 
            placeholder="Search for articles, orders, or refunds..."
            className="w-full bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[2.5rem] pl-16 pr-8 py-7 focus:outline-none focus:ring-8 focus:ring-purple-500/5 transition-all text-lg font-bold placeholder:text-gray-400"
          />
        </motion.div>

        {/* ---------------- CATEGORY GRID ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {supportCategories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={fadeUpItem}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col items-center text-center group cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <cat.icon size={28} strokeWidth={2.5} />
              </div>
              <h3 className="font-black text-gray-900 text-lg mb-2">{cat.title}</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">{cat.desc}</p>
              <ArrowRight size={18} className="mt-6 text-gray-300 group-hover:text-purple-500 transition-colors group-hover:translate-x-1" />
            </motion.div>
          ))}
        </div>

        {/* ---------------- FAQ & CONTACT ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-10">
          
          {/* FAQ Column */}
          <motion.div variants={fadeUpItem} className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 mb-6">
               <Zap className="text-amber-500 fill-amber-500" size={24} />
               <h2 className="text-2xl font-black text-gray-900 tracking-tight">Trending Topics</h2>
            </div>
            
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-bold text-gray-800">{faq.q}</span>
                  <ChevronDown className={`text-gray-400 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-purple-600' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-6 text-gray-500 font-medium leading-relaxed text-sm"
                    >
                      <div className="pt-4 border-t border-gray-50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={fadeUpItem} className="space-y-6">
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
               <h3 className="text-xl font-black mb-6 relative z-10">Live Support</h3>
               
               <div className="space-y-4 relative z-10">
                  <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                    <div className="p-3 bg-purple-500 rounded-xl text-white">
                      <MessageCircle size={20} strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest text-purple-300">Live Chat</p>
                      <p className="text-sm font-bold">Chat with our team</p>
                    </div>
                    <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </button>

                  <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                    <div className="p-3 bg-blue-500 rounded-xl text-white">
                      <Phone size={20} strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-300">Support Line</p>
                      <p className="text-sm font-bold">Request a callback</p>
                    </div>
                  </button>
               </div>

               <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-purple-400 border border-white/5">
                    <Headphones size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400">Average Wait Time</p>
                    <p className="text-sm font-black text-emerald-400 tracking-wide">~ 2 Minutes</p>
                  </div>
               </div>
            </div>

            {/* Recent Ticket Status Card */}
            <div className="bg-purple-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-center text-center shadow-lg shadow-purple-200">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-200 mb-2">Support Status</h4>
               <p className="text-lg font-black leading-tight">You have no active support tickets.</p>
               <button className="mt-6 py-3 bg-white text-purple-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-purple-50 transition-colors">
                  Submit a Ticket
               </button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default UserHelpDesk;