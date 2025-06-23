import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// Create a new project
router.post("/create", async (req, res) => {
    try {
        const { projectName, description, deadline, teamMembers, priority } = req.body;

        if (!projectName || !description || !deadline || !teamMembers || !priority) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProject = new Project({
            projectName,
            description,
            deadline,
            teamMembers, 
            priority,
        });

        await newProject.save();
        res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get all projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;
