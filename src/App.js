import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import About from "./pages/about";
import Brands from "./pages/brand";
import HomePage from "./pages/home";
import { fetchProjectsData } from "./components/dataService";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjectsData = async () => {
      const projectsData = await fetchProjectsData();
      setProjects(projectsData);
    };

    loadProjectsData();
    return () => {
      // Optionally clear cache here if needed
      // projectsCache = null;
    };
  }, []);


  
  return (
    <Router>
      <div className="bg-black font-Roboto text-white h-full overflow-hidden w-screen">
        <Routes>
          <Route path="/" element={<HomePage projects={projects} />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
