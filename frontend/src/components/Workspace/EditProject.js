import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./EditProject.css";


const EditProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state?.project; // Get project data from navigation state

  const [newProjectName, setNewProjectName] = useState(project?.projectName || "");
  const [description, setDescription] = useState(project?.description || "");
  const [deadline, setDeadline] = useState(project?.deadline || "");
  const [teamMembers, setTeamMembers] = useState(project?.teamMembers?.join(", ") || "");
  const [priority, setPriority] = useState(project?.priority || "");

  useEffect(() => {
    if (!project) navigate("/Workspace"); // Redirect if no project found
  }, [project, navigate]);

  const handleSaveChanges = () => {
    if (!newProjectName.trim()) return;

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

    // Find the project index
    const projectIndex = projects.findIndex((p) => p.projectName === project.projectName);
    if (projectIndex !== -1) {
      projects[projectIndex] = {
        projectName: newProjectName,
        description,
        deadline,
        teamMembers: teamMembers.split(",").map((member) => member.trim()), // Convert to array
        priority
      };

      localStorage.setItem("projects", JSON.stringify(projects));
    }

    // Rename tasks associated with the project
    if (tasks[project.projectName]) {
      tasks[newProjectName] = tasks[project.projectName];
      delete tasks[project.projectName];
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    navigate("/Workspace"); // Redirect back after saving
  };

  return (
    <div className="edit-project">
      <h2>Edit Project</h2>
      <input type="text" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} placeholder="Project Name" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Project Description"></textarea>
      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="Deadline" />
      <input type="text" value={teamMembers} onChange={(e) => setTeamMembers(e.target.value)} placeholder="Team Members (comma-separated)" />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default EditProject;
