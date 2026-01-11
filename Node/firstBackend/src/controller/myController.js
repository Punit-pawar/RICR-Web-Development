import User from "../models/userModel.js";

export const UserRegister = async (req, res, next) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
      const error = new Error("All Feilds Required");
      error.statusCode = 400;
      return next(error);
    }

    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      const error = new Error("Email Already Exists");
      error.statusCode = 409;
      return next(error);
    }

    const newUser = await User.create({
      fullName,
      email,
      phone,
      password,
    });

    console.log(newUser);

    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All Feilds Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("User Not Found");
      error.statusCode = 404;
      return next(error);
    }

    const isVerified = password === existingUser.password;
    if (!isVerified) {
      const error = new Error("User Not Authorized");
      error.statusCode = 402;
      return next(error);
    }

    console.log(existingUser);

    res.status(200).json({ message: "Welcome Back", data: existingUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const UserLogout = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Logout successfull" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const UserUpdate = async (req, res, next) => {
  try {
    const { fullName, email, phone } = req.body;

    if (!fullName || !email || !phone) {
      const error = new Error("All Feilds Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("User Not Found");
      error.statusCode = 404;
      return next(error);
    }
    existingUser.fullName = fullName;
    existingUser.phone = phone;

    await existingUser.save();

    res
      .status(200)
      .json({ message: "User Updated Successfully", data: existingUser });
      
  } catch (error) {
    console.log(error);
    next(error);
  }
};