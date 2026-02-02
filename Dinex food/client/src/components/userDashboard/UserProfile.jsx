import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";
import UserImage from "../../assets/userImage.jpg";
import { FaCamera } from "react-icons/fa";
import api from "../../config/Api";
import toast from "react-hot-toast";
import ResetPasswordModal from "./modals/ResetPasswordModal";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  //console.log(user);

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [preview, setPreview] = useState("");

  const changePhoto = async (photo) => {
    const form_Data = new FormData();

    // console.log("Printing photo", photo);

    form_Data.append("image", photo);
    // form_Data.append("imageURL", preview);

    try {
      const res = await api.patch("/user/changePhoto", form_Data);

      toast.success(res.data.message);

      setUser(res.data.data);
      sessionStorage.setItem("DineXUser", JSON.stringify(res.data.data));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const newPhotoURL = URL.createObjectURL(file);
    console.log(newPhotoURL);
    setPreview(newPhotoURL);
    setTimeout(() => {
      changePhoto(file);
    }, 5000);
  };

  return (
    <>
      <div className="bg-(--color-primary)/10 rounded-lg shadow-md p-6 md:p-8 h-full">
        <div className="flex justify-between border p-3 rounded-3xl items-center border-gray-300 bg-white">
          <div className="flex gap-5 items-center">
            <div className="relative">
              <div className=" border rounded-full w-36 h-36 overflow-hidden">
                <img
                  src={preview || user.photo.url || UserImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-2 left-[75%] border bg-white p-2 rounded-full group flex gap-3">
                <label
                  htmlFor="imageUpload"
                  className="text-(--color-primary) group-hover:text-(--color-secondary)"
                >
                  <FaCamera />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
            <div>
              <div className="text-3xl text-(--color-primary) font-bold">
                {user.fullName || "User Name"}
              </div>
              <div className="text-gray-600 text-lg font-semibold">
                {user.email || "user@example.com"}
              </div>
              <div className="text-gray-600 text-lg font-semibold">
                {user.mobileNumber || "XXXXXXXXXX"}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 me-10 ">
            <button
              className="px-4 py-2 rounded bg-(--color-secondary) border border-gray-800 hover:border-0 cursor-pointer w-38 hover:scale-110 hover:bg-green-500 hover:font-bold text-white"
              onClick={() => setIsEditProfileModalOpen(true)}
            >
              Edit
            </button>
            <button className="px-4 py-2 rounded bg-(--color-secondary) border border-gray-800 hover:border-0 cursor-pointer w-38 hover:scale-110 hover:bg-red-500 hover:font-bold text-white"
            onClick={() => setIsResetPasswordModalOpen(true)}>
              Reset password
            </button>
          </div>
        </div>
      </div>

      {isEditProfileModalOpen && (
        <EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />
      )}

      {isResetPasswordModalOpen && (
        <ResetPasswordModal
          onClose={() => setIsResetPasswordModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserProfile;