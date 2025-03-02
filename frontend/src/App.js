import React from 'react';
import './App.css';
import Signup from './signup/Signup';
import{RouterProvider,createBrowserRouter} from "react-router-dom";
import Login from './Login/Login';
import LandingPage from './dashboard/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Unauthorized from './components/Unauthorized';
import CreateProject from './components/CreateProject';
import Workspace from './components/Workspace/Workspace';
import EditProject from './components/Workspace/EditProject';

function App() {
  const route=createBrowserRouter([
    {
      path: '/LandingPage',  // Change to Landing Page
      element: <LandingPage/>
    },
    {
      path: '/Signup',
      element:<Signup />
    },
    {
      path: '/Login',
      element:<Login />
    },
    {
      path: '/Home',
      element:<Login />
    },
    
    {
      path: '/Unauthorized',
      element:<Unauthorized />
    },
    {
      path: '/Project',
      element:<CreateProject/>
    },
    {
      path: '/Workspace',
      element:<Workspace/>
    },
    {
      path: '/Project/Edit/:projectName',
      element:<EditProject/>
    }
        
  ]);
    return (
     
          <div className="App">
            <RouterProvider router={route}></RouterProvider>
          </div>
    );
  }
export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Signup from './signup/Signup';
// import Login from './Login/Login';
// import Dashboard from './dashboard/Dashboard';
// import AdminPage from './components/AdminPage';
// import ManagerPage from './components/ManagerPage';
// import TeamPage from './components/TeamPage';
// import Unauthorized from './components/Unauthorized';
// import PrivateRoute from './components/PrivateRoute';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import LandingPage from './dashboard/LandingPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/LandingPage" element={<LandingPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />

//         {/* Role-Based Routes */}
//         <Route path="/admin" element={<PrivateRoute element={<AdminPage />} allowedRoles={["admin"]} />} />
//         <Route path="/manager" element={<PrivateRoute element={<ManagerPage />} allowedRoles={["admin", "manager"]} />} />
//         <Route path="/team" element={<PrivateRoute element={<TeamPage />} allowedRoles={["admin", "manager", "team"]} />} />

//         {/* Unauthorized Page */}
//         <Route path="/unauthorized" element={<Unauthorized />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
