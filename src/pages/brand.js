import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sub from "../assets/sub.png";
import shark from "../assets/shark.png";
import bold from "../assets/bold.png";
import { PiPlay } from "react-icons/pi";

// Utility function to toggle fullscreen for a video element
const toggleFullscreen = (video) => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
};

export default function Brands() {
  const [activeBrand, setActiveBrand] = useState(null);

  const brandDetails = [
    {
      brand: "Brand 1",
      logo: sub,
      videos: [
        "https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4",
        "https://videos.pexels.com/video-files/2759477/2759477-uhd_2560_1440_30fps.mp4",
        "https://videos.pexels.com/video-files/1560989/1560989-hd_1280_720_30fps.mp4",
        "https://videos.pexels.com/video-files/2759477/2759477-uhd_2560_1440_30fps.mp4",
        "https://videos.pexels.com/video-files/1560989/1560989-hd_1280_720_30fps.mp4"
      ]
    },
    {
      brand: "Brand 2",
      logo: shark,
      videos: [
        "https://videos.pexels.com/video-files/2759477/2759477-uhd_2560_1440_30fps.mp4",
        "https://videos.pexels.com/video-files/1560989/1560989-hd_1280_720_30fps.mp4"
      ]
    },
    {
      brand: "Brand 3",
      logo: bold,
      videos: [
        "https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4"
      ]
    }
  ];

  const toggleBrand = (brand) => {
    if (activeBrand === brand) {
      setActiveBrand(null); // Reset to 'All'
    } else {
      setActiveBrand(brand);
    }
  };

  const filteredVideos = () => {
    if (!activeBrand) {
      // Show all videos if no brand is selected
      return brandDetails.flatMap((brand) => brand.videos);
    } else {
      // Filter videos by the active brand
      return brandDetails.find((b) => b.brand === activeBrand).videos;
    }
  };

  const handleVideoClick = (e) => {
    const videoElement = e.target;
    toggleFullscreen(videoElement);
    videoElement.play().catch((error) => {
      console.error("Error attempting to play the video:", error);
    });

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        videoElement.pause();
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
  };

  return (
    <div className="w-full  flex flex-col justify-center bg-black text-white  h-max relative">
      <div className=" flex flex-col h-full fixed  bg-black top-20 my-4 px-4 md:my-16 md:px-8 overflow-auto">
        <div className="flex items-center gap-4 mt-8">
          {/* Brand toggle buttons */}
          <button
            className={`rounded-full px-2 gap-1 hover:bg-transparent flex items-center justify-center py-1 text-sm group ${
              !activeBrand
                ? "bg-transparent outline-white transition-all duration-200 outline-1 outline"
                : ""
            }`}
            onClick={() => toggleBrand(null)}
          >
            All
          </button>
          {brandDetails.map((brand, index) => (
            <button
              key={index}
              className={`rounded-full gap-1 hover:bg-transparent px-2 flex items-center justify-center py-1 text-sm group ${
                activeBrand === brand.brand
                  ? "bg-transparent outline-white transition-all duration-200 outline-1 outline"
                  : ""
              }`}
              onClick={() => toggleBrand(brand.brand)}
            >
              {brand.brand}
            </button>
          ))}
        </div>
        <div className="my-8 bg-black overflow-y-auto  flex-grow h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          <AnimatePresence>
            {filteredVideos().map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-lg h-max group w-full"
              >
                <video
                  src={video}
                  className="object-cover rounded-lg cursor-pointer group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 opacity-70"
                  onClick={handleVideoClick}
                  controls={false}
                />
                <PiPlay className="absolute cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white group-hover:scale-125 transition-transform duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
