import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/Api";

const EditProfileModal = ({ onClose }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    mobileNumber: user?.mobileNumber || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-100">
      <div className="bg-white w-5xl max-h-[85vh] overflow-y-auto ">
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-6 px-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-red-400 p-2 px-5 rounded-3xl text-white m-4"
            >
              X
            </button>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold italic text-gray-900 mb-2">
                Edit Profile
              </h1>
            </div>

            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <form className="p-8" onSubmit={handleSubmit}>
                <div className="mb-10 space-y-4">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                  />

                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
                <div className="flex gap-4 pt-8 border-t-2 border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-bold py-4 px-6 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition shadow-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
