import React, { useState, useEffect } from "react";
import Player from "../components/player";
import Footer from "../components/footer";
import Who from "../components/Who";
import Nav from "../components/nav";
import WorkTogether from "../components/workTogether";
import FullscreenModal from "../components/fullscreen";

const toggleFullscreen = (videoElement) => {
  if (videoElement.requestFullscreen) {
    videoElement.requestFullscreen();
  } else if (videoElement.webkitRequestFullscreen) {
    videoElement.webkitRequestFullscreen();
  } else if (videoElement.mozRequestFullScreen) {
    videoElement.mozRequestFullScreen();
  } else if (videoElement.msRequestFullscreen) {
    videoElement.msRequestFullscreen();
  }
};

function HomePage({ projects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleVideoClick = (project) => {
    setSelectedVideo(project);
    setIsModalOpen(true);
  };

  const handleMobVideoClick = (e, project) => {
    const videoElement = e.currentTarget.querySelector("video");

    if (!videoElement) return;

    toggleFullscreen(videoElement);

    videoElement.play().catch((error) => {
      console.error("Error attempting to play the video:", error);
    });

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        videoElement.pause();
        videoElement.controls = false;
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
      } else {
        videoElement.controls = true;
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
  };

  const handleClick = (project, e) => {
    if (isMobile) {
      handleMobVideoClick(e, project);
    } else {
      handleVideoClick(project);
    }
  };

  return (
    <div className="h-full w-full bg-white">
      <div className="flex flex-col bg-black items-center gap-4 md:gap-8">
        <Nav />
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={(e) => handleClick(project, e)}
            className="w-full cursor-pointer bg-black h-full"
          >
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
