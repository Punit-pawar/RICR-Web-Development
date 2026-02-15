import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import User from "../models/userModel.js";
import bcrypt, { genSalt } from "bcrypt";
import { DummyManagers, DummyPartners, DummyUsers } from "./dummy.js";

const seedManager = async () => {
  const salt = await bcrypt.genSalt();

  console.log("Adding Dummy Restaurants");
  // DummyManagers.forEach(async (manager) => {
  //   await User.create({
  //     ...manager,
  //     password: await bcrypt.hash(manager.password, salt),
  //   });
  // });

  const DummyManagersWithHashedPassword = await Promise.all(
    DummyManagers.map(async (manager) => ({
      ...manager,
      password: await bcrypt.hash(manager.password, salt),
    })),
  );

  await User.insertMany(DummyManagersWithHashedPassword);

  console.log("Dummy Restaurants Added");
};

const seedCustomer = async () => {
  const salt = await bcrypt.genSalt();
  console.log("Adding Dummy customer");
  const DummyCustomersWithHashedPassword = await Promise.all(
    DummyUsers.map(async (customer) => ({
      ...customer,
      password: await bcrypt.hash(customer.password, salt),
    })),
  );

  await User.insertMany(DummyCustomersWithHashedPassword);
  console.log("Dummy customer Added");
};

const seedRider = async () => {
  const salt = await bcrypt.genSalt();

  console.log("Adding Dummy Rider");
  const DummyPartnersWithHashedPassword = await Promise.all(
    DummyPartners.map(async (rider) => ({
      ...rider,
      password: await bcrypt.hash(rider.password, salt),
    })),
  );

  await User.insertMany(DummyPartnersWithHashedPassword);
  console.log("Dummy Rider Added");
};

const seedUser = async () => {
  try {
    await connectDB();

    const existingUsers = await User.find();
    if (existingUsers) {
      existingUsers.forEach(async (existingUser) => {
        if (existingUser.role !== "admin") {
          await existingUser.deleteOne();
        }
      });
      console.log("All Users Removed Except Admin");
    }

    await seedManager();
    await seedCustomer();
    await seedRider();
  } catch (error) {
    console.log(error);
    console.log("Error in adding Dummy User");
  }

  process.exit(1);
};

seedUser();