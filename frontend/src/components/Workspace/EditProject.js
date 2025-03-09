import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./EditProject.css";

const EditProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state?.project || {}; // Get project data from navigation state

  const [projectData, setProjectData] = useState({
    projectName: project.projectName || "",
    description: project.description || "",
    deadline: project.deadline || "",
  });

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/projects/edit/${project._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      alert("Project updated successfully!");
      navigate("/Workspace"); // Navigate back to the workspace after successful update
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project. Please try again.");
    }
  };

  return (
    <div className="edit-project">
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <label>Project Name:</label>
        <input
          type="text"
          name="projectName"
          value={projectData.projectName}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={projectData.description}
          onChange={handleChange}
          required
        />

        <label>Deadline:</label>
        <input
          type="date"
          name="deadline"
          value={projectData.deadline}
          onChange={handleChange}
          required
        />

        <button type="submit" onClick={handleSubmit}>Save Changes</button>
        <button type="button" onClick={() => navigate("/Workspace")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProject;

