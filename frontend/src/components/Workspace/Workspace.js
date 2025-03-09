import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {FaCheckCircle,FaTimes,FaUpload,FaDownload, FaTasks, FaCalendarAlt, FaFileUpload, FaComment, FaProjectDiagram, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Workspace.css";

const Workspace = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
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
  const [submissionLink, setSubmissionLink] = useState("");
  const [setSubmissions]= useState("");
  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  // const handleProjectClick = (projectId) => {
  //   navigate(`/kanban/${projectId}`);
  // };

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
  const handleFileUpload = async () => {
    if (!selectedFile || !selectedProject) return;
  
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("projectId", selectedProject._id); // Make sure your selectedProject has _id from backend
    formData.append("user", "currentUser"); // Replace with actual user info
    formData.append("file", selectedFile);
  
    try {
      const response = await fetch("http://localhost:8000/api/submissions", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
      const data = await response.json();
      alert(data.message);
      // Optionally, refresh your submissions list here by calling fetchSubmissions()
      setSubmissionSuccess(true);
      setShowUploadPopup(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error submitting work. Please try again.");
    }
  };

  const handleLinkSubmission = async (link) => {
    if (!selectedProject) return;
    try {
      const submissionData = {
        projectId: selectedProject._id,
        user: "currentUser", // Replace with actual user info
        link,
      };
      const response = await fetch("http://localhost:8000/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit link");
      }
      const data = await response.json();
      alert(data.message);
      setSubmissionSuccess(true);
      setShowUploadPopup(false);
    } catch (error) {
      console.error("Error submitting link:", error);
      alert("Error submitting work. Please try again.");
    }
  };
  const fetchSubmissions = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/submissions/project/${projectId}`);
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
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
  const handleDeadline=()=>navigate("/Deadline");
  // const handleChat = () =>navigate("/Chat");

  const handleProjectClick = (project) => setSelectedProject(project);

  const handleEditProject = (project) => {
    navigate(`/project/edit/${project._id}`, { state: { project } });
  };
  
  const handleDeleteProject = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/projects/${projectId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
  
      fetchProjects(); 
      setShowDeletePopup(false);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  
  const handleAddTask = () => setShowTaskPopup(true);
  const handleCloseTaskPopup = () => setShowTaskPopup(false);

  const handleTaskSubmit = async () => {
    // Check if a project is selected
    if (!selectedProject) {
      alert("Please select a project before adding a task.");
      return;
    }
  
    if (!newTask.title || !newTask.team || !newTask.task) return;
  
    // Prepare task data using the project's _id from the backend
    const taskData = {
      projectId: selectedProject._id, // Ensure this exists on the project object from the backend
      title: newTask.title,
      team: newTask.team,
      task: newTask.task,
      status: "requested", // Default status
    };
  
    try {
      const response = await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
  
      // Optionally, refresh tasks (you need to implement fetchTasks() that loads tasks from your backend)
      fetchTasks();
      setNewTask({ title: "", team: "", task: "" });
      setShowTaskPopup(false);
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };
  
  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/tasks/projects/${selectedProject._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      // Group tasks by status (adjust as needed based on your backend response)
      const groupedTasks = {
        requested: data.filter((t) => t.status === "requested"),
        todo: data.filter((t) => t.status === "todo"),
        inProgress: data.filter((t) => t.status === "inProgress"),
        done: data.filter((t) => t.status === "done"),
        submitted: data.filter((t) => t.status === "submitted"),
      };
      setTasks((prev) => ({
        ...prev,
        [selectedProject._id]: groupedTasks,
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
  
  // Edit Task
  const handleEditTask = (task) => {
    setEditTask(task);
    setShowEditPopup(true);
  };

  // Edit Task – update only the matching task in its current status column
const handleEditTaskSubmit = async () => {
  if (!editTask.title || !editTask.team || !editTask.task) return;

  setTasks((prev) => {
    const updatedTasks = { ...prev };
    const projectTasks = updatedTasks[selectedProject._id] || {};

    Object.keys(projectTasks).forEach((status) => {
      projectTasks[status] = projectTasks[status].map((t) => {
        const tId = t._id || t.id;
        const editId = editTask._id || editTask.id;
        // Only update the task that matches the edited task's ID
        return tId === editId ? { ...t, ...editTask } : t;
      });
    });

    return {
      ...updatedTasks,
      [selectedProject._id]: projectTasks,
    };
  });

  // Optionally send the update to the backend
  try {
    const taskId = editTask._id || editTask.id;
    const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editTask),
    });
    if (!response.ok) {
      throw new Error("Failed to update task in backend");
    }
  } catch (error) {
    console.error("Error updating task:", error);
    alert("Failed to update task. Please try again.");
  }

  setShowEditPopup(false);
  setEditTask(null);
};

  // Delete Task
  const handleDeleteTask = async (taskId) => {
    // Determine which column the task is in by checking each status array
    let taskStatus = null;
    for (const status in tasks[selectedProject._id]) {
      if (tasks[selectedProject._id][status].some((t) => t.id === taskId || t._id === taskId)) {
        taskStatus = status;
        break;
      }
    }
    if (!taskStatus) {
      console.error("Task not found in any column");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
  
      // Update local state for only that status column
      setTasks((prev) => ({
        ...prev,
        [selectedProject._id]: {
          ...prev[selectedProject._id],
          [taskStatus]: prev[selectedProject._id][taskStatus].filter(
            (t) => (t.id || t._id) !== taskId
          ),
        },
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };
  

    const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) return;
    const sourceItems = Array.from(tasks[selectedProject._id]?.[source.droppableId] || []);
    const destItems = Array.from(tasks[selectedProject._id]?.[destination.droppableId] || []);
    const [movedItem] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, movedItem);
    // Optionally update the task status if dragging across columns
    movedItem.status = destination.droppableId;
    setTasks((prev) => ({
      ...prev,
      [selectedProject._id]: {
        ...prev[selectedProject._id],
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      },
    }));
    // You may want to update the backend here as well with the new status
  };

  return (
    <div className="workspace">
      <aside className="sidebar">
        <h3>Dashboard</h3>
        <ul>
        <li className="sidebar-item" onClick={handleAddProject}>
  <FaProjectDiagram /> Add Project
</li>

{projects.map((project) => (
  <li
    key={project._id} 
    className={selectedProject?._id === project._id ? "active" : ""}
    onClick={() => handleProjectClick(project)}
  >
    {project.projectName}
    <FaEdit
      onClick={(e) => {
        e.stopPropagation();
        handleEditProject(project);
      }}
    />
    <FaTrash
      onClick={(e) => {
        e.stopPropagation();
        setShowDeletePopup(project._id); // Store project ID in state
      }}
    />
  </li>
))}

          <li className="sidebar-item" onClick={handleAddTask}><FaTasks /> Add Task</li>
          <li className="sidebar-item"onClick={() => navigate("/Deadline")}><FaCalendarAlt /> Deadlines</li>
          <li className="sidebar-item" onClick={() => navigate(`/submit-work/${selectedProject._id}`)}><FaFileUpload /> Submit your Work</li>

          <li className="sidebar-item" onClick={() => navigate("/Submissions")}><FaFileUpload /> Submissions</li>
          {/* <li className="sidebar-item"onClick={handleChat}><FaComment /> Chat</li> */}
        </ul>
      </aside>

      <div className="main-content">
        <header>
          <h2>{selectedProject ? selectedProject.projectName : "No Projects"}</h2>
        </header>
        {selectedProject && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-board">
              {["requested", "todo", "inProgress", "done"].map((status) => {
                const count = tasks[selectedProject._id]?.[status]?.length || 0;
                return (
                  <Droppable key={status} droppableId={status}>
                    {(provided) => (
                      <div
                        className="kanban-column"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <h6>
                          {status.toUpperCase()} ({count})
                        </h6>
                        {tasks[selectedProject._id]?.[status]?.map((task, index) => (
                          <Draggable
                            key={task._id || task.id}
                            draggableId={task._id ? task._id.toString() : task.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="kanban-card"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <p>{task.title}</p>
                                <span className="task-meta">{task.team}</span>
                                <span className="task-label">{task.task}</span>
                                <FaEdit
                                  className="edit-icon"
                                  onClick={() => handleEditTask(task)}
                                />
                                <FaTrash
                                  className="delete-icon"
                                  onClick={() => handleDeleteTask(task._id || task.id)}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </div>
          </DragDropContext>
        )}


      </div>
      
      {showTaskPopup && (
  <div className="popup-overlay">
    <div className="popup-content">
      <h5>Create Task</h5>
      <input
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Team"
        value={newTask.team}
        onChange={(e) => setNewTask({ ...newTask, team: e.target.value })}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={newTask.task}
        onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
      />
      <button onClick={handleTaskSubmit}>Create</button>
      <button onClick={handleCloseTaskPopup}>Cancel</button>
    </div>
  </div>
)}
W
{showDeletePopup && (
  <div className="popup-overlay">
    <div className="popup-content">
      <h5>Are you sure you want to delete this project?</h5>
      <button onClick={() => handleDeleteProject(showDeletePopup)}>Yes</button> 
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
          <FaUpload /> Upload File
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Or enter submission link..."
          value={submissionLink}
          onChange={(e) => setSubmissionLink(e.target.value)}
          style={{ width: "80%", marginRight: "10px" }}
        />
        <button onClick={() => handleLinkSubmission(submissionLink)}>
          Submit Link
        </button>
      </div>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}
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

