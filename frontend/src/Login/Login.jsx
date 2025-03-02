
// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { FaGoogle, FaGithub } from "react-icons/fa"; 
// import "./Login.css"; 

// const Login = () => {
//   const [Name, setName]=useState("");
//   const [email, setEmail] = useState("");  // Store user email
//   const [password, setPassword] = useState("");  // Store user password
//   const navigate = useNavigate();  // Hook for navigation

//   // Handle Login
//   const handleLogin = async () => {
//     try {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         body: JSON.stringify({ email, password }),
//         headers: { "Content-Type": "application/json" }
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", data.role);

//         // Redirect based on role
//         if (data.role === "admin") {
//           navigate("/AdminPage");
//         } else if (data.role === "manager") {
//           navigate("/ManagerPage");
//         } else {
//           navigate("/TeamPage");
//         }
//       } else {
//         alert(data.message || "Login failed!");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//     }
//   };

//   return (
//   <div className='Login-container'>
//     <div className="addUser">
//       <h3>Login</h3>
//       <form className="addUserForm">
//         <div className="inputGroup">
//         <label htmlFor="name">Name</label>
//           <input 
//             type="name" 
//             id="name" 
//             autoComplete="off" 
//             placeholder="Enter your Name"
//             value={Name} 
//             onChange={(e) => setName(e.target.value)} 
//           />
//           <label htmlFor="email">Email</label>
//           <input 
//             type="email" 
//             id="email" 
//             autoComplete="off" 
//             placeholder="Enter your Email"
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//           />

//           <label htmlFor="password">Password</label>
//           <input 
//             type="password"  // Corrected from "email" to "password"
//             id="password" 
//             autoComplete="off" 
//             placeholder="Enter your password"
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//           />
          

//           <button type="button" className="btn btn-success" onClick={handleLogin}>
//             Login
//           </button>
//         </div>  
//       </form>

//       <div className="Login">
//         <p>Don't have an account? <a href="/Signup">Sign Up</a></p>
//         <p>or</p>

//         <div id="login-screen" className="hidden">
//           <button type="button" className="btn btn-primary">
//             <FaGoogle size={20} style={{ marginRight: "8px" }} /> Login with Google
//           </button>
//         </div>

//         <div id="login-screen" className="hidden">
//           <button type="button" className="btn btn-dark">
//             <FaGithub size={20} style={{ marginRight: "8px" }} /> Login with GitHub
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const navigate = useNavigate();  

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const res = await fetch("http://localhost:8000/api/auth", { 
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.data);
        alert("Login Successful!");

        // Redirect based on role (Modify as per your requirement)
        navigate("/Workspace");
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="Login-container">
      <div className="addUser">
        <h3>Login</h3>
        <form className="addUserForm" onSubmit={handleLogin}>
          <div className="inputGroup">
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
              Login
            </button>
          </div>  
        </form>

        <div className="Login">
          <p>Don't have an account? <a href="/Signup">Sign Up</a></p>
          <p>or</p>

          <button type="button" className="btn btn-primary">
            <FaGoogle size={20} style={{ marginRight: "8px" }} /> Login with Google
          </button>

          <button type="button" className="btn btn-dark">
            <FaGithub size={20} style={{ marginRight: "8px" }} /> Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
