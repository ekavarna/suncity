import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { fetchProjectsData } from "./components/dataService";
import Work from "./pages/work";
import HomePage from "./pages/home";

function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjectsData = async () => {
      const projectsData = await fetchProjectsData();
      setProjects(projectsData);
    };

    loadProjectsData();
    return () => {};
  }, []);

  return (
    <Router>
      <div className="bg-black font-Roboto text-white h-full overflow-hidden w-screen">
        <Routes>
          <Route path="/" element={<HomePage projects={projects} />} />
          <Route path="/work" element={<Work projects={projects} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
