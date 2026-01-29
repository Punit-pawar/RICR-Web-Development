import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";
import UserImage from "../../assets/userImage.jpg";
import { FaCamera } from "react-icons/fa";
import api from "../../config/Api";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [photo, setPhoto] = useState("");

  const changePhoto = async () => {
    const form_Data = new FormData();

    form_Data.append("image", photo);
    form_Data.append("imageURL", preview);

    try {
      const res = await api.patch("/user/changePhoto", form_Data);

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const newPhotoURL = URL.createObjectURL(file);
    //console.log(newPhotoURL);
    setPreview(newPhotoURL);
    setTimeout(() => {
      setPhoto(file);
      changePhoto();
    }, 5000);
  };

  return (
    <>
      <div className="bg-(--color-primary)/10 rounded-lg shadow-md p-6 md:p-8 h-full">
        <div className="flex justify-between border p-3 rounded-3xl items-center border-gray-300 bg-gray-300 ">
          <div className="flex gap-5 items-center">
            <div className="relative">
              <div className="hover:scale-103 border rounded-full w-36 h-36 overflow-hidden">
                <img
                  src={preview || user.photo.url || UserImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-2 left-[75%] border bg-white p-2 rounded-full hover:animate-spin hover:scale-105 group flex gap-3">
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
                {user.fullName}
              </div>
              <div className="text-gray-600 text-lg font-semibold">
                {user.email}
              </div>
              <div className="text-gray-600 text-lg font-semibold">
                {user.mobileNumber}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 me-10">
            <button className="px-4 py-2 rounded bg-(--color-secondary) border border-gray-800 hover:border-0 cursor-pointer w-35 hover:scale-110 hover:bg-green-500 hover:font-bold text-white">
              Edit
            </button>
            <button className="px-4 py-2 rounded bg-(--color-secondary) border border-gray-800 hover:border-0 cursor-pointer w-35 hover:scale-110 hover:bg-red-500 hover:font-bold text-white">
              Reset
            </button>
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