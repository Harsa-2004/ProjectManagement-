// import React from 'react';
// import "./signup.css";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// const Signup = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate(); // Hook for navigation
  
//     // Handle Signup
//     const handleSignup = async (e) => {
//       e.preventDefault();
  
//       const res = await fetch("/api/signup", {
//         method: "POST",
//         body: JSON.stringify({ email, password }),
//         headers: { "Content-Type": "application/json" },
//       });
  
//       const data = await res.json();
  
//       if (res.ok) {
//         alert("Signup Successful!");
//         navigate("/create-project"); // Redirect to Create Project page
//       } else {
//         alert(data.message || "Signup failed!");
//       }
//     };

// return (
//   <div className="signup-container">
//     <div className="addUser">
//       <h3>Sign In</h3>
//       <form className="addUserForm" onSubmit={handleSignup}>
//         <div className="inputGroup">

//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             autoComplete="off"
//             placeholder="Enter your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             autoComplete="off"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit" className="btn btn-success">
//             Sign In
//           </button>
//         </div>
//       </form>
//       <div className="Login">
//         <p>Already have an Account?</p>
//         <Link to="/Login" className="btn btn-secondary">
//           Login
//         </Link>
//       </div>
//     </div>
//   </div>
// );
// };
// export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    // Handle Signup
    const handleSignup = async (e) => {
      e.preventDefault(); 

      try {
        const res = await fetch("http://localhost:8000/api/users", { 
          method: "POST",
          body: JSON.stringify({ name, email, password }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res.ok) {
          alert("Signup Successful! Please login.");
          navigate("/login"); // Redirect to login page
        } else {
          alert(data.message || "Signup failed!");
        }
      } catch (error) {
        console.error("Error signing up:", error);
        alert("Something went wrong. Please try again.");
      }
    };

    return (
      <div className="signup-container">
        <div className="addUser">
          <h3>Sign Up</h3>
          <form className="addUserForm" onSubmit={handleSignup}>
            <div className="inputGroup">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                autoComplete="off"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                autoComplete="off"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="btn btn-success">
                Sign Up
              </button>
            </div>
          </form>

          <div className="Login">
            <p>Already have an Account?</p>
            <Link to="/Login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Signup;
