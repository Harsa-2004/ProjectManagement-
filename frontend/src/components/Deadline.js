import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProjectDeadlineTracker = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Project A", deadline: "2025-03-10" },
    { id: 2, name: "Project B", deadline: "2025-03-15" },
  ]);
  const [newProject, setNewProject] = useState({ name: "", deadline: "" });

  const calculateProgress = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const total = end - now;
    const elapsed = total > 0 ? (1 - total / (end - now + 1000000000)) * 100 : 100;
    return Math.min(100, Math.max(0, elapsed));
  };

  const handleAddProject = () => {
    if (newProject.name && newProject.deadline) {
      setProjects([...projects, { id: projects.length + 1, ...newProject }]);
      setNewProject({ name: "", deadline: "" });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Project Deadline Tracker</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Project Name"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        />
        <input
          type="date"
          className="form-control mb-2"
          value={newProject.deadline}
          onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handleAddProject}>Add Project</button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Deadline</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.deadline}</td>
              <td>
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${calculateProgress(project.deadline)}%` }}
                  >
                    {Math.round(calculateProgress(project.deadline))}%
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectDeadlineTracker;
