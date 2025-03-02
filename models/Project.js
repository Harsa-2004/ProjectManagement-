import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    teamMembers: { type: [String], required: true },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" }
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
