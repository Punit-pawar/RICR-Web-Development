import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/Api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Lock, AlertCircle, Loader2, Navigation, CheckCircle2 
} from "lucide-react";

// Minimal, zero-bounce enterprise fade
const modalVariant = {
  hidden: { opacity: 0, scale: 0.99 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, scale: 0.99, transition: { duration: 0.05 } }
};

const EditRestaurantProfileModal = ({ onClose }) => {
  const { user, setUser, setIsLogin } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    address: user?.address || "",
    city: user?.city || "",
    pin: user?.pin || "",
    restaurantName: user?.restaurantName || "",
    cuisine: user?.cuisine || "",
    documents: {
      gst: user?.documents?.gst || "",
      fssai: user?.documents?.fssai || "",
      rc: user?.documents?.rc || "",
      dl: user?.documents?.dl || "",
      uidai: user?.documents?.uidai || "",
      pan: user?.documents?.pan || "",
    },
    paymentDetails: {
      upi: user?.paymentDetails?.upi || "",
      account_number: user?.paymentDetails?.account_number || "",
      ifs_Code: user?.paymentDetails?.ifs_Code || "",
    },
    geoLocation: {
      lat: user?.geoLocation?.lat || "",
      lon: user?.geoLocation?.lon || "",
    },
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Required";
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ""))) {
      newErrors.mobileNumber = "Must be 10 digits";
    }
    if (!formData.city.trim()) newErrors.city = "Required";
    if (!formData.pin.trim()) {
      newErrors.pin = "Required";
    } else if (!/^\d{6}$/.test(formData.pin)) {
      newErrors.pin = "Must be 6 digits";
    }
    if (!formData.restaurantName.trim()) newErrors.restaurantName = "Required";
    
    if (formData.documents.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.documents.pan)) {
      newErrors.pan = "Invalid format";
    }
    if (formData.paymentDetails.upi && !/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(formData.paymentDetails.upi)) {
      newErrors.upi = "Invalid format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData({
      ...formData,
      [parent]: { ...formData[parent], [field]: value },
    });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const fetchLocation = (e) => {
    e.preventDefault();
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (result) => {
        setFormData({
          ...formData,
          geoLocation: {
            ...formData.geoLocation,
            lat: result.coords.latitude,
            lon: result.coords.longitude,
          },
        });
        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);
        setMessage({ type: "error", text: "Location access denied by browser." });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({ type: "error", text: "Please correct the errors below before saving." });
      document.getElementById('modal-scroll-area').scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await api.put("/restaurant/update", formData);
      if (res.data?.data) {
        sessionStorage.setItem("DineXUSer", JSON.stringify(res.data.data));
        setUser(res.data.data);
        setIsLogin(true);
        setMessage({ type: "success", text: "Configuration saved successfully." });
        setTimeout(() => onClose(), 1000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update configuration.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Ultra-dense Enterprise Input Wrapper
  const InputWrapper = ({ label, id, error, required, children }) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-xs font-semibold text-gray-700 flex justify-between">
        <span>{label} {required && <span className="text-red-500">*</span>}</span>
        {error && <span className="text-red-600 font-medium">{error}</span>}
      </label>
      <div className="relative">
        {children}
      </div>
    </div>
  );

  // Standard SaaS Input Styles
  const inputStyles = "w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors shadow-sm disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed";

  // Panel Wrapper Component
  const SettingsPanel = ({ title, children }) => (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm mb-6 last:mb-0">
      <div className="px-5 py-3 border-b border-gray-200 bg-gray-50/50">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {children}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-center items-center p-4 sm:p-6 bg-gray-900/50 backdrop-blur-sm">
        
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          variants={modalVariant}
          initial="hidden"
          animate="show"
          exit="exit"
          className="bg-gray-100 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-lg shadow-2xl relative z-10 overflow-hidden border border-gray-300"
        >
          {/* ---------------- HEADER ---------------- */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white shrink-0">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Restaurant Settings
              </h2>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1 rounded transition-colors"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* ---------------- SCROLLABLE CONTENT ---------------- */}
          <div id="modal-scroll-area" className="overflow-y-auto p-6 flex-1">
            
            {/* System Message Banner */}
            {message.text && (
              <div className={`mb-6 p-3 rounded-md flex items-center gap-2 text-sm font-medium border ${
                message.type === "success" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"
              }`}>
                {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {message.text}
              </div>
            )}

            <form id="settings-form" onSubmit={handleSubmit}>
              
              <SettingsPanel title="Manager Details">
                <InputWrapper label="Full Name" id="fullName" required error={errors.fullName}>
                  <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} className={inputStyles} />
                </InputWrapper>

                <InputWrapper label="Email Address" id="email" required>
                  <div className="relative flex items-center">
                    <input type="email" id="email" name="email" value={formData.email} disabled className={`${inputStyles} pl-8`} />
                    <Lock size={14} className="absolute left-3 text-gray-400" />
                  </div>
                </InputWrapper>

                <InputWrapper label="Mobile Number" id="mobileNumber" required error={errors.mobileNumber}>
                  <input type="tel" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} maxLength="10" className={inputStyles} />
                </InputWrapper>

                <div className="grid grid-cols-2 gap-4">
                  <InputWrapper label="Gender" id="gender">
                    <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className={inputStyles}>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </InputWrapper>

                  <InputWrapper label="Date of Birth" id="dob">
                    <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} className={inputStyles} />
                  </InputWrapper>
                </div>
              </SettingsPanel>

              <SettingsPanel title="Business Identity">
                <InputWrapper label="Restaurant Name" id="restaurantName" required error={errors.restaurantName}>
                  <input type="text" id="restaurantName" name="restaurantName" value={formData.restaurantName} onChange={handleInputChange} className={inputStyles} />
                </InputWrapper>

                <InputWrapper label="Primary Cuisine" id="cuisine">
                  <input type="text" id="cuisine" name="cuisine" value={formData.cuisine} onChange={handleInputChange} placeholder="e.g. Italian, Indian" className={inputStyles} />
                </InputWrapper>
              </SettingsPanel>

              <SettingsPanel title="Location & Address">
                <div className="md:col-span-2">
                  <InputWrapper label="Street Address" id="address">
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className={inputStyles} />
                  </InputWrapper>
                </div>

                <InputWrapper label="City" id="city" required error={errors.city}>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} className={inputStyles} />
                </InputWrapper>

                <InputWrapper label="PIN Code" id="pin" required error={errors.pin}>
                  <input type="text" id="pin" name="pin" value={formData.pin} onChange={handleInputChange} maxLength="6" className={inputStyles} />
                </InputWrapper>

                <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="mb-3 sm:mb-0 text-sm">
                    <span className="font-semibold text-gray-800 block">GPS Coordinates</span>
                    <span className="text-gray-500">
                      {formData.geoLocation.lat !== "N/A" && formData.geoLocation.lat !== "" 
                        ? `${Number(formData.geoLocation.lat).toFixed(6)}, ${Number(formData.geoLocation.lon).toFixed(6)}`
                        : "No coordinates captured."}
                    </span>
                  </div>
                  <button 
                    type="button"
                    onClick={fetchLocation} 
                    disabled={locationLoading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-sm disabled:opacity-50 transition-colors"
                  >
                    {locationLoading ? <Loader2 size={14} className="animate-spin text-gray-400" /> : <Navigation size={14} className="text-gray-500" />}
                    Capture Coordinates
                  </button>
                </div>
              </SettingsPanel>

              <SettingsPanel title="Legal & Compliance">
                <InputWrapper label="GST Number" id="gst"><input type="text" id="gst" value={formData.documents.gst} onChange={(e) => handleNestedChange("documents", "gst", e.target.value)} className={inputStyles} /></InputWrapper>
                <InputWrapper label="FSSAI License" id="fssai"><input type="text" id="fssai" value={formData.documents.fssai} onChange={(e) => handleNestedChange("documents", "fssai", e.target.value)} className={inputStyles} /></InputWrapper>
                <InputWrapper label="Vehicle RC" id="rc"><input type="text" id="rc" value={formData.documents.rc} onChange={(e) => handleNestedChange("documents", "rc", e.target.value)} className={inputStyles} /></InputWrapper>
                <InputWrapper label="Driving License" id="dl"><input type="text" id="dl" value={formData.documents.dl} onChange={(e) => handleNestedChange("documents", "dl", e.target.value)} className={inputStyles} /></InputWrapper>
                <InputWrapper label="UIDAI (Aadhaar)" id="uidai"><input type="text" id="uidai" value={formData.documents.uidai} onChange={(e) => handleNestedChange("documents", "uidai", e.target.value)} className={inputStyles} /></InputWrapper>
                <InputWrapper label="PAN Card" id="pan" error={errors.pan}>
                  <input type="text" id="pan" value={formData.documents.pan} onChange={(e) => handleNestedChange("documents", "pan", e.target.value)} maxLength="10" className={inputStyles} />
                </InputWrapper>
              </SettingsPanel>

              <SettingsPanel title="Payout Details">
                <InputWrapper label="UPI ID" id="upi" error={errors.upi}>
                  <input type="text" id="upi" value={formData.paymentDetails.upi} onChange={(e) => handleNestedChange("paymentDetails", "upi", e.target.value)} placeholder="username@bank" className={inputStyles} />
                </InputWrapper>
                
                <InputWrapper label="Account Number" id="account_number">
                  <input type="text" id="account_number" value={formData.paymentDetails.account_number} onChange={(e) => handleNestedChange("paymentDetails", "account_number", e.target.value)} className={inputStyles} />
                </InputWrapper>

                <InputWrapper label="IFSC Code" id="ifs_Code">
                  <input type="text" id="ifs_Code" value={formData.paymentDetails.ifs_Code} onChange={(e) => handleNestedChange("paymentDetails", "ifs_Code", e.target.value)} className={inputStyles} />
                </InputWrapper>
              </SettingsPanel>

            </form>
          </div>

          {/* ---------------- FOOTER ACTIONS ---------------- */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-white shrink-0">
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
              form="settings-form"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 border border-transparent text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              Save Configuration
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditRestaurantProfileModal;