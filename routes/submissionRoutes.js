// backend/routes/submissionRoutes.js
import express from "express";
import Submission from "../models/Submission.js";

const router = express.Router();

// POST /api/submissions/link – Save a link submission
router.post("/link", async (req, res) => {
  try {
    const { projectId, user, link } = req.body;
    if (!link) {
      return res.status(400).json({ message: "Link is required" });
    }

    const submission = new Submission({
      projectId,
      user,
      submissionType: "link",
      link,
      status: "submitted",
    });

    await submission.save();
    res.status(201).json({ message: "Link submitted successfully", submission });
  } catch (error) {
    console.error("Error submitting link:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
