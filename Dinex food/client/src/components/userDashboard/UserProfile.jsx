import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";

const UserProfile = () => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <button
            className="px-6 py-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-sm"
            onClick={() => setIsEditProfileModalOpen(true)}
          >
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Full Name
            </label>
            <span className="text-lg text-gray-800 font-medium">{user.fullName}</span>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Email
            </label>
            <span className="text-lg text-gray-800 font-medium break-all">{user.email}</span>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Phone Number
            </label>
            <span className="text-lg text-gray-800 font-medium">{user.mobileNumber}</span>
          </div>
        </div>
      </div>

      {isEditProfileModalOpen && (
        <EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />
      )}
    </>
  );
};

export default UserProfile;