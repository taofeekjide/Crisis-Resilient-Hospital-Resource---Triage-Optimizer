import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import generateToken from "../utils/generateToken.js";

// Register User
export const registerUser = async (userData) => {
  const { email } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already exists.", 409);
  }

  const user = await User.create({
    ...userData,
    role: "Patient",
  });

  return user;
};

// Login User
export const loginUser = async (email, password) => {
  // Find user and include password
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  // Compare password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password.", 401);
  }

  // Update last login
  await User.findByIdAndUpdate(user._id, {
    lastLogin: new Date(),
  });

  // Generate JWT
  const token = generateToken(user._id);

  // Remove password before returning
  user.password = undefined;

  return {
    token,
    user,
  };
};
