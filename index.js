import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js"; // Use correct import
import authRoutes from "./routes/auth.js"; // Use correct import
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

// Connect to MongoDB
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);


// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
