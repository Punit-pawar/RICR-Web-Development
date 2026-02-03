import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";
import UserImage from "../../assets/userImage.jpg";
import { FaCamera, FaMapLocationDot, FaWallet } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { BiSolidBank } from "react-icons/bi";
import api from "../../config/Api";
import toast from "react-hot-toast";
import ResetPasswordModal from "./modals/ResetPasswordModal";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  console.log(user);

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [preview, setPreview] = useState("");

  const changePhoto = async (photo) => {
    const form_Data = new FormData();
    form_Data.append("image", photo);

    try {
      const res = await api.patch("/user/changePhoto", form_Data);
      toast.success(res.data.message);
      setUser(res.data.data);
      sessionStorage.setItem("DineXUser", JSON.stringify(res.data.data));
      setPreview("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotoURL = URL.createObjectURL(file);
      setPreview(newPhotoURL);
      setTimeout(() => {
        changePhoto(file);
      }, 1000);
    }
  };

  const renderField = (label, value) => (
    <div className="flex justify-between py-2 px-3 border-b border-gray-200 last:border-b-0">
      <span className="text-gray-600 font-medium">{label}:</span>
      <span className="text-gray-900 font-semibold">
        {value && value !== "N/A" ? (
          value
        ) : (
          <span className="text-gray-400">Not provided</span>
        )}
      </span>
    </div>
  );

  return (
    <>
      <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex gap-6">
            {/* Photo Section */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="border-4 border-gray-300 rounded-full w-40 h-40 overflow-hidden bg-gray-100">
                  <img
                    src={preview || user?.photo?.url || UserImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-2 right-2 bg-(--color-secondary) text-white p-3 rounded-full hover:bg-(--color-secondary-hover) cursor-pointer transition transform hover:scale-110"
                >
                  <FaCamera size={18} />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Click camera to change photo
              </p>
            </div>

            <div className="flex justify-between w-full">
              <div>
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-(--color-primary) mb-2">
                    {user?.fullName || "User Name"}
                  </h1>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-(--color-secondary) text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
                      {user?.role || "customer"}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user?.isActive === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user?.isActive || "active"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-medium">Email:</span>
                    <span className="text-gray-900">
                      {user?.email || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-medium">Phone:</span>
                    <span className="text-gray-900">
                      {user?.mobileNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-medium">
                      Member Since:
                    </span>
                    <span className="text-gray-900">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-IN")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4">
                <button
                  onClick={() => setIsEditProfileModalOpen(true)}
                  className="px-6 py-2 bg-(--color-secondary) text-white rounded-lg hover:bg-(--color-secondary-hover) transition font-semibold"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setIsResetPasswordModalOpen(true)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-(--color-secondary) rounded"></span>
            Personal Information
          </h2>
          <div className="space-y-1">
            {renderField("Date of Birth", user?.dob)}
            {renderField("Gender", user?.gender)}
            {renderField("Address", user?.address)}
            {renderField("City", user?.city)}
            {renderField("PIN Code", user?.pin)}
          </div>
        </div>

        {(user?.geoLocation?.lat !== "N/A" ||
          user?.geoLocation?.lon !== "N/A") && (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaMapLocationDot className="text-(--color-secondary)" />
              Geo Location
            </h2>
            <div className="space-y-1">
              {renderField("Latitude", user?.geoLocation?.lat)}
              {renderField("Longitude", user?.geoLocation?.lon)}
            </div>
          </div>
        )}

        {user?.paymentDetails?.upi !== "N/A" && (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaWallet className="text-(--color-secondary)" />
              Payment Details
            </h2>
            <div className="space-y-1">
              {renderField("UPI ID", user?.paymentDetails?.upi)}
            </div>
          </div>
        )}

        {(user?.paymentDetails?.account_number !== "N/A" ||
          user?.paymentDetails?.ifs_Code !== "N/A") && (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BiSolidBank className="text-(--color-secondary)" />
              Bank Account Details
            </h2>
            <div className="space-y-1">
              {renderField(
                "Account Number",
                user?.paymentDetails?.account_number,
              )}
              {renderField("IFSC Code", user?.paymentDetails?.ifs_Code)}
            </div>
          </div>
        )}

        {user?.role === "customer" &&
          (user?.documents?.uidai !== "N/A" ||
            user?.documents?.pan !== "N/A") && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaFileAlt className="text-(--color-secondary)" />
                Documents
              </h2>
              <div className="space-y-1">
                {renderField("UIDAI", user?.documents?.uidai)}
                {renderField("PAN", user?.documents?.pan)}
              </div>
            </div>
          )}

        {user?.role !== "customer" &&
          Object.values(user?.documents || {}).some((doc) => doc !== "N/A") && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaFileAlt className="text-(--color-secondary)" />
                Documents
              </h2>
              <div className="space-y-1">
                {user?.documents?.gst &&
                  renderField("GST", user?.documents?.gst)}
                {user?.documents?.fssai &&
                  renderField("FSSAI", user?.documents?.fssai)}
                {user?.documents?.rc && renderField("RC", user?.documents?.rc)}
                {user?.documents?.dl &&
                  renderField("Driving License", user?.documents?.dl)}
                {user?.documents?.uidai &&
                  renderField("UIDAI", user?.documents?.uidai)}
                {user?.documents?.pan &&
                  renderField("PAN", user?.documents?.pan)}
              </div>
            </div>
          )}

        {(user?.restaurantName !== "N/A" || user?.cuisine !== "N/A") && (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Restaurant Information
            </h2>
            <div className="space-y-1">
              {renderField("Restaurant Name", user?.restaurantName)}
              {renderField("Cuisine Type", user?.cuisine)}
            </div>
          </div>
        )}
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