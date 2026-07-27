import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("Access denied. No authentication token provided.", 401),
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check User
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError("User no longer exists.", 401));
    }

    if (!user.isActive) {
      return next(new AppError("User account has been deactivated.", 403));
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid authentication token.", 401));
    }

    if (error.name === "TokenExpiredError") {
      return next(new AppError("Authentication token has expired.", 401));
    }

    next(error);
  }
};

export default protect;
