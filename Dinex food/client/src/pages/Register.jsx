import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../config/Api";

const Register = () => {
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
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
    setValidationError({});
  };

  const validate = () => {
    let Error = {};

    if (formData.fullName.length < 3) {
      Error.fullName = "Name must be at least 3 characters";
    } else if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
      Error.fullName = "Only letters and spaces allowed";
    }

    if (
      !/^[\w.]+@(gmail|outlook|yahoo)\.(com|in|co.in)$/.test(formData.email)
    ) {
      Error.email = "Enter a valid email";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      Error.mobileNumber = "Enter valid Indian mobile number";
    }

    if (!formData.role) {
      Error.role = "Please select a role";
    }

    if (formData.password.length < 6) {
      Error.password = "Password must be 6+ characters";
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
      handleClearForm();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-100 px-4 relative overflow-hidden">
      
      <motion.div
        className="absolute w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30"
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        style={{ top: "10%", left: "10%" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30"
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
        style={{ bottom: "10%", right: "10%" }}
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -4 }}
        className="w-full max-w-xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40"
      >
        <form onSubmit={handleSubmit} onReset={handleClearForm} className="p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-600 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Join us and start your journey 
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              I am a:
            </label>

            <div className="flex gap-4 flex-wrap">
              {["manager", "partner", "customer"].map((role) => (
                <label
                  key={role}
                  className={`px-4 py-2 rounded-lg border cursor-pointer transition ${
                    formData.role === role
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    onChange={handleChange}
                    checked={formData.role === role}
                    className="hidden"
                  />
                  {role === "manager" && "Restaurant Manager"}
                  {role === "partner" && "Delivery Partner"}
                  {role === "customer" && "Customer"}
                </label>
              ))}
            </div>

            {validationError.role && (
              <p className="text-xs text-red-500 mt-1">
                {validationError.role}
              </p>
            )}
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            {[
              { name: "fullName", type: "text", placeholder: "Full Name" },
              { name: "email", type: "email", placeholder: "Email Address" },
              { name: "mobileNumber", type: "tel", placeholder: "Mobile Number" },
              { name: "password", type: "password", placeholder: "Password" },
              { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
            ].map((field) => (
              <motion.div whileFocus={{ scale: 1.02 }} key={field.name}>
                <input
                  {...field}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={isLoading}
                  maxLength={field.name === "mobileNumber" ? 10 : undefined}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  placeholder={field.placeholder}
                />
                {validationError[field.name] && (
                  <p className="text-xs text-red-500 mt-1">
                    {validationError[field.name]}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="reset"
              disabled={isLoading}
              className="flex-1 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-semibold"
            >
              Clear
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-600 text-white font-semibold shadow-lg"
            >
              {isLoading ? "Creating..." : "Register"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
