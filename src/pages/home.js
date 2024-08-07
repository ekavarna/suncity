// HomePage.js
import React, { useState } from "react";
import Player from "../components/player";
import Footer from "../components/footer";
import Who from "../components/Who";
import Nav from "../components/nav";
import WorkTogether from "../components/workTogether";
import FullscreenModal from "../components/fullscreen";

function HomePage({ projects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const handleVideoClick = (project) => {
    setSelectedVideo(project);
    setIsModalOpen(true);
  };

  return (

    <div className="h-full w-full bg-white "> 
      <div className="flex flex-col bg-black  items-center gap-4 md:gap-8">
        <Nav />
        {projects.map((project) => (
          <div onClick={() => handleVideoClick(project)}
          key={project.id} className="w-full bg-black h-full">
            <Player
              title={project.title}
              description={project.description}
              url={project.link}
            />
          </div>
        ))}
        <Who />
      </div>
      <WorkTogether />
      <Footer />
      {isModalOpen && (
          <FullscreenModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          videoProps={
            selectedVideo
              ? {
                  url: selectedVideo.link,
                  title: selectedVideo.title,
                  description: selectedVideo.description,
                  logo: selectedVideo.logo,
                  isActive: true,
                  showControls: true
                }
              : {}
          }
          />
        )}
    </div>
  );
}

export default HomePage;
