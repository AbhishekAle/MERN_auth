import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register controller
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

//logIn Controller
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found. Please register." });
    }

    const validPassword = bcrypt.compareSync(password, existingUser.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Wrong credentials." });
    }

    const { password: pass, ...rest } = existingUser._doc;
    const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY);

    res.cookie("access_token", token, { httpOnly: true });

    return res.status(200).json({ ...rest, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//logOut controller
export const logoutUser = async (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "user has benn logged out" });
};

export const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (error) {}
};
