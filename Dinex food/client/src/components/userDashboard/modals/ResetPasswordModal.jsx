import React, { useState } from "react";
import api from "../../../config/Api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Lock, AlertCircle, Loader2, Eye, EyeOff, ShieldAlert
} from "lucide-react";

// Minimal, zero-bounce enterprise fade
const modalVariant = {
  hidden: { opacity: 0, scale: 0.99 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, scale: 0.99, transition: { duration: 0.05 } }
};

const ResetPasswordModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    cfNewPassword: "",
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Required";
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = "Required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Must be at least 8 characters";
    }

    if (!formData.cfNewPassword) {
      newErrors.cfNewPassword = "Required";
    } else if (formData.newPassword !== formData.cfNewPassword) {
      newErrors.cfNewPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await api.patch("/user/resetPassword", formData);
      toast.success(res.data.message || "Password updated successfully.");
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      console.error(error);
      const errorMsg = error?.response?.data?.message || "Failed to reset password.";
      toast.error(errorMsg);
      setErrors({ server: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPasswords(!showPasswords);
  };

  // Strictly Formatted Enterprise Input Wrapper
  const InputWrapper = ({ label, id, error, required, children }) => (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 flex justify-between items-end">
        <span>{label} {required && <span className="text-red-500">*</span>}</span>
        {error && <span className="text-xs text-red-600 font-medium flex items-center gap-1"><AlertCircle size={12}/>{error}</span>}
      </label>
      <div className="relative flex items-center">
        {children}
      </div>
    </div>
  );

  // Standard SaaS Input Styles
  const inputStyles = "w-full bg-white border border-gray-300 rounded-md pl-9 pr-10 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors shadow-sm disabled:bg-gray-100 disabled:text-gray-500";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-center items-center p-4 sm:p-6 bg-gray-900/50 backdrop-blur-sm">
        
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          variants={modalVariant}
          initial="hidden"
          animate="show"
          exit="exit"
          // Using max-w-md because password resets do not require a massive modal footprint
          className="bg-gray-50 w-full max-w-md flex flex-col rounded-lg shadow-xl relative z-10 overflow-hidden border border-gray-300"
        >
          {/* ---------------- HEADER ---------------- */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white shrink-0">
            <div>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <ShieldAlert size={18} className="text-gray-500" /> Security Settings
              </h2>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1 rounded transition-colors"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* ---------------- SCROLLABLE FORM ---------------- */}
          <div className="p-6 flex-1 bg-white">
            
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900">Change Password</h3>
              <p className="text-xs text-gray-500 mt-1">Please enter your current password to authorize this change.</p>
            </div>

            {errors.server && (
              <div className="mb-5 p-3 rounded-md flex items-center gap-2 text-sm font-medium border bg-red-50 text-red-800 border-red-200">
                <AlertCircle size={16} className="text-red-600 shrink-0" />
                <span>{errors.server}</span>
              </div>
            )}

            <form id="reset-password-form" onSubmit={handleSubmit} className="space-y-5">
              
              <InputWrapper label="Current Password" id="oldPassword" required error={errors.oldPassword}>
                <Lock size={14} className="absolute left-3 text-gray-400 pointer-events-none" />
                <input
                  type={showPasswords ? "text" : "password"}
                  id="oldPassword"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  className={inputStyles}
                  placeholder="Enter current password"
                />
              </InputWrapper>

              <div className="pt-2 border-t border-gray-100 space-y-5">
                <InputWrapper label="New Password" id="newPassword" required error={errors.newPassword}>
                  <Lock size={14} className="absolute left-3 text-blue-500 pointer-events-none" />
                  <input
                    type={showPasswords ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={inputStyles}
                    placeholder="Enter new password"
                  />
                  <button 
                    type="button" 
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </InputWrapper>

                <InputWrapper label="Confirm New Password" id="cfNewPassword" required error={errors.cfNewPassword}>
                  <Lock size={14} className="absolute left-3 text-blue-500 pointer-events-none" />
                  <input
                    type={showPasswords ? "text" : "password"}
                    id="cfNewPassword"
                    name="cfNewPassword"
                    value={formData.cfNewPassword}
                    onChange={handleInputChange}
                    className={inputStyles}
                    placeholder="Confirm new password"
                  />
                </InputWrapper>
              </div>

            </form>
          </div>

          {/* ---------------- FOOTER ACTIONS ---------------- */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors disabled:opacity-50 shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="reset-password-form"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 border border-transparent text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
              Update Password
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResetPasswordModal;