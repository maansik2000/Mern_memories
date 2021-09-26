import mongoose from "mongoose";
import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = await Users.findOne({ email });
    if (!existUser) return res.status(404).send({ message: "User not Found" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).send({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existUser.email, id: existUser._id },
      "TestSignIn",
      { expiresIn: "24h" }
    );

    res.status(200).send({ result: existUser, token });
  } catch (error) {
    res.status(500).send({ message: "Something went Wrong" });
  }
};

export const signup = async (req, res) => {
  const { username, password, email, confirmPassword, userImage } = req.body;

  try {
    const existingUser = await Users.findOne({ email });

    if (existingUser)
      return res.status(400).send({ message: "User already exist" });

    if (password !== confirmPassword)
      return res.status(400).send({ message: "Passwords don't match" });

    const hashedpassword = await bcrypt.hash(password, 12);

    const result = await Users.create({
      email,
      password: hashedpassword,
      username,
      userImage,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      "TestSignIn",
      { expiresIn: "24h" }
    );

    res.status(200).send({ result, token });
  } catch (error) {
    res.status(500).send({ message: "Something went Wrong" });
  }
};

export const UpdateProfile = async (req, res) => {
  const post = req.body;
  const id = req.params.id;

  try {
    const updatedUser = await Users.findByIdAndUpdate(id, post, {
      new: true,
    });
    const token = jwt.sign(
      { email: updatedUser.email, id: updatedUser._id },
      "TestSignIn",
      { expiresIn: "24h" }
    );

    res.status(200).send({ result: updatedUser, token });
  } catch (error) {
    res.status(500).send({ message: "Something went Wrong" });
  }
};
