import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {FaCheckCircle,FaTimes,FaUpload,FaDownload, FaTasks, FaCalendarAlt, FaFileUpload, FaComment, FaProjectDiagram, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Workspace.css";

const Workspace = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem("projects")) || []);
  const [selectedProject, setSelectedProject] = useState(projects.length > 0 ? projects[0] : null);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || {});
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", team: "", task: "" });
  const [editTask, setEditTask] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState(() => JSON.parse(localStorage.getItem("uploadedFiles")) || []);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [showSubmissionsPopup, setShowSubmissionsPopup] = useState(false);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [projects, tasks]);

  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [uploadedFiles, tasks]);

  // Open Submission Popup
  const handleOpenUploadPopup = () => {
    setShowUploadPopup(true);
  };

  // Open Submissions Popup
  const handleOpenSubmissionsPopup = () => {
    setShowSubmissionsPopup(true);
  };

  // Close Popups
  const handleClosePopup = () => {
    setShowUploadPopup(false);
    setShowSubmissionsPopup(false);
    setSubmissionSuccess(false);
  };

  // Handle File Selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle File Upload & Task Status Update
  const handleFileUpload = () => {
    if (!selectedFile) return;

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          const newFile = {
            id: Date.now(),
            name: selectedFile.name,
            url: URL.createObjectURL(selectedFile),
          };

          // Add file to uploaded files
          setUploadedFiles((prev) => [...prev, newFile]);

          // Move task to "Submitted" status
          const updatedTasks = { ...tasks };
          updatedTasks["submitted"] = updatedTasks["submitted"] || [];
          updatedTasks["submitted"].push({
            id: newFile.id,
            title: newFile.name,
            status: "submitted",
          });

          setTasks(updatedTasks);
          setSelectedFile(null);
          setSubmissionSuccess(true);

          // Hide success message after 3 seconds
          setTimeout(() => {
            setSubmissionSuccess(false);
          }, 3000);

          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Delete File
  const handleDeleteFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== fileId));
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      updatedTasks["submitted"] = updatedTasks["submitted"].filter((task) => task.id !== fileId);
      return updatedTasks;
    });
  };
  const handleAddProject = () => navigate("/Project");

  const handleProjectClick = (project) => setSelectedProject(project);

  const handleEditProject = (project) => {
    navigate(`/Project/Edit/${project.projectName}`, { state: { project } });
  };
  


  const handleDeleteProject = () => {
    const updatedProjects = projects.filter((p) => p.projectName !== selectedProject.projectName);
    setProjects(updatedProjects);
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      delete updatedTasks[selectedProject.projectName]; // Use projectName as the key
      return updatedTasks;
    });

    setSelectedProject(updatedProjects.length > 0 ? updatedProjects[0] : null);
    setShowDeletePopup(false);
  };

  const handleAddTask = () => setShowTaskPopup(true);
  const handleCloseTaskPopup = () => setShowTaskPopup(false);

  const handleTaskSubmit = () => {
    if (!newTask.title || !newTask.team || !newTask.task) return;
    const newTaskObj = { id: Date.now().toString(), ...newTask };

    setTasks((prev) => ({
      ...prev,
      [selectedProject.projectName]: prev[selectedProject.projectName]
        ? { ...prev[selectedProject.projectName], requested: [...prev[selectedProject.projectName].requested, newTaskObj] }
        : { requested: [newTaskObj], todo: [], inProgress: [], done: [] },
    }));
    setNewTask({ title: "", team: "", task: "" });
    handleCloseTaskPopup();
  };

  // Edit Task
  const handleEditTask = (task) => {
    setEditTask(task);
    setShowEditPopup(true);
  };

  const handleEditTaskSubmit = () => {
    if (!editTask.title || !editTask.team || !editTask.task) return;

    setTasks((prev) => {
      const updatedTasks = { ...prev };
      for (let status in updatedTasks[selectedProject.projectName]) {
        updatedTasks[selectedProject.projectName][status] = updatedTasks[selectedProject.projectName][status].map((t) =>
          t.id === editTask.id ? editTask : t
        );
      }
      return updatedTasks;
    });

    setShowEditPopup(false);
    setEditTask(null);
  };

  // Delete Task
  const handleDeleteTask = (taskId) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      for (let status in updatedTasks[selectedProject.projectName]) {
        updatedTasks[selectedProject.projectName][status] = updatedTasks[selectedProject.projectName][status].filter((t) => t.id !== taskId);
      }
      return updatedTasks;
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    if (sourceColumn === destinationColumn) return;

    const sourceItems = Array.from(tasks[selectedProject.projectName]?.[sourceColumn] || []);
    const destItems = Array.from(tasks[selectedProject.projectName]?.[destinationColumn] || []);
    const [movedItem] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, movedItem);

    setTasks((prev) => ({
      ...prev,
      [selectedProject.projectName]: {
        ...prev[selectedProject.projectName],
        [sourceColumn]: sourceItems,
        [destinationColumn]: destItems,
      },
    }));
  };

  return (
    <div className="workspace">
      <aside className="sidebar">
        <h3>Dashboard</h3>
        <ul>
        <li className="sidebar-item" onClick={handleAddProject}><FaProjectDiagram /> Add Project </li>
          {projects.map((project, index) => (
            <li
              key={index}
              className={selectedProject?.projectName === project.projectName ? "active" : ""}
              onClick={() => handleProjectClick(project)}
            >
              {project.projectName} {/* FIXED: Access project name correctly */}
              <FaEdit onClick={(e) => { e.stopPropagation(); handleEditProject(project);  }} />
              <FaTrash onClick={(e) => { e.stopPropagation(); setShowDeletePopup(true); }} />
            </li>
          ))}
          <li className="sidebar-item" onClick={handleAddTask}><FaTasks /> Add Task</li>
          <li className="sidebar-item"><FaCalendarAlt /> Deadlines</li>
          <li className="sidebar-item" onClick={handleOpenUploadPopup}><FaFileUpload /> Submit your Work</li>
          <li className="sidebar-item" onClick={handleOpenSubmissionsPopup}><FaFileUpload /> Submissions</li>
          <li className="sidebar-item"><FaComment /> Comments</li>
        </ul>
      </aside>

      <div className="main-content">
        <header>
          <h2>{selectedProject ? selectedProject.projectName : "No Projects"}</h2>
        </header>
        {selectedProject && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-board">
              {["requested", "todo", "inProgress", "done"].map((status) => (
                <Droppable key={status} droppableId={status}>
                  {(provided) => (
                    <div className="kanban-column" ref={provided.innerRef} {...provided.droppableProps}>
                      <h6>{status.toUpperCase()}</h6>
                      {tasks[selectedProject.projectName]?.[status]?.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div className="kanban-card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <p>{task.title}</p>
                              <span className="task-meta">{task.team}</span>
                              <span className="task-label">{task.task}</span>
                              <FaEdit className="edit-icon" onClick={() => handleEditTask(task)} />
                              <FaTrash className="delete-icon" onClick={() => handleDeleteTask(task.id)} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        )}
      </div>
      
      {showTaskPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Create Task</h3>
            <input type="text" placeholder="Task Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
            <input type="text" placeholder="Team" value={newTask.team} onChange={(e) => setNewTask({ ...newTask, team: e.target.value })} />
            <input type="text" placeholder="Task Description" value={newTask.task} onChange={(e) => setNewTask({ ...newTask, task: e.target.value })} />
            <button onClick={handleTaskSubmit}>Create</button>
            <button onClick={handleCloseTaskPopup}>Cancel</button>
          </div>
        </div>
      )}

      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h5>Are you sure you want to delete this project?</h5>
            <button onClick={handleDeleteProject}>Yes</button>
            <button onClick={() => setShowDeletePopup(false)}>No</button>
          </div>
        </div>
      )}
        {showEditPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Edit Task</h3>
            <input type="text" value={editTask.title} onChange={(e) => setEditTask({ ...editTask, title: e.target.value })} />
            <input type="text" value={editTask.team} onChange={(e) => setEditTask({ ...editTask, team: e.target.value })} />
            <input type="text" value={editTask.task} onChange={(e) => setEditTask({ ...editTask, task: e.target.value })} />
            <button onClick={handleEditTaskSubmit}>Save</button>
            <button onClick={() => setShowEditPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
     {showUploadPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h5>Submit Your Work</h5>
            <FaTimes className="close-icon" onClick={handleClosePopup} />

            <div className="upload-section">
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleFileUpload} disabled={!selectedFile}>
                <FaUpload /> Upload
              </button>
            </div>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="progress-bar">
                <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            )}

            {/* Submission Success Message */}
            {submissionSuccess && (
              <div className="success-message">
                <FaCheckCircle className="success-icon" />
                <span>Submission Successful!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Submissions Popup */}
      {showSubmissionsPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h5>Submitted Work</h5>
            <FaTimes className="close-icon" onClick={handleClosePopup} />
            
            {uploadedFiles.length === 0 ? (
              <p>No submissions yet.</p>
            ) : (
              <ul className="file-list">
                {uploadedFiles.map((file) => (
                  <li key={file.id} className="file-item">
                    <span>{file.name}</span>
                    <div>
                      <a href={file.url} download={file.name}><FaDownload /></a>
                      <FaTrash onClick={() => handleDeleteFile(file.id)} className="delete-icon" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Workspace;

