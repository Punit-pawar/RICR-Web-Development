import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/Api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import EditProfileModal from "../userDashboard/modals/EditProfileModal"; // Reusing your existing modal structure
import ResetPasswordModal from "../userDashboard/modals/ResetPasswordModal";
import UserImage from "../../assets/userImage.jpg";

import { 
  Camera, 
  MapPin, 
  Wallet, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Bike, 
  CheckCircle2,
  Lock,
  Edit3,
  Landmark,
  ShieldCheck,
  Loader2,
  Calendar,
  Building,
  ArrowUpRight,
  Fingerprint,
  Navigation
} from "lucide-react";

const RiderProfile = () => {
  const { user, setUser } = useAuth();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const changePhoto = async (photo) => {
    setIsUploading(true);
    const form_Data = new FormData();
    form_Data.append("image", photo);

    try {
      const res = await api.patch("/user/changePhoto", form_Data);
      toast.success(res.data.message);
      setUser(res.data.data);
      sessionStorage.setItem("DineXUser", JSON.stringify(res.data.data));
      setPreview("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotoURL = URL.createObjectURL(file);
      setPreview(newPhotoURL);
      setTimeout(() => changePhoto(file), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] p-4 sm:p-8 lg:p-12 font-sans text-slate-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        
        {/* ---------------- SECTION 1: ELEVATED RIDER HEADER ---------------- */}
        <header className="relative bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Subtle Rider Background Accent */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 translate-x-20 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end gap-10">
            {/* Profile Avatar with Gold Halo */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-400/20 rounded-[3rem] blur-2xl group-hover:bg-blue-400/30 transition-colors" />
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative w-44 h-44 rounded-[2.8rem] bg-white p-1 shadow-2xl border border-slate-100 overflow-hidden"
              >
                <img 
                  src={preview || user?.photo?.url || UserImage} 
                  alt="Rider Profile" 
                  className={`w-full h-full object-cover rounded-[2.5rem] ${isUploading ? 'opacity-30 blur-sm' : ''}`} 
                />
                {isUploading && <Loader2 className="absolute inset-0 m-auto animate-spin text-blue-500" />}
              </motion.div>
              <label htmlFor="imageUpload" className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-3 rounded-2xl hover:bg-blue-600 transition-all cursor-pointer shadow-xl border-4 border-white">
                <Camera size={20} />
              </label>
              <input type="file" id="imageUpload" className="hidden" accept="image/*" onChange={handlePhotoChange} />
            </div>

            {/* Rider Identity Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                  {user?.role || "Delivery Partner"}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest border border-emerald-600 shadow-sm flex items-center gap-2">
                  <CheckCircle2 size={12} strokeWidth={3} /> Active Duty
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                {user?.fullName || "Rider Name"}
              </h1>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-slate-500 font-bold text-sm">
                <span className="flex items-center gap-2"><Mail size={16} className="text-blue-500" /> {user?.email}</span>
                <span className="flex items-center gap-2"><Phone size={16} className="text-blue-500" /> {user?.mobileNumber}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-row lg:flex-col gap-3 shrink-0">
              <button onClick={() => setIsEditProfileModalOpen(true)} className="p-4 bg-slate-50 text-slate-900 rounded-3xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-200 group">
                <Edit3 size={24} className="group-hover:rotate-12 transition-transform" />
              </button>
              <button onClick={() => setIsResetPasswordModalOpen(true)} className="p-4 bg-slate-50 text-slate-900 rounded-3xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-200 group">
                <Lock size={24} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </header>

        {/* ---------------- SECTION 2: THE MOSAIC GRID ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          
          {/* Logistics/Vehicle Card (Large) */}
          <div className="md:col-span-4 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-blue-200 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Vehicle Details</p>
                <h3 className="text-3xl font-black text-slate-900">Partner Logistics</h3>
                <p className="text-slate-500 font-bold mt-1">Vehicle RC: {user?.documents?.rc || "Not Linked"}</p>
              </div>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center">
                <Bike size={32} />
              </div>
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
               <div className="px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100 flex-1 min-w-[150px]">
                 <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Region</span>
                 <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                   <MapPin size={14} className="text-blue-500" /> {user?.city || "Location not set"}
                 </span>
               </div>
               <div className="px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100 flex-1 min-w-[150px]">
                 <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Driving License</span>
                 <span className="text-sm font-bold text-slate-900">
                   {user?.documents?.dl || "Verification Required"}
                 </span>
               </div>
               <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors cursor-pointer">
                 <Navigation size={24} />
               </div>
            </div>
          </div>

          {/* Personal Stats Card (Narrow) */}
          <div className="md:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <User size={24} />
            </div>
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Personal Info</h4>
            <div className="space-y-4 font-bold">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Gender</span>
                <span className="text-slate-900">{user?.gender || "N/A"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Joined</span>
                <span className="text-slate-900">{user?.createdAt ? new Date(user.createdAt).getFullYear() : "N/A"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Birthday</span>
                <span className="text-slate-900">{user?.dob || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Payout Channels (Wide) */}
          <div className="md:col-span-4 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
               <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Landmark size={24} /></div>
               <div>
                 <h4 className="text-xl font-black text-slate-900">Banking & Payouts</h4>
                 <p className="text-sm font-bold text-slate-400">Where you receive your delivery earnings</p>
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 group hover:bg-white transition-colors">
                 <Wallet className="text-slate-300 group-hover:text-blue-500 transition-colors" size={20} />
                 <div>
                   <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">UPI Linked</span>
                   <span className="text-sm font-black">{user?.paymentDetails?.upi || "Not Linked"}</span>
                 </div>
               </div>
               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 group hover:bg-white transition-colors">
                 <Building className="text-slate-300 group-hover:text-blue-500 transition-colors" size={20} />
                 <div>
                   <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Number</span>
                   <span className="text-sm font-black truncate">{user?.paymentDetails?.account_number || "Not Linked"}</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Address Card (Narrow) */}
          <div className="md:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-3xl" />
             <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6">
               <MapPin size={24} />
             </div>
             <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Base Address</h4>
             <p className="text-xl font-black mb-6 leading-relaxed">
               {user?.address && user.address !== "N/A" ? user.address : "Please update your residential address."}
             </p>
             <div className="pt-6 border-t border-white/10 text-xs font-bold text-slate-500 uppercase tracking-widest flex justify-between">
               <span>{user?.city}</span>
               <span>{user?.pin}</span>
             </div>
          </div>

          {/* Legal Documents (Full Width) */}
          <div className="md:col-span-6 bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><ShieldCheck size={28} /></div>
                 <h4 className="text-2xl font-black text-slate-900">Legal Documentation</h4>
               </div>
               <div className="hidden sm:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                 <Fingerprint size={16} /> Encrypted Storage
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Aadhaar Number", value: user?.documents?.uidai, icon: FileText },
                { label: "PAN Card", value: user?.documents?.pan, icon: FileText },
                { label: "Driving License", value: user?.documents?.dl, icon: FileText },
                { label: "Vehicle RC", value: user?.documents?.rc, icon: FileText },
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-blue-100 hover:bg-white transition-all group">
                   <doc.icon className="text-slate-300 group-hover:text-blue-500 transition-colors" size={20} />
                   <div>
                     <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{doc.label}</span>
                     <span className="text-sm font-black text-slate-900">{doc.value && doc.value !== "N/A" ? doc.value : "Missing"}</span>
                   </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>

      {/* ---------------- MODALS ---------------- */}
      <AnimatePresence>
        {isEditProfileModalOpen && (
          <EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />
        )}
        {isResetPasswordModalOpen && (
          <ResetPasswordModal onClose={() => setIsResetPasswordModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RiderProfile;