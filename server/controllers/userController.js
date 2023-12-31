import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "email address already exist" });
    } else {
      const hashPassword = bcrypt.hashSync(password, 10);
      const user = await UserModel.create({
        username,
        email,
        password: hashPassword,
      });

      res.status(201).json(user);
    }
  } catch (error) {
    console.log(error);
  }
};

// export const loginUser = async (req, req, next) => {};
