import express from "express";
import Message from "../models/message.js"; // Import Message Model

const router = express.Router();

// Get chat messages for a project
router.get("/:projectId", async (req, res) => {
  try {
    const messages = await Message.find({ projectId: req.params.projectId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Save a new message
router.post("/", async (req, res) => {
  try {
    const { projectId, sender, message } = req.body;

    const newMessage = new Message({ projectId, sender, message });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
