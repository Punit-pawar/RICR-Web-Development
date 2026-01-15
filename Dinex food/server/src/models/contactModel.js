import mongoose from "mongoose";

const UserContact = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    enquire: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Contact = mongoose.model("Contact", UserContact);
export default Contact;
