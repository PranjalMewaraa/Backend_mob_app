import { User } from "../models/userModel.js";
import { errorHandler } from "./errorHandler.js";

export const isAuthenticated = async (eq, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(errorHandler(401, "Please Login to access"));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedData);
    next();
  } catch (error) {
    next(error);
  }
};
