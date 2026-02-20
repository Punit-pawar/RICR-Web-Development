import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    items: {
      type: [],
      required: true,
    },
    orderValue: {
      subtotal: {
        type: Number,
        required: true,
      },
      tax: {
        type: Number,
        required: true,
      },
      deliveryFee: {
        type: Number,
        required: true,
      },
      discountType: {
        type: String,
      },
      discountPercentage: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      paymentMethod: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "preparing",
        "ready",
        "pickedUp",
        "onTheWay",
        "delivered",
        "refused",
        "damaged",
        "cancelled",
      ],
      default: "pending",
    },
    review: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
      },
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;