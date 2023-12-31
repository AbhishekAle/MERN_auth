import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

//.env configuration
dotenv.config();
const app = express();
//middleware
app.use(express.json());
app.use(cookieParser());
//database connection
connectDB();
const port = process.env.PORT;
//routes
app.use("/api", userRoute);

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
