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
import Deadline from './components/Deadline';
import Chat from './components/Chat';
import ProjectPage from './components/ProjectPage';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import SubmitWork from './components/Workspace/Submitwork';
import Submissions from './components/Workspace/Submissions';
function App() {
  const route=createBrowserRouter([
    {
      path: '/',  // Change to Landing Page
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
      path: '/project/edit/:projectId',
      element:<EditProject/>
    },
    {
      path: '/Deadline',
      element:<Deadline />
    },
    {
      path: '/Chat',
      element:<Chat />
    },
    {
      path: '/ProjectPage',
      element:<ProjectPage/>
    },
    {
      path: "/submit-work/:projectId",
      element: <SubmitWork/>,
    },
    {
      path: "/submissions",
      element: <Submissions />,
    }
    
        
  ]);
    return (
     
          <div className="App">
            <RouterProvider router={route}></RouterProvider>
          </div>
    );
  }
export default App;
