import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      res.status(404).json({ message: "User not found Please register" });
    }
    const validPassword = bcrypt.compareSync(password, existingUser.password);
    if (!validPassword) {
      res.status(401).json({ message: "wrong crendentials" });
    }
    const { password: pass, ...rest } = existingUser._doc;
    const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY);

    res.cookie("access_token", token, { httpOnly: true });

    res.status(200).json({ rest, token });
  } catch (error) {
    console.log(error);
  }
};
