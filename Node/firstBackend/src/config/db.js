import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
        `MongoDB connected at : ${conn.connection.host} : ${conn.connection.port}`
    );
    console.log ("Database Name :", conn.connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
