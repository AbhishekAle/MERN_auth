import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//.env configuration
dotenv.config();
const app = express();
//database connection
connectDB();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
