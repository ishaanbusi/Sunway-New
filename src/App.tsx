import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Editor from "./pages/admin/Editor";
// import AdminRegister from "./pages/admin/AdminRegister";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-gold-light">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          {/* <Route path="/admin/register" element={<AdminRegister />} /> */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/create-post" element={<Editor />} />
          <Route path="/admin/edit-post/:id" element={<Editor />} />

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/contact" element={<Contact />} />
                  // In your router setup, replace the existing blog routes:
                  <Route path="/blog" element={<BlogList />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
