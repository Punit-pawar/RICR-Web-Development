import Menu from "../models/menuSchema.js";
import { UploadMultipleToCloudinary } from "../utils/imageUploader.js";

export const RestaurantAddMenuItem = async (req, res, next) => {
  try {
    const {
      itemName,
      description,
      price,
      type,
      preparationTime,
      availability,
      servingSize,
      cuisine,
    } = req.body;

    const CurrentUser = req.user;

    if (
      !itemName ||
      !description ||
      !price ||
      !type ||
      !preparationTime ||
      !availability ||
      !servingSize ||
      !cuisine
    ) {
      const error = new Error("All Fields are Required");
      error.statusCode = 400;
      return next(error);
    }

    const images = await UploadMultipleToCloudinary(req.files);
    console.log(images);

    const newMenuItem = await Menu.create({
      itemName,
      description,
      price,
      type,
      preparationTime,
      availability,
      servingSize,
      cuisine,
      images,
      resturantID: CurrentUser._id,
    });

    res.status(201).json({
      message: "Menu Item Added Successfully",
      data: newMenuItem,
    });
  } catch (error) {
    next(error);
  }
};

export const GetRestaurantMenuItem = async (req, res, next) => {
  try {
    const CurrentUser = req.user;

    const menuItems = await Menu.find({ resturantID: CurrentUser._id });

    res.status(200).json({
      message: "Menu Items Fetched Successfully",
      data: menuItems,
    });
  } catch (error) {
    next(error);
  }
};