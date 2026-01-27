import cloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";

export const UserUpdate = async (req, res, next) => {
  try {
    //logic here

    const { fullName, email, mobileNumber } = req.body;
    const currentUser = req.user;

    if (!fullName || !email || !mobileNumber) {
      const error = new Error("All Feilds Required");
      error.statusCode = 400;
      return next(error);
    }

    console.log("OldData: ", currentUser); //old user data in JSON format
    //first Way
    // currentUser.fullName = fullName;
    // currentUser.email = email;
    // currentUser.mobileNumber = mobileNumber;
    // await currentUser.save();

    // console.log("NewData:", currentUser);

    //Second Way

    const updatedUser = await User.findByIdAndUpdate(
      { _id: currentUser._id },
      {
        fullName,
        email,
        mobileNumber,
      },
      { new: true },
    );

    console.log("Updated User: ", updatedUser);
    res
      .status(200)
      .json({ message: "User Updated Sucessfully", data: updatedUser });

    console.log("Updating the user");
  } catch (error) {
    next(error);
  }
};

export const UserChangePhoto = async (req, res, next) => {
  try {
    // console.log("body: ", req.body);
    const CurrentUser = res.user;
    console.log("file:", req.file);

    if (!dp) {
      const error = new Error("profile picture required");
      error.statusCode = 401;
      return next(error);
    }

    if (CurrentUser.photo.publicID) {
      await cloudinary.uploader.destroy(CurrentUser.photo.publicID);
    }

    const b64 = Buffer.from(dp.buffer).tostring("base64");
    // console.log(b64.slice(0.100));
    const dataURI = `data:${dp.minetype};base64,${b64}`;
    console.log("DataURI", dataURI.slice(0, 100));

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "DineX/User",
      width: 500,
      height: 500,
      crop: "fill",
    });

    res.status(200).json({ message: "Photo Updated" });
  } catch (error) {
    next(error);
  }
};
