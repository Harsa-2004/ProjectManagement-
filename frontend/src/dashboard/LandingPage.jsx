import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Button, Row, Col, Card } from 'react-bootstrap';
import './LandingPage.css';
// import { Button  } from "@/components/ui/button";

function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-6 bg-white shadow-md">
          <h1 className="text-2xl font-bold text-blue-600">ProjectFlow</h1>
          {/* <div className="space-x-6 hidden md:flex">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
          </div> */}
          <div className="space-x-4">
            {/* <Button variant="outline">Log In</Button> */}
            <Link to="/login" className="btn btn-dark me-2">Login</Link>
            <Link to="/Signup" className="btn btn-dark">Sign Up</Link>
            {/* <Button variant="warning" size="lg" as={Link} to="/signup">Get Started</Button> */}
            {/* <Button className="bg-blue-600 text-white">Sign Up</Button> */}
          </div>
        </nav>
        
        {/* Hero Section */}
        <section className="hero-section">
        <section className="flex flex-col items-center text-center mt-11 px-6">
          <h2 className="text-4xl font-bold mt-2">The Ultimate Project Management Solution</h2>
          <p className="text-gray-600 mt-4 max-w-2xl">
            Organize tasks, collaborate with your team, and track progress seamlessly.
            Simplify your workflow with our easy-to-use project management tool.
          </p>
          <div className="mt-6 space-x-4">
             <Button variant="dark" size="lg" as={Link} to="/signup">Get Started</Button>
            {/* <Button variant="outline">See Features</Button> */}
          </div>
        </section>
        </section>
    </div>     
     );
}
export default LandingPage