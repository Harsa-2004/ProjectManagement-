import React, { useState, useEffect } from "react";
import { FaDownload, FaTrash, FaLink, FaFile, FaCopy } from "react-icons/fa";
import "./Submissions.css";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Retrieve submissions from localStorage when the component mounts
    const storedSubmissions = localStorage.getItem("submissions");
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions));
    }
  }, []);

  const handleDelete = (id) => {
    const updated = submissions.filter((sub) => sub.id !== id);
    setSubmissions(updated);
    localStorage.setItem("submissions", JSON.stringify(updated));
  };

  const handleCopyLink = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => alert("Link copied to clipboard!"))
      .catch((error) => console.error("Error copying link:", error));
  };

  return (
    <div className="submissions-container">
      <h2>Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <ul className="submission-list">
          {submissions.map((submission) => (
            <li key={submission.id} className="submission-item">
              <div className="submission-info">
                <span className="submission-type">
                  {submission.type === "file" ? <FaFile /> : <FaLink />}
                </span>
                <span className="submission-name">
                  {submission.type === "file"
                    ? submission.name
                    : submission.link}
                </span>
              </div>
              <div className="submission-actions">
                {submission.type === "file" ? (
                  <a
                    href={submission.url}
                    download={submission.name}
                    className="download-button"
                  >
                    <FaDownload /> Download
                  </a>
                ) : (
                  <button
                    onClick={() => handleCopyLink(submission.link)}
                    className="copy-button"
                  >
                    <FaCopy /> Copy Link
                  </button>
                )}
                <button
                  onClick={() => handleDelete(submission.id)}
                  className="delete-button"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Submissions;
