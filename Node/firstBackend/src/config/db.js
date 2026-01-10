import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); //Connecting the MongoDB Database
    console.log(
      `MongoDb Connected at : ${conn.connection.host}:${conn.connection.port}`
    );
    console.log("DataBase Name :", conn.connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;