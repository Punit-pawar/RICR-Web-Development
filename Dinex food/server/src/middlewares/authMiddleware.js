import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const Protect = async (req, res, next) => {
  try {
    const biscut = req.cookies.parleG;
    console.log("Token recived in Cookies:", biscut);

    const tea = jwt.verify(biscut, process.env.JWT_SECRET);
    console.log(tea);
    if (!tea) {
      const error = new Error("Unauthorized! Please Login Again");
      error.statusCode = 401;
      return next(error);
    }

    const verifiedUser = await User.findById(tea.id);
    if (!verifiedUser) {
      const error = new Error("Unauthorized! Please Login Again");
      error.statusCode = 401;
      return next(error);
    }

    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};

export const AdminProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      const error = new Error("Unauthorized! Only admin can do this");
      error.statusCode = 401;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
export const PartnerProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "partner") {
      const error = new Error("Unauthorized! Only rider can do this");
      error.statusCode = 401;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
export const ManagerProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "manager") {
      const error = new Error(
        "Unauthorized! Only restaurant manager can do this",
      );
      error.statusCode = 401;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
export const CustomerProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "customer") {
      const error = new Error("Unauthorized! Only user can do this");
      error.statusCode = 401;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const OtpProtect = async (req, res, next) => {
  try {
    const token = req.cookies.otpToken;
    console.log("Token recived in Cookies:", token);

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    if (!decode) {
      const error = new Error("Unauthorized! Please try again");
      error.statusCode = 401;
      return next(error);
    }

    const verifiedUser = await User.findById(decode.id);
    if (!verifiedUser) {
      const error = new Error("Unauthorized! Please try again");
      error.statusCode = 401;
      return next(error);
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    next(error);
  }
};