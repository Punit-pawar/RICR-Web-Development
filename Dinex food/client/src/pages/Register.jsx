import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../config/Api";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, ChevronRight } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific field error when user starts typing
    if (validationError[name]) {
      setValidationError((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    let Error = {};

    if (formData.fullName.length < 3) {
      Error.fullName = "Name must be at least 3 characters";
    } else if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
      Error.fullName = "Only letters and spaces allowed";
    }

    if (!/^[\w.]+@(gmail|outlook|yahoo)\.(com|in|co.in)$/.test(formData.email)) {
      Error.email = "Enter a valid email address";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      Error.mobileNumber = "Enter a valid 10-digit mobile number";
    }

    if (!formData.role) {
      Error.role = "Please select your account type";
    }

    if (formData.password.length < 6) {
      Error.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      Error.confirmPassword = "Passwords do not match";
    }

    setValidationError(Error);
    return Object.keys(Error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
      navigate("/login"); // Automatically send to login on success
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper for Input icons
  const getIconForField = (name) => {
    switch (name) {
      case "fullName": return <User size={18} />;
      case "email": return <Mail size={18} />;
      case "mobileNumber": return <Phone size={18} />;
      case "password":
      case "confirmPassword": return <Lock size={18} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCF8F3] text-gray-900 font-sans selection:bg-orange-200 selection:text-orange-900 px-4 py-12 relative overflow-hidden">
      
      {/* 🎨 Ambient Background & Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-orange-400/10 blur-[100px] rounded-full top-10 -left-20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-amber-400/10 blur-[100px] rounded-full bottom-0 right-0 pointer-events-none" />

      {/* ---------------- REGISTER CARD ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 relative z-10"
      >
        <div className="p-8 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
              Create an Account
            </h1>
            <p className="text-gray-500 font-medium text-sm">
              Join DineX and start your journey today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Role Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-3 pl-1">
                I am signing up as a:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "customer", label: "Customer" },
                  { id: "partner", label: "Delivery Partner" },
                  { id: "manager", label: "Restaurant" }
                ].map((role) => (
                  <label
                    key={role.id}
                    className={`flex items-center justify-center text-center px-4 py-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.role === role.id
                        ? "border-orange-500 bg-orange-50 text-orange-700 font-bold shadow-sm"
                        : "border-gray-100 bg-gray-50 text-gray-500 hover:border-orange-200 font-medium"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.id}
                      onChange={handleChange}
                      checked={formData.role === role.id}
                      className="hidden"
                    />
                    <span className="text-sm">{role.label}</span>
                  </label>
                ))}
              </div>
              {validationError.role && (
                <p className="text-xs font-bold text-red-500 mt-2 pl-1">{validationError.role}</p>
              )}
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name: "fullName", type: "text", placeholder: "Full Name", fullWidth: true },
                { name: "email", type: "email", placeholder: "Email Address", fullWidth: true },
                { name: "mobileNumber", type: "tel", placeholder: "Mobile Number", fullWidth: false },
                { name: "password", type: "password", placeholder: "Password", fullWidth: false },
                { name: "confirmPassword", type: "password", placeholder: "Confirm Password", fullWidth: true },
              ].map((field) => (
                <div key={field.name} className={field.fullWidth ? "sm:col-span-2" : "col-span-1"}>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                      {getIconForField(field.name)}
                    </div>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      disabled={isLoading}
                      maxLength={field.name === "mobileNumber" ? 10 : undefined}
                      placeholder={field.placeholder}
                      className={`w-full bg-gray-50 border rounded-2xl pl-12 pr-4 py-4 focus:outline-none transition-all font-medium placeholder:text-gray-400 ${
                        validationError[field.name] 
                          ? "border-red-300 focus:ring-2 focus:ring-red-500/20 bg-red-50/50 text-red-900" 
                          : "border-gray-100 focus:ring-2 focus:ring-orange-500/50 focus:bg-white text-gray-900"
                      }`}
                    />
                  </div>
                  {validationError[field.name] && (
                    <p className="text-[11px] font-bold text-red-500 mt-1.5 pl-1">
                      {validationError[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-6 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:bg-orange-600 hover:shadow-[0_10px_30px_rgba(234,88,12,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              {!isLoading && <ChevronRight size={18} />}
            </motion.button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 font-medium mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-900 font-bold hover:text-orange-600 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;