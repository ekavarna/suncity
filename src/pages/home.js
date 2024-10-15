import React, { useState, useRef, useMemo } from "react";
import Player from "../components/player";
import Footer from "../components/footer";
import Who from "../components/Who";
import Nav from "../components/nav";
import FullscreenModal from "../components/fullscreen";
import Loader from "../components/loadingScreen";
import ScrollToTop from "react-scroll-to-top";
import { FaChevronUp, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

function HomePage({ projects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false); // Track if the video is ready
  const reelVideoRef = useRef(null);
  const reelMobileVideoRef = useRef(null);

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

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (reelVideoRef.current) {
      reelVideoRef.current.muted = !reelVideoRef.current.muted;
    }
    if (reelMobileVideoRef.current) {
      reelMobileVideoRef.current.muted = !reelMobileVideoRef.current.muted;
    }
  };

  const filteredProjects = projects
    .filter((project) => project.id)
    .sort((a, b) => (a.id === 1 ? -1 : b.id === 1 ? 1 : a.id - b.id));

  const reelMobileProject = useMemo(() => {
    return projects.find((project) => project.title === "ReelMobile");
  }, [projects]);

  if (projects.length >= 1) {
    return (
      <div className="h-full w-full bg-white">
        <div className="flex flex-col bg-black items-center gap-y-4 md:gap-y-8">
          <Nav />

          {/* Reel video section with mute button for desktop */}
          <div className="relative h-full hidden lg:block rounded-xl lg:mx-8 mx-4">
            <div className="relative w-full h-full">
              <video
                ref={reelVideoRef}
                className="w-full object-cover h-full rounded-3xl"
                muted={isMuted}
                autoPlay
                onContextMenu={(e) => e.preventDefault()}
                loop
                playsInline
                preload="auto"
                onLoadedData={() => setIsVideoReady(true)} // Video loaded event
              >
                <source
                  src={`https://cms.suncitystudios.in/uploads/Reel_d8c7daa11a.mp4`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Show mute button only when video is ready */}
              {isVideoReady && (
                <button
                  onClick={toggleMute}
                  className="absolute top-4 right-4 z-10 text-white"
                >
                  {isMuted ? (
                    <FaVolumeMute className="text-xl" />
                  ) : (
                    <FaVolumeUp className="text-xl" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* MOBILE REEL */}
          <div className="relative w-full lg:hidden block">
            <div className="object-cover rounded-lg w-full h-full">
              {reelMobileProject && (
                <video
                  controls={false}
                  ref={reelMobileVideoRef}
                  autoPlay
                  disablePictureInPicture
                  playsInline
                  preload="auto"
                  loop
                  muted={isMuted}
                  onLoadedData={() => setIsVideoReady(true)} // Video loaded event
                  className="h-full w-full"
                >
                  <source
                    src={`https://cms.suncitystudios.in/${reelMobileProject.teaser}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Show mute button only when video is ready */}
              {isVideoReady && (
                <button
                  onClick={toggleMute}
                  className="absolute top-4 right-4 z-10 text-white"
                >
                  {isMuted ? (
                    <FaVolumeMute className="text-xl" />
                  ) : (
                    <FaVolumeUp className="text-xl" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Other projects */}
          {filteredProjects &&
            filteredProjects.slice(0, 5).map((project, index) => (
              <div
                key={index}
                onClick={(e) => handleClick(project)}
                className="w-full cursor-pointer bg-black h-full"
              >
                <Player
                  title={project.title}
                  brand={project.brand}
                  url={project.teaser}
                />
              </div>
            ))}

          <ScrollToTop
            smooth
            component={<FaChevronUp className="text-2xl text-black" />}
            className="rounded-full flex items-center justify-center btn-circle shadow-xl hover:scale-105 duration-300"
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
                    showControls: true,
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
