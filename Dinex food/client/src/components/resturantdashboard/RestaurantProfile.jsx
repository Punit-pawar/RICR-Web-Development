import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditRestaurantProfileModal from "./modals/EditRestaurantProfileModal";
import ResetPasswordModal from "../userDashboard/modals/ResetPasswordModal";
import UserImage from "../../assets/userImage.jpg";

import {
  FaCamera,
  FaMapLocationDot,
  FaWallet,
} from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { BiSolidBank } from "react-icons/bi";

import { motion } from "framer-motion";
import api from "../../config/Api";
import toast from "react-hot-toast";

const RestaurantProfile = () => {
  const { user, setUser } = useAuth();

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [preview, setPreview] = useState("");

  const changePhoto = async (photo) => {
    const form_Data = new FormData();
    form_Data.append("image", photo);

    try {
      const res = await api.patch("/restaurant/changePhoto", form_Data);
      toast.success(res.data.message);
      setUser(res.data.data);
      sessionStorage.setItem("DineXuSer", JSON.stringify(res.data.data));
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
      }, 800);
    }
  };

  const renderField = (label, value) => (
    <div className="flex justify-between py-3 border-b border-white/10 last:border-0">
      <span className="text-black-400">{label}</span>
      <span className="text-black font-medium">
        {value && value !== "N/A" ? value : "Not provided"}
      </span>
    </div>
  );

  return (
    <>
      <div className="min-h-screen p-6 bg-gradient-to-br from-[#ffffff] via-[#ffffff] to-[#ffffff]">

        <div className="max-w-6xl mx-auto space-y-6">

          {/* PROFILE HERO */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/10 border border-white/10 
                       rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row gap-8">

              {/* PHOTO */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-44 h-44 rounded-3xl overflow-hidden 
                           border border-white/20 shadow-xl"
              >
                <img
                  src={preview || user?.photo?.url || UserImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />

                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md 
                             p-3 rounded-xl cursor-pointer hover:scale-110 transition hover:bg-white"
                >
                  <FaCamera className="text-black" />
                </label>

                <input
                  id="imageUpload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </motion.div>

              {/* INFO */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-black">
                  {user?.fullName}
                </h1>

                <div className="flex gap-3 mt-2">
                  <span className="px-3 py-1 rounded-full text-sm bg-indigo-300 text-indigo-600">
                    {user?.role}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user?.isActive === "active"
                        ? "bg-green-300 text-green-600"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {user?.isActive}
                  </span>
                </div>

                <div className="mt-5 space-y-1 text-black-300">
                  <div>Email: {user?.email}</div>
                  <div>Phone: {user?.mobileNumber}</div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4 mt-6">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditProfileModalOpen(true)}
                    className="px-6 py-2 rounded-xl bg-indigo-600 text-white 
                               shadow-lg hover:bg-indigo-500 transition"
                  >
                    Edit Profile
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsResetPasswordModalOpen(true)}
                    className="px-6 py-2 rounded-xl bg-gray-500 text-white 
                               border border-white/20 hover:bg-gray-400 transition"
                  >
                    Reset Password
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* GRID SECTIONS */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* PERSONAL */}
            <GlassCard title="Personal Information">
              {renderField("Date of Birth", user?.dob)}
              {renderField("Gender", user?.gender)}
              {renderField("Address", user?.address)}
              {renderField("City", user?.city)}
              {renderField("PIN Code", user?.pin)}
            </GlassCard>

            {/* RESTAURANT */}
            <GlassCard title="Restaurant">
              {renderField("Restaurant Name", user?.restaurantName)}
              {renderField("Cuisine", user?.cuisine)}
            </GlassCard>

            {/* PAYMENT */}
            <GlassCard title="Payment">
              <div className="flex items-center gap-2 text-indigo-500 mb-2">
                <FaWallet />
                UPI Details
              </div>
              {renderField("UPI ID", user?.paymentDetails?.upi)}
            </GlassCard>

            {/* BANK */}
            <GlassCard title="Bank Account">
              <div className="flex items-center gap-2 text-indigo-500 mb-2">
                <BiSolidBank />
                Bank Details
              </div>
              {renderField("Account Number", user?.paymentDetails?.account_number)}
              {renderField("IFSC Code", user?.paymentDetails?.ifs_Code)}
            </GlassCard>

            {/* DOCUMENTS */}
            <GlassCard title="Documents" full>
              {renderField("GST", user?.documents?.gst)}
              {renderField("FSSAI", user?.documents?.fssai)}
              {renderField("PAN", user?.documents?.pan)}
            </GlassCard>
          </div>
        </div>
      </div>

      {isEditProfileModalOpen && (
        <EditRestaurantProfileModal onClose={() => setIsEditProfileModalOpen(false)} />
      )}

      {isResetPasswordModalOpen && (
        <ResetPasswordModal onClose={() => setIsResetPasswordModalOpen(false)} />
      )}
    </>
  );
};

const GlassCard = ({ title, children, full }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`backdrop-blur-xl bg-white/10 border border-white/10 
                rounded-3xl p-5 shadow-xl ${full ? "md:col-span-2" : ""}`}
  >
    <h2 className="text-lg font-semibold text-black mb-4">
      {title}
    </h2>
    {children}
  </motion.div>
);

export default RestaurantProfile;
