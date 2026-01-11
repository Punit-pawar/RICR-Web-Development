import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routers/myRouter.js";

const app = express();

app.use(express.json());

app.use("/auth", AuthRouter);

app.get("/", (req, res) => {
  console.log("Server is Running");
  res.json({ message: "Server is Running Sucessfully" });
});

app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;

  res.status(StatusCode).json({ message: ErrorMessage });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server Started at port ", port);
  connectDB();
});