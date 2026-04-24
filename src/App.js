import React, { useState, useEffect } from "react";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/Resume";
import BlogList from "./components/Blog/BlogList";
import BlogPost from "./components/Blog/BlogPost";
import RouteBoundary from "./components/RouteBoundary";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { useLiquidGlass } from "./hooks/useLiquidGlass";

import ScrollToTop from "./components/ScrollToTop";
function App() {
  const [load, updateLoad] = useState(true);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useLiquidGlass();

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <ScrollToTop />
        <RouteBoundary>
...
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
        </RouteBoundary>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
