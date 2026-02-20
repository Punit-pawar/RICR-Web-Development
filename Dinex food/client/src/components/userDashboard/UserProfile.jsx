import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";
import UserImage from "../../assets/userImage.jpg";
import api from "../../config/Api";
import toast from "react-hot-toast";
import ResetPasswordModal from "./modals/ResetPasswordModal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  MapPin, 
  Wallet, 
  FileText, 
  Landmark, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Store, 
  Map,
  CreditCard,
  Building,
  KeyRound,
  Edit3
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
      setTimeout(() => {
        changePhoto(file);
      }, 1000);
    }
  };

  // ✨ Upgraded: Bento-style micro-cards for data points
  const renderField = (label, value, IconComponent) => (
    <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-gray-50/50 hover:bg-orange-50/30 border border-transparent hover:border-orange-100 transition-all group">
      <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
        {IconComponent && <IconComponent size={14} className="text-gray-400 group-hover:text-orange-500 transition-colors" />}
        {label}
      </div>
      <span className="text-gray-900 font-black text-sm sm:text-base truncate">
        {value && value !== "N/A" ? value : <span className="text-gray-300 font-medium italic">Not provided</span>}
      </span>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-[#FCF8F3] p-4 sm:p-6 lg:p-10 font-sans overflow-x-hidden">
      
      {/* 🎨 Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial="hidden" 
        animate="show" 
        variants={staggerContainer}
        className="max-w-6xl mx-auto relative z-10 space-y-8"
      >
        {/* ---------------- HERO PROFILE BANNER ---------------- */}
        <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 relative overflow-hidden">
          
          {/* Cover Photo / Gradient Banner */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400">
            {/* Subtle overlay pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
          </div>
          
          <div className="relative z-10 px-6 sm:px-10 pb-10 pt-20 flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-end">
            
            {/* 📸 Floating Avatar */}
            <div className="relative shrink-0 group">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-[2.5rem] border-4 border-white shadow-2xl overflow-hidden bg-white rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <img
                  src={preview || user?.photo?.url || UserImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label
                htmlFor="imageUpload"
                className="absolute -bottom-3 -right-3 bg-gray-900 text-white p-4 rounded-2xl hover:bg-orange-600 cursor-pointer transition-all shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:scale-95 group-hover:scale-110"
              >
                <Camera size={20} />
              </label>
              <input type="file" id="imageUpload" className="hidden" accept="image/*" onChange={handlePhotoChange} />
            </div>

            {/* 👤 Profile Info */}
            <div className="flex-1 text-center md:text-left w-full mt-4 md:mt-0">
              <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-6">
                
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">
                      {user?.role || "Customer"}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm ${
                      user?.isActive === "active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}>
                      {user?.isActive || "Active"}
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                    {user?.fullName || "User Name"}
                  </h1>

                  <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 font-bold bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                      <Mail size={16} className="text-orange-500" /> {user?.email || "N/A"}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 font-bold bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                      <Phone size={16} className="text-orange-500" /> {user?.mobileNumber || "N/A"}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 font-bold bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                      <Calendar size={16} className="text-orange-500" /> 
                      Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "N/A"}
                    </div>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-row gap-3 w-full lg:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsResetPasswordModalOpen(true)}
                    className="flex-1 lg:flex-none px-6 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-2xl hover:border-gray-200 hover:bg-gray-50 transition-colors font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
                  >
                    <KeyRound size={16} /> Security
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditProfileModalOpen(true)}
                    className="flex-1 lg:flex-none px-6 py-4 bg-gray-900 text-white rounded-2xl hover:bg-orange-600 transition-colors font-bold text-sm flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
                  >
                    <Edit3 size={16} /> Edit Profile
                  </motion.button>
                </div>
                
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------------- BENTO GRID ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* Personal Info Bento */}
          <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] xl:col-span-2">
            <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3 tracking-tight">
              <div className="p-2.5 bg-orange-50 text-orange-600 rounded-[1rem]"><User size={20} /></div>
              Personal Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {renderField("Date of Birth", user?.dob, Calendar)}
              {renderField("Gender", user?.gender, User)}
              {renderField("Address", user?.address, MapPin)}
              {renderField("City", user?.city, Map)}
              {renderField("PIN Code", user?.pin, MapPin)}
            </div>
          </motion.div>

          {/* Geo Location Bento */}
          {(user?.geoLocation?.lat !== "N/A" || user?.geoLocation?.lon !== "N/A") && (
            <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] h-full flex flex-col">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3 tracking-tight">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-[1rem]"><MapPin size={20} /></div>
                GPS Coordinates
              </h2>
              <div className="grid grid-cols-1 gap-3 flex-1 content-start">
                {renderField("Latitude", user?.geoLocation?.lat, Map)}
                {renderField("Longitude", user?.geoLocation?.lon, Map)}
              </div>
            </motion.div>
          )}

          {/* Payment & Bank Bentos */}
          {user?.paymentDetails?.upi !== "N/A" && (
            <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3 tracking-tight">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-[1rem]"><Wallet size={20} /></div>
                UPI Linked
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {renderField("UPI ID", user?.paymentDetails?.upi, CreditCard)}
              </div>
            </motion.div>
          )}

          {(user?.paymentDetails?.account_number !== "N/A" || user?.paymentDetails?.ifs_Code !== "N/A") && (
            <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] xl:col-span-2">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3 tracking-tight">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-[1rem]"><Landmark size={20} /></div>
                Banking Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {renderField("Account Number", user?.paymentDetails?.account_number, Building)}
                {renderField("IFSC Code", user?.paymentDetails?.ifs_Code, Landmark)}
              </div>
            </motion.div>
          )}

          {/* Legal Documents Bento */}
          {((user?.role === "customer" && (user?.documents?.uidai !== "N/A" || user?.documents?.pan !== "N/A")) ||
            (user?.role !== "customer" && Object.values(user?.documents || {}).some((doc) => doc !== "N/A"))) && (
            <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] xl:col-span-3">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3 tracking-tight">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-[1rem]"><FileText size={20} /></div>
                Legal & Identity Documents
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {user?.role === "customer" ? (
                  <>
                    {renderField("UIDAI (Aadhaar)", user?.documents?.uidai, FileText)}
                    {renderField("PAN Card", user?.documents?.pan, FileText)}
                  </>
                ) : (
                  <>
                    {user?.documents?.gst && renderField("GST Registration", user?.documents?.gst, FileText)}
                    {user?.documents?.fssai && renderField("FSSAI License", user?.documents?.fssai, FileText)}
                    {user?.documents?.rc && renderField("Vehicle RC", user?.documents?.rc, FileText)}
                    {user?.documents?.dl && renderField("Driving License", user?.documents?.dl, FileText)}
                    {user?.documents?.uidai && renderField("UIDAI (Aadhaar)", user?.documents?.uidai, FileText)}
                    {user?.documents?.pan && renderField("PAN Card", user?.documents?.pan, FileText)}
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* Restaurant Information Bento */}
          {(user?.restaurantName !== "N/A" || user?.cuisine !== "N/A") && (
            <motion.div variants={fadeUpItem} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] xl:col-span-3">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3 tracking-tight">
                <div className="p-2.5 bg-orange-50 text-orange-600 rounded-[1rem]"><Store size={20} /></div>
                Business Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {renderField("Restaurant Name", user?.restaurantName, Store)}
                {renderField("Cuisine Specialty", user?.cuisine, UtensilsCrossed)}
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