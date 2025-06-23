import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateProject.css";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [priority, setPriority] = useState("Low");
  const navigate = useNavigate();

  const handleCreateProject = async (e) => {
    e.preventDefault();

    if (!projectName.trim() || !description.trim() || !deadline.trim() || !teamMembers.trim()) {
      alert("All fields are required!");
      return;
    }

    const projectData = {
      projectName,
      description,
      deadline,
      teamMembers, 
      priority,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/projects/create", projectData);
      alert(response.data.message);
      navigate("/Workspace"); // Redirect to workspace
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project. Please try again.");
    }
  };

  return (
    <div className="create-project-container">
      <h2>Create New Project</h2>
      <form onSubmit={handleCreateProject}>
        <label>Project Name</label>
        <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Deadline</label>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />

        <label>Team Members (comma-separated emails)</label>
        <input type="text" value={teamMembers} onChange={(e) => setTeamMembers(e.target.value)} required />

        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button type="submit" className="btn btn-primary">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
