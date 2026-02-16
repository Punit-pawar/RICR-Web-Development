import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb Connected at ", conn.connection.host);
    console.log("Database Name : ", conn.connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;