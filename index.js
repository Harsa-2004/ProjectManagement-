import express from "express";
import dotenv from "dotenv";
// import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import userRoutes from "./routes/users.js"; 
import authRoutes from "./routes/auth.js"; 
import projectRoutes from "./routes/projectRoutes.js";
import messageRoute from "./routes/messageRoute.js";
import taskroutes from "./routes/taskroutes.js";
import submissionRoutes from "./routes/submissionRoutes.js"; 

dotenv.config();

const app = express();
const server = createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (Change this in production)
    methods: ["GET", "POST"],
  },
});

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
app.use("/api/tasks", taskroutes);
app.use("/api/messages",messageRoute); // Chat message handling route
app.use("/api/submissions", submissionRoutes);



// Start server
server.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
