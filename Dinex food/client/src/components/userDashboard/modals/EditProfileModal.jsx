import React from "react";

const EditProfileModal = ({ onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
        <div className="bg-gray-200 w-5xl max-h-[85vh] overflow-y-auto rounded">
            <div>EditProfileModal</div>
            <button
                className="shadow border px-5 py-2 rounded-2xl hover:bg-black hover:text-amber-100 hover:font-bold"
                onClick={() => onClose()}>
                Band Hoo
            </button>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;
