import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
//Routes import
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
config({ path: "./config/config.env" });
dbConnection();
const app = express();
app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/project", projectRoutes);
app.use((err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;
  return res.statusCode(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on Port number", PORT);
});
