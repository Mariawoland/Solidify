import React from "react";
import { Routes, Route } from 'react-router-dom';
import "./index.css";

import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from "./pages/About";
import BlogPage from './pages/BlogPage';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

function App() {

  const LoggedIn = localStorage.getItem("LoggedIn");

  return (
    <div className='min-h-screen'>
      <div className={`background-1 transition-all duration-500`}></div>
      <Navbar />
      <Routes>
        {LoggedIn && <Route path="/" element={<Home />} />}
        {!LoggedIn && <Route path="/" element={<LoginForm />} />}
        <Route path="/" element={<LoginForm />} />
        {!LoggedIn && <Route path="/registration" element={<RegistrationForm />} />}

        {LoggedIn && <Route path="/create" element={<CreateBlog />} />}
        {LoggedIn && <Route path="/blog/:id" element={<BlogPage />} />}
        {LoggedIn && <Route path="/edit/:id" element={<EditBlog />} />}

        <Route path="/about" element={<About />} />

      </Routes>
    </div>

  );
}

export default App;