import Order from "../models/orderModel.js";
import { calculateDistance } from "../utils/riderUtility.js";

export const RiderGetAvailableOrder = async (req, res, next) => {
  try {
    //console.log("RiderGetAvailableOrder called with body: ", req.body);
    const { lat, lon } = req.body;
    // console.log("Latitude: ", lat, "Longitude: ", lon);

    const availableOrders = await Order.find({
      riderId: null,
      status: {
        $ne: "pending",
        $ne: "cancelled",
        $ne: "delivered",
        $ne: "rejected",
      }, // $ne means Not Equal. It Exclude orders that are pending, cancelled, delivered, or rejected
    })
      .populate("userId")
      .populate("restaurantId");

    // console.log("Available Orders before distance calculation: ", availableOrders);

    const AvailableOrdersWithDistance = await calculateDistance(
      availableOrders,
      lat,
      lon,
    );

    // console.log("Available Orders With Distance: ", AvailableOrdersWithDistance);

    res.status(200).json({
      message: "Available Orders Fetched Successfully",
      data: AvailableOrdersWithDistance,
    });
  } catch (error) {
    next(error);
  }
};

export const RiderGetOngoingOrder = async (req, res, next) => {
  try {
    const currentuser = req.user;
    const ongoingOrders = await Order.find({
      riderId: currentuser._id,
      status: {
        $in: ["accepted", "preparing", "ready", "pickedUp", "onTheWay"],
      }, // $in means "is in". It Include orders that are accepted, preparing, ready, pickedUp, or onTheWay
    })
      .populate("userId")
      .populate("restaurantId");

    res.status(200).json({
      message: "Ongoing Orders Fetched Successfully",
      data: ongoingOrders,
    });
  } catch (error) {
    next(error);
  }
};

export const RiderGetCompletedOrder = async (req, res, next) => {
  try {
    const currentuser = req.user;
    const completedOrders = await Order.find({
      riderId: currentuser._id,
      status: {
        $in: ["delivered", "refused", "damaged", "cancelled", "rejected"],
      }, // $in means "is in". It Include orders that are delivered, refused, damaged, cancelled, or rejected
    })
      .populate("userId")
      .populate("restaurantId");

    res.status(200).json({
      message: "Completed Orders Fetched Successfully",
      data: completedOrders,
    });
  } catch (error) {
    next(error);
  }
};