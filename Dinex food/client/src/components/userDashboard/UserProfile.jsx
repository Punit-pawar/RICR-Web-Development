import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";
import UserImage from "../../assets/userImage.jpg";
import api from "../../config/Api";
import toast from "react-hot-toast";
import ResetPasswordModal from "./modals/ResetPasswordModal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, MapPin, Wallet, FileText, Landmark, User, 
  Mail, Phone, Calendar, Store, Map, CreditCard, 
  Building, KeyRound, Edit3, ShieldCheck, CheckCircle2,
  Award, ShoppingBag, Star, Bell, Smartphone, ToggleRight
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

const UserProfile = () => {
  const { user, setUser } = useAuth();

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [preview, setPreview] = useState("");

  const changePhoto = async (photo) => {
    const form_Data = new FormData();
    form_Data.append("image", photo);

    try {
      const res = await api.patch("/user/changePhoto", form_Data);
      toast.success(res.data.message);
      setUser(res.data.data);
      sessionStorage.setItem("DineXUser", JSON.stringify(res.data.data));
      setPreview("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotoURL = URL.createObjectURL(file);
      setPreview(newPhotoURL);
      setTimeout(() => changePhoto(file), 1000);
    }
  };

  // Professional Data Row Component
  const DataRow = ({ label, value, IconComponent }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors shadow-sm">
          {IconComponent && <IconComponent size={16} strokeWidth={2.5} />}
        </div>
        <span className="text-gray-500 font-bold text-sm tracking-wide">{label}</span>
      </div>
      <span className="text-gray-900 font-black text-sm text-right">
        {value && value !== "N/A" ? value : <span className="text-gray-300 font-medium italic">Not provided</span>}
      </span>
    </div>
  );

  // Calculate Profile Completion
  const calculateProgress = () => {
    const fields = ['fullName', 'email', 'mobileNumber', 'dob', 'gender', 'address', 'city'];
    let filled = 0;
    fields.forEach(field => {
      if (user?.[field] && user[field] !== "N/A") filled++;
    });
    return Math.round((filled / fields.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="relative w-full min-h-screen bg-[#FCF8F3] p-4 sm:p-6 lg:p-10 font-sans text-gray-900 overflow-x-hidden">
      
      {/* 🎨 Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-400/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 left-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial="hidden" 
        animate="show" 
        variants={staggerContainer}
        className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8 relative z-10"
      >
        
        {/* ---------------- LEFT PANE: STICKY PROFILE CARD ---------------- */}
        <div className="w-full xl:w-[400px] shrink-0">
          <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden xl:sticky xl:top-8">
            
            {/* Minimalist Gradient Banner */}
            <div className="w-full h-36 bg-gray-900 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#EA580C,_transparent_50%)]" />
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
            </div>
            
            <div className="px-8 pb-8 pt-0 flex flex-col items-center text-center -mt-16 relative z-10">
              
              {/* Avatar */}
              <div className="relative group mb-5">
                <div className="w-32 h-32 rounded-[2rem] border-4 border-white shadow-xl overflow-hidden bg-white rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <img src={preview || user?.photo?.url || UserImage} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <label
                  htmlFor="imageUpload"
                  className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-500 cursor-pointer transition-all shadow-lg active:scale-95 group-hover:scale-110 border-2 border-white"
                >
                  <Camera size={16} />
                </label>
                <input type="file" id="imageUpload" className="hidden" accept="image/*" onChange={handlePhotoChange} />
              </div>

              {/* Badges */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-purple-100/50">
                  {user?.role || "Customer"}
                </span>
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                  user?.isActive === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-100/50" : "bg-red-50 text-red-700 border-red-100/50"
                }`}>
                  {user?.isActive === "active" && <CheckCircle2 size={12} />}
                  {user?.isActive || "Active"}
                </span>
              </div>
              
              <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">
                {user?.fullName || "User Name"}
              </h1>
              <p className="text-gray-500 font-medium text-sm mb-8 flex items-center gap-1.5 justify-center">
                <MapPin size={14} className="text-gray-400" /> {user?.city || "Location unknown"}
              </p>

              {/* Profile Completion Progress */}
              <div className="w-full mb-8 text-left">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Profile Setup</span>
                  <span className="text-sm font-black text-purple-600">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progress}%` }} 
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                  />
                </div>
                {progress < 100 && (
                  <p className="text-[11px] font-medium text-gray-400 mt-2">Complete your profile to unlock all features.</p>
                )}
              </div>

              {/* Core Contact Info inside Card */}
              <div className="w-full space-y-3 mb-8 bg-gray-50/50 p-5 rounded-3xl border border-gray-100/50">
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-purple-500 shrink-0" />
                  <span className="text-gray-700 font-bold truncate">{user?.email || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-purple-500 shrink-0" />
                  <span className="text-gray-700 font-bold">{user?.mobileNumber || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-purple-500 shrink-0" />
                  <span className="text-gray-700 font-bold">Joined {user?.createdAt ? new Date(user.createdAt).getFullYear() : "N/A"}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="w-full space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditProfileModalOpen(true)}
                  className="w-full py-4 bg-gray-900 text-white rounded-2xl hover:bg-purple-600 transition-colors font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
                >
                  <Edit3 size={16} /> Edit Profile
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsResetPasswordModalOpen(true)}
                  className="w-full py-4 bg-white text-gray-600 border-2 border-gray-100 rounded-2xl hover:border-gray-200 hover:bg-gray-50 transition-colors font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <KeyRound size={16} /> Security Settings
                </motion.button>
              </div>

            </div>
          </motion.div>
        </div>

        {/* ---------------- RIGHT PANE: DATA DETAILS ---------------- */}
        <div className="flex-1 space-y-6">

          {/* New Section: Account Highlights (Stats) */}
          <motion.div variants={fadeUpItem} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-3"><Award size={24} /></div>
              <h3 className="text-2xl font-black text-gray-900">Gold</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">DineX Tier</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-3"><ShoppingBag size={24} /></div>
              <h3 className="text-2xl font-black text-gray-900">42</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Orders</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-3"><Star size={24} /></div>
              <h3 className="text-2xl font-black text-gray-900">4.8</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Avg Review</p>
            </div>
          </motion.div>
          
          {/* Section 1: Personal Details */}
          <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
            <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3 tracking-tight border-b border-gray-100 pb-5">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl"><User size={20} /></div>
              Personal Information
            </h2>
            <div>
              <DataRow label="Date of Birth" value={user?.dob} IconComponent={Calendar} />
              <DataRow label="Gender" value={user?.gender} IconComponent={User} />
              <DataRow label="Address" value={user?.address} IconComponent={MapPin} />
              <DataRow label="PIN Code" value={user?.pin} IconComponent={Map} />
            </div>
          </motion.div>

          {/* Section 2: Financial Details */}
          {(user?.paymentDetails?.upi !== "N/A" || user?.paymentDetails?.account_number !== "N/A") && (
            <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3 tracking-tight border-b border-gray-100 pb-5">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl"><Landmark size={20} /></div>
                Financial Details
              </h2>
              <div>
                {user?.paymentDetails?.upi !== "N/A" && (
                  <DataRow label="UPI ID" value={user?.paymentDetails?.upi} IconComponent={Wallet} />
                )}
                {user?.paymentDetails?.account_number !== "N/A" && (
                  <>
                    <DataRow label="Account Number" value={user?.paymentDetails?.account_number} IconComponent={Building} />
                    <DataRow label="IFSC Code" value={user?.paymentDetails?.ifs_Code} IconComponent={CreditCard} />
                  </>
                )}
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* New Section: Notification Preferences */}
            <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3 tracking-tight border-b border-gray-100 pb-5">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><Bell size={20} /></div>
                Preferences
              </h2>
              <div className="space-y-6 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Order Updates</p>
                    <p className="text-xs text-gray-500 font-medium">SMS & Email notifications</p>
                  </div>
                  <ToggleRight size={32} className="text-purple-500 cursor-pointer" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Promotions</p>
                    <p className="text-xs text-gray-500 font-medium">Exclusive deals & offers</p>
                  </div>
                  <ToggleRight size={32} className="text-gray-300 cursor-pointer" />
                </div>
              </div>
            </motion.div>

            {/* New Section: Security & Activity */}
            <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3 tracking-tight border-b border-gray-100 pb-5">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl"><ShieldCheck size={20} /></div>
                Security
              </h2>
              <div className="space-y-6 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">iPhone 12</p>
                    <p className="text-xs text-gray-500 font-medium">Active now • Mumbai, IN</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 opacity-50">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                    <Store size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">MacBook Air (Chrome)</p>
                    <p className="text-xs text-gray-500 font-medium">Last active 2 days ago</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section 3: Legal & Identity Documents */}
          {((user?.role === "customer" && (user?.documents?.uidai !== "N/A" || user?.documents?.pan !== "N/A")) ||
            (user?.role !== "customer" && Object.values(user?.documents || {}).some((doc) => doc !== "N/A"))) && (
            <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3 tracking-tight border-b border-gray-100 pb-5">
                <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl"><FileText size={20} /></div>
                Identity & Legal Documents
              </h2>
              <div>
                {user?.role === "customer" ? (
                  <>
                    <DataRow label="UIDAI (Aadhaar)" value={user?.documents?.uidai} IconComponent={FileText} />
                    <DataRow label="PAN Card" value={user?.documents?.pan} IconComponent={FileText} />
                  </>
                ) : (
                  <>
                    {user?.documents?.gst && <DataRow label="GST Registration" value={user?.documents?.gst} IconComponent={FileText} />}
                    {user?.documents?.fssai && <DataRow label="FSSAI License" value={user?.documents?.fssai} IconComponent={FileText} />}
                    {user?.documents?.rc && <DataRow label="Vehicle RC" value={user?.documents?.rc} IconComponent={FileText} />}
                    {user?.documents?.dl && <DataRow label="Driving License" value={user?.documents?.dl} IconComponent={FileText} />}
                    {user?.documents?.uidai && <DataRow label="UIDAI (Aadhaar)" value={user?.documents?.uidai} IconComponent={FileText} />}
                    {user?.documents?.pan && <DataRow label="PAN Card" value={user?.documents?.pan} IconComponent={FileText} />}
                  </>
                )}
              </div>
            </motion.div>
          )}
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

export default UserProfile;