import Contact from "../models/contactModel.js";
import Menu from "../models/menuSchema.js";
import User from "../models/userModel.js";

export const NewContact = async (req, res, next) => {
  try {
    const { fullName, email, mobileNumber, message } = req.body;

    if (!fullName || !email || !mobileNumber || !message) {
      const error = new Error("All feilds required");
      error.statusCode = 400;
      return next(error);
    }

    const newContact = await Contact.create({
      fullName,
      email,
      mobileNumber,
      message,
    });

    console.log(newContact);

    res.status(201).json({
      message:
        "Thanks for Contacting us. We will Get Back to you in 24-48 Hours",
    });
  } catch (error) {
    next(error);
  }
};

export const GetAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await User.find({ role: "manager" }).select(
      "-password",
    );

    res.status(200).json({
      message: "Restaurants fetched successfully",
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
};

export const GetRetaurantMenuData = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("All feilds required");
      error.statusCode = 400;
      return next(error);
    }

    const restaurantMenuData = await Menu.find({
      resturantID: id,
    }).sort({ updatedAt: -1 });
    //.populate("resturantID");

    res
      .status(200)
      .json({ message: "Menu fetched Sucessfully", data: restaurantMenuData });
  } catch (error) {
    next(error);
  }
};