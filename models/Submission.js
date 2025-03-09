// backend/models/Submission.js
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  user: { type: String, required: true },
  submissionType: { type: String, enum: ["link"], default: "link" },
  link: { type: String, required: true },
  status: { type: String, enum: ["submitted", "pending", "approved"], default: "submitted" },
  createdAt: { type: Date, default: Date.now },
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
