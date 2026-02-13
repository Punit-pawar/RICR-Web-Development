import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../config/Api";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/public/new-contact", formData);
      toast.success(res.data.message);
      handleClearForm();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-100 px-4 py-10 relative overflow-hidden">
      


      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-600 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-gray-500 mt-2">
            Have a question or feedback? We'd love to hear from you 
          </p>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Form Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/80 backdrop-purple-lg rounded-2xl shadow-2xl border border-white/40"
          >
            <form
              onSubmit={handleSubmit}
              onReset={handleClearForm}
              className="p-8"
            >
              <div className="space-y-4">
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    maxLength="10"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <textarea
                    name="message"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                  />
                </motion.div>
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
                  {isLoading ? "Submitting..." : "Send Message"}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Map Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/80 backdrop-purple-lg rounded-2xl shadow-2xl border border-white/40 p-4"
          >
            <iframe
              title="location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3483.9331294936896!2d77.45477337509959!3d23.268962679001856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c6967f58e0dbf%3A0x65d0724cf8368e2d!2sRICR%20-%20Raj%20Institute%20of%20Coding%20%26%20Robotics%20%7C%20Best%20Java%20Coding%20Classes%20In%20Bhopal!5e1!3m2!1sen!2sin!4v1770470878471!5m2!1sen!2sin"
              className="w-full h-[400px] rounded-xl"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-10 text-sm">
          We typically respond within 24 hours 
        </p>
      </motion.div>
    </div>
  );
};

export default Contact;

