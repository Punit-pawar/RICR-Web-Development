import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ForgetPasswordModal from "../components/publicModals/ForgetPasswordModal";
import Loading from "../components/Loading";

const Login = () => {
  const { setUser, setIsLogin, setRole } = useAuth();
  const navigate = useNavigate();

  const [isForgetPasswordModelOpen, setIsForgetPasswordModelOpen] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({ email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", formData);

      toast.success(res.data.message);
      setUser(res.data.data);
      setIsLogin(true);

      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));

      switch (res.data.data.role) {
        case "manager":
          setRole("manager");
          navigate("/resturant-dashboard");
          break;
        case "partner":
          setRole("partner");
          navigate("/rider-dashboard");
          break;
        case "customer":
          setRole("customer");
          navigate("/user-dashboard");
          break;
        case "admin":
          setRole("admin");
          navigate("/admin-dashboard");
          break;
        default:
          break;
      }

      handleClearForm();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-100 px-4 relative overflow-hidden">
        
        {/* Animated Background Blobs */}
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

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40"
        >
          <form onSubmit={handleSubmit} onReset={handleClearForm} className="p-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                Login to continue 
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <motion.div whileFocus={{ scale: 1.02 }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </motion.div>
            </div>

            {/* Forget Password */}
            <div className="flex justify-end mt-2">
              <button
                className="text-sm text-purple-600 hover:text-purple-800 transition"
                onClick={(e) => {
                  e.preventDefault();
                  setIsForgetPasswordModelOpen(true);
                }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="reset"
                className="flex-1 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-semibold"
              >
                Clear
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-600 text-white font-semibold shadow-lg"
              >
                Login
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      {isForgetPasswordModelOpen && (
        <ForgetPasswordModal
          onClose={() => setIsForgetPasswordModelOpen(false)}
        />
      )}
    </>
  );
};

export default Login;
