import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LifeBuoy, 
  MessageSquare, 
  PhoneCall, 
  AlertTriangle, 
  Bike, 
  Wallet, 
  ShieldCheck, 
  ChevronDown, 
  Search,
  Zap,
  Clock,
  ExternalLink,
  FileText
} from "lucide-react";

// ✨ Smooth Spring Animations
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const RiderHelpDesk = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const quickActions = [
    { id: 1, title: "Emergency", desc: "Accident or SOS", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
    { id: 2, title: "Order Issue", desc: "Pickup/Drop problems", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { id: 3, title: "Payout Help", desc: "Earnings & Incentives", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { id: 4, title: "Vehicle info", desc: "Breakdown support", icon: Bike, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  ];

  const faqs = [
    { q: "How do I withdraw my daily earnings?", a: "Earnings are automatically settled every Tuesday. However, you can use the 'Instant Cashout' feature in the Wallet section if you have completed more than 50 deliveries." },
    { q: "What to do if the customer is not reachable?", a: "Wait at the location for 5 minutes and try calling the customer at least 3 times. If there is no response, use the 'Customer Unavailable' button in the app to notify support." },
    { q: "How are incentives calculated?", a: "Incentives are based on your 'Gigs' completed during peak hours (7 PM - 11 PM) and maintaining a minimum acceptance rate of 90%." },
    { q: "Insurance coverage details?", a: "As a DineX Partner, you are covered under our Group Personal Accident Insurance while you are 'On-Duty' and during active delivery slots." },
  ];

  return (
    <div className="relative min-h-screen bg-[#FCF8F3] p-4 md:p-8 font-sans text-gray-900 overflow-x-hidden">
      
      {/* 🎨 Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial="hidden" 
        animate="show" 
        variants={staggerContainer}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* ---------------- HEADER ---------------- */}
        <motion.div variants={fadeUpItem} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-6">
            <LifeBuoy className="text-blue-500" size={16} />
            <span className="text-xs font-black uppercase tracking-widest text-gray-600">Rider Support 24/7</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            How can we <span className="text-blue-600">help you?</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Get instant support for your deliveries, earnings, and safety. Our team is always online to keep you moving.
          </p>
        </motion.div>

        {/* ---------------- SEARCH BAR ---------------- */}
        <motion.div variants={fadeUpItem} className="max-w-2xl mx-auto mb-16 relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Search size={20} strokeWidth={2.5} />
          </div>
          <input 
            type="text" 
            placeholder="Search for help (e.g. 'payout', 'accident')..."
            className="w-full bg-white border-2 border-transparent shadow-[0_15px_35px_rgba(0,0,0,0.05)] rounded-[2rem] pl-16 pr-8 py-6 focus:outline-none focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-lg font-bold placeholder:text-gray-400"
          />
        </motion.div>

        {/* ---------------- QUICK ACTION GRID ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickActions.map((action) => (
            <motion.button
              key={action.id}
              variants={fadeUpItem}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center text-center p-8 bg-white rounded-[2.5rem] border ${action.border} shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all group`}
            >
              <div className={`w-16 h-16 rounded-2xl ${action.bg} ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon size={32} strokeWidth={2.5} />
              </div>
              <h3 className="font-black text-gray-900 mb-1">{action.title}</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">{action.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* ---------------- FAQ SECTION ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          <motion.div variants={fadeUpItem} className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6 flex items-center gap-3">
              <Zap size={24} className="text-blue-500" /> Common Questions
            </h2>
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-bold text-gray-800">{faq.q}</span>
                  <ChevronDown className={`text-gray-400 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-blue-500' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-6 text-gray-500 font-medium leading-relaxed text-sm"
                    >
                      <div className="pt-2 border-t border-gray-50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>

          {/* ---------------- CONTACT SIDEBAR ---------------- */}
          <motion.div variants={fadeUpItem} className="space-y-6">
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />
              <h3 className="text-xl font-black mb-6 relative z-10">Direct Contact</h3>
              
              <div className="space-y-4 relative z-10">
                <a href="tel:+" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group/btn">
                  <div className="p-2.5 bg-blue-500 rounded-xl text-black">
                    <PhoneCall size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Call Priority Support</p>
                    <p className="text-sm font-bold">1800-DINEX-HELP</p>
                  </div>
                  <ExternalLink size={14} className="ml-auto text-gray-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>

                <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group/btn text-left">
                  <div className="p-2.5 bg-blue-500 rounded-xl text-white">
                    <MessageSquare size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Live Chat</p>
                    <p className="text-sm font-bold">Start a conversation</p>
                  </div>
                  <Clock size={14} className="ml-auto text-emerald-400" />
                </button>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs font-bold text-blue-200 flex items-center gap-2">
                  <ShieldCheck size={14} /> DineX Safety Protocol
                </p>
                <p className="text-[10px] text-blue-200/60 mt-1">Your safety is our priority. In case of medical emergencies, please dial 102 first.</p>
              </div>
            </div>

            {/* Support Ticket Status Card */}
            <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
               <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Your Recent Tickets</h4>
               <div className="flex items-center justify-center py-6 flex-col text-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-3">
                    <FileText size={20} />
                  </div>
                  <p className="text-xs font-bold text-gray-500">No active support tickets.</p>
               </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

// Re-using local import if ShoppingBag wasn't added to your main list
const ShoppingBag = ({ size, strokeWidth, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default RiderHelpDesk;