// routes/taskRoutes.js
import express from "express";
import Task from "../models/task.js";

const router = express.Router();

// Create a new task
router.post("/", async (req, res) => {
  try {
    const { projectId, title, team, task, status } = req.body;
    if (!projectId || !title || !team || !task) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newTask = new Task({
      projectId,
      title,
      team,
      task,
      status: status || "requested",
    });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update a task by ID
router.put("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { title, team, task, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, team, task, status },
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete a task by ID
router.delete("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get tasks for a specific project
router.get("/projects/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
