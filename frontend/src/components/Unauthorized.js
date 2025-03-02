import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="container text-center mt-5">
      <h2>403 - Unauthorized</h2>
      <p>You do not have permission to view this page.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
};

export default Unauthorized;
