import bcrypt from "bcryptjs";
import User from "../models/User.js";

// Signup
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ message: "User already exists" });

    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPass });

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
};

// Login 
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found, please signup" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
};
