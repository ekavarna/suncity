import React, { useState } from "react";
import Player from "../components/player";
import Footer from "../components/footer";
import Who from "../components/Who";
import Nav from "../components/nav";
import reel from "../assets/Reel.mp4";

import FullscreenModal from "../components/fullscreen";
import Loader from "../components/loadingScreen";
import ScrollToTop from "react-scroll-to-top";

import { FaChevronUp } from "react-icons/fa";

function HomePage({ projects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (project) => {
    if (project.id === 1) {
      return;
    }
    setSelectedVideo(project);
    setIsModalOpen(true);
  };

  const handleClick = (project) => {
    handleVideoClick(project);
  };
  const filteredProjects = projects
    .filter((project) => project.id)
    .sort((a, b) => (a.id === 1 ? -1 : b.id === 1 ? 1 : a.id - b.id));
  if (projects.length >= 1) {
    return (
      <div className="h-full w-full bg-white ">
        <div className="flex flex-col bg-black items-center gap-y-4 md:gap-y-8 ">
          <Nav />

          {/* Delete this div later  */}
          <div className="relative  h-full rounded-xl lg:mx-8  mx-4  ">
            <div className="relative w-full h-full ">
              <video
                className="w-full object-cover h-full rounded-3xl"
                muted
                autoPlay
                onContextMenu={(e) => e.preventDefault()}
                loop
                playsInline
                preload="auto"
              >
                <source src={reel} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          {filteredProjects &&
            filteredProjects.slice(0,5).map((project, index) => (
              <div
                key={index}
                onClick={(e) => handleClick(project)}
                className="w-full cursor-pointer bg-black h-full"
              >
                <Player
                  title={project.title}
                  description={project.description}
                  url={project.teaser}
                />
              </div>
            ))}
          <ScrollToTop
            smooth
            component={<FaChevronUp className="text-2xl  text-black" />}
            className="rounded-full flex items-center justify-center  btn-circle shadow-xl  hover:scale-105 duration-300"
          />

          <Who />
        </div>

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
  } else {
    return <Loader />;
  }
}

export default HomePage;
