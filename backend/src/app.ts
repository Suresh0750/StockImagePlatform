import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./config";
import authRoutes from "./routes/authRoutes";
import imageRoutes from "./routes/ImageRoutes";

dotenv.config();
connectToDatabase();

const app = express();
const FRONTEND_ENV = process.env.FRONTEND_ENV || "http://localhost:5173" || "https://stock-image-platform-two.vercel.app" || "https://stock-image-platform-jeoi.vercel.app";

app.use(
  cors({
    origin: FRONTEND_ENV.replace(/\/$/, ""),
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

// API routes
app.use('/api/auth', authRoutes);
app.use("/api/image", imageRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
