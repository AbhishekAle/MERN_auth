import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";

//.env configuration
dotenv.config();
const app = express();
//middleware
app.use(express.json());
//database connection
connectDB();
const port = process.env.PORT;
//routes
app.use("/api", userRoute);

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
