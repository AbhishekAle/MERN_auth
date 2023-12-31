import UserModel from "../models/userModel.js";

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await UserModel.find({ email });
    if (existingUser) {
      res.status(409).json({ message: "email address already exist" });
    }
    const user = await UserModel.create({ username, email, password });

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
