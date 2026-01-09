import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routers/myRouter.js";

const app = express();

app.use(express.json());

app.use("/auth", AuthRouter);

app.get("/", (req, res) => {
  console.log("Server is running");
  res.json({ Message: "Server is running Sucessfully now" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server Started at PORT", PORT);
  connectDB();
});
