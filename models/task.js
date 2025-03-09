import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  title: { type: String, required: true },
  team: { type: String, required: true },
  task: { type: String, required: true },
  status: { type: String, enum: ["requested", "todo", "inProgress", "done", "submitted"], default: "requested" },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
