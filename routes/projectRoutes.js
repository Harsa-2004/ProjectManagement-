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
            teamMembers, // ✅ No need to split
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

// import express from "express";
// import Project from "../models/Project.js";
// import authMiddleware from "../middleware/authMiddleware.js"; // Middleware to get user ID

// const router = express.Router();

// // Create a new project (Only logged-in users)
// router.post("/create", authMiddleware, async (req, res) => {
//     try {
//         const { projectName, description, deadline, teamMembers, priority } = req.body;
//         const userId = req.user.id; // Get logged-in user's ID

//         if (!projectName || !description || !deadline || !teamMembers || !priority) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const newProject = new Project({
//             projectName,
//             description,
//             deadline,
//             teamMembers,
//             priority,
//             createdBy: userId, // Store user ID
//         });

//         await newProject.save();
//         res.status(201).json({ message: "Project created successfully", project: newProject });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });

// // Get projects for the logged-in user
// router.get("/my-projects", authMiddleware, async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const projects = await Project.find({ createdBy: userId });

//         res.status(200).json(projects);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });

// export default router;

