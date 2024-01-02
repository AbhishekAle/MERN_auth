import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUser,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser", getUser);
router.get("/getuser/:id", getUserById);

export default router;
