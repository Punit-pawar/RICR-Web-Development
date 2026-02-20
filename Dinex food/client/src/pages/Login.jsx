import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ForgetPasswordModal from "../components/publicModals/ForgetPasswordModal";
import Loading from "../components/Loading";
import { ArrowRight, Lock, Mail } from "lucide-react";

const Login = () => {
  const { setUser, setIsLogin, setRole } = useAuth();
  const navigate = useNavigate();

  const [isForgetPasswordModelOpen, setIsForgetPasswordModelOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCF8F3]">
        <Loading />
        <p className="text-orange-500 mt-6 text-xs uppercase tracking-widest font-black animate-pulse">Authenticating...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCF8F3] text-gray-900 font-sans selection:bg-orange-200 selection:text-orange-900 px-4 relative overflow-hidden">
      
      {/* 🎨 Ambient Background & Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-orange-400/10 blur-[100px] rounded-full top-0 -left-20 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-amber-400/10 blur-[100px] rounded-full bottom-0 right-0 pointer-events-none" />

      {/* ---------------- LOGIN CARD ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border inde border-gray-100 relative z-10 overflow-hidden"
      >
        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 font-medium text-sm">
              Enter your details to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input: Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-500/50 focus:bg-white outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Input: Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-500/50 focus:bg-white outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Forget Password Link */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                className="text-xs font-bold text-gray-500 hover:text-orange-600 transition-colors"
                onClick={() => setIsForgetPasswordModelOpen(true)}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 mt-2 rounded-2xl bg-orange-600 text-white font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(234,88,12,0.3)] hover:bg-orange-500 transition-colors flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight size={18} />
            </motion.button>
          </form>

          {/* Registration Link */}
          <p className="text-center text-sm text-gray-500 font-medium mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-orange-600 font-bold hover:underline underline-offset-4 decoration-orange-200">
              Create one now
            </Link>
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isForgetPasswordModelOpen && (
          <ForgetPasswordModal onClose={() => setIsForgetPasswordModelOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;