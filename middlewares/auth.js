import { User } from "../models/userModel.js";
import { errorHandler } from "./errorHandler.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(errorHandler(401, "Please Login to access"));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedData);
    if (!user) {
      return next(errorHandler(404, "No user found"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
export const autherizedAdmin = (req, res, next) => {
  if (req.user.accountType !== "admin") {
    return next(errorHandler(403, "You can not access this resource"));
  }
  next();
};
export const autherizedFreelancer = (req, res, next) => {
  if (
    req.user.accountType !== "freelancer" &&
    req.user.accountType !== "admin"
  ) {
    return next(errorHandler(403, "You can not access this resource"));
  }
  next();
};
export const autherizedClient = (req, res, next) => {
  if (req.user.accountType !== "client" && req.user.accountType !== "admin") {
    return next(errorHandler(403, "You can not access this resource"));
  }
  next();
};
