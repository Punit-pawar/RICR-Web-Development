import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";

const UserProfile = () => {
  const  [isEditProfileModalOpen, setIsEditProfileModalOpen]  = useState(false);

  const { user } = useAuth();

  return (
    <>
      <div className="flex gap-10 items-center ">
        <div>
          <span>Name :</span> <span>{user.fullName}</span>
        </div>

        <div>
          <span>Email :</span> <span>{user.email}</span>
        </div>

        <div>
          <span>Phone :</span> <span>{user.mobileNumber}</span>
        </div>

        <button
          className="shadow hover:scale-105 bg-amber-400 px-5 py-2 rounded-2xl hover:shadow-amber-700"
          onClick={() => setIsEditProfileModalOpen(true)}
        >
          Edit Profile
        </button>
      </div>

      {isEditProfileModalOpen && (
        <EditProfileModal onClose={()=>setIsEditProfileModalOpen(false)} />
      )}

    </>
  );
};

export default UserProfile;
