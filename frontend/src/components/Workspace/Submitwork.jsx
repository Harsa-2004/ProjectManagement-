// // SubmitWork.jsx
// import React, { useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import "./Submitwork.css";

// const SubmitWork = ({ selectedProject }) => {
//   // Retrieve logged-in user details from localStorage
//   const user = JSON.parse(localStorage.getItem("user")) 

//   // Local state for file, link, and submission status
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [submissionLink, setSubmissionLink] = useState("");
//   const [submissionSuccess, setSubmissionSuccess] = useState(false);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   // Handle file upload submission
//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file to upload.");
//       return;
//     }
//     if (!selectedProject || !selectedProject._id) {
//       alert("No project selected. Please select a project first.");
//       return;
//     }

//     // Create FormData for file upload
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     // Use the project _id and logged-in user's username (or _id)
//     formData.append("projectId", selectedProject._id);
//     formData.append("user", user.username);

//     try {
//       const response = await fetch("http://localhost:8000/api/submissions/upload", {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) {
//         throw new Error("Failed to upload file");
//       }
//       const data = await response.json();
//       alert(data.message);
//       setSubmissionSuccess(true);
//       setSelectedFile(null);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("Error submitting work. Please try again.");
//     }
//   };

//   // Handle link submission
//   const handleLinkSubmit = async () => {
//     if (!submissionLink.trim()) {
//       alert("Please enter a submission link.");
//       return;
//     }
//     if (!selectedProject || !selectedProject._id) {
//       alert("No project selected. Please select a project first.");
//       return;
//     }

//     const submissionData = {
//       projectId: selectedProject._id,
//       user: user.username,
//       link: submissionLink,
//     };

//     try {
//       const response = await fetch("http://localhost:8000/api/submissions/link", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(submissionData),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to submit link");
//       }
//       const data = await response.json();
//       alert(data.message);
//       setSubmissionSuccess(true);
//       setSubmissionLink("");
//     } catch (error) {
//       console.error("Error submitting link:", error);
//       alert("Error submitting work. Please try again.");
//     }
//   };

//   return (
//     <div className="submit-work-container">
//       <h2>Submit Your Work</h2>
//       <div className="submission-section">
//         <div className="upload-section">
//           <h3>Upload File</h3>
//           <input type="file" onChange={handleFileChange} />
//           <button onClick={handleFileUpload}>Upload File</button>
//         </div>
//         <div className="link-section">
//           <h3>Submit Link</h3>
//           <input
//             type="text"
//             placeholder="Enter submission URL"
//             value={submissionLink}
//             onChange={(e) => setSubmissionLink(e.target.value)}
//           />
//           <button onClick={handleLinkSubmit}>Submit Link</button>
//         </div>
//       </div>
//       {submissionSuccess && (
//         <div className="submission-success">
//           <FaCheckCircle size={24} style={{ marginRight: "8px" }} color="green" />
//           <span>Submission Successful!</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubmitWork;
// SubmitWork.jsx
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./Submitwork.css";

const SubmitWork = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [submissionLink, setSubmissionLink] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Handler for file input changes
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handler for file upload using localStorage
  const handleFileUpload = () => {
    if (!selectedFile) return;

    // Create a new submission object for the file
    const newFileSubmission = {
      id: Date.now().toString(),
      type: "file",
      name: selectedFile.name,
      url: URL.createObjectURL(selectedFile),
      projectId: "YOUR_PROJECT_ID_HERE", // Replace with dynamic project ID
      user: "currentUser",             // Replace with current user info
      status: "submitted",
      createdAt: new Date().toISOString(),
    };

    // Get current submissions from localStorage or initialize an empty array
    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    submissions.push(newFileSubmission);
    localStorage.setItem("submissions", JSON.stringify(submissions));

    setSubmissionSuccess(true);
    setSelectedFile(null);
    alert("File submitted successfully (stored locally)!");
  };

  // Handler for link submission using localStorage
  const handleLinkSubmit = () => {
    if (!submissionLink.trim()) return;

    // Create a new submission object for the link
    const newLinkSubmission = {
      id: Date.now().toString(),
      type: "link",
      link: submissionLink,
      projectId: "YOUR_PROJECT_ID_HERE", // Replace with dynamic project ID
      user: "currentUser",              // Replace with current user info
      status: "submitted",
      createdAt: new Date().toISOString(),
    };

    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    submissions.push(newLinkSubmission);
    localStorage.setItem("submissions", JSON.stringify(submissions));

    setSubmissionSuccess(true);
    setSubmissionLink("");
    alert("Link submitted successfully (stored locally)!");
  };

  return (
    <div className="submit-work-container">
      <h2>Submit Your Work</h2>
      <div className="submission-section">
        <div className="upload-section">
          <h3>Upload File</h3>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Upload File</button>
        </div>
        <div className="link-section">
          <h3>Submit Link</h3>
          <input
            type="text"
            placeholder="Enter submission URL"
            value={submissionLink}
            onChange={(e) => setSubmissionLink(e.target.value)}
          />
          <button onClick={handleLinkSubmit}>Submit Link</button>
        </div>
      </div>
      {submissionSuccess && (
        <div className="submission-success">
          <FaCheckCircle size={24} style={{ marginRight: "8px" }} color="green" />
          <span>Submission Successful!</span>
        </div>
      )}
    </div>
  );
};

export default SubmitWork;
