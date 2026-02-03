import mongoose from "mongoose";

const menuSchema = mongoose.Schema(
  {
    resturantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    servingSize: {
      type: String,
      required: true,
    },
    preparationTime: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "veg",
        "non-veg",
        "vegan",
        "egg",
        "jain",
        "gluten-free",
        "contains-nuts",
        "dairy",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
      enum: ["available", "unavailable", "removed"],
      default: "available",
    },
    image: {
      type: [
        {
          url: { type: String, required: true },
          publicID: { type: String, required: true },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;