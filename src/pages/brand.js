import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { MdSearch } from "react-icons/md";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { BiFilter } from "react-icons/bi";
import AnimatedText from "../components/TextAnimations/anitext";
import FullscreenModal from "../components/fullscreen";
import Nav from "../components/nav";

export default function Brands({ projects }) {
  const [activeBrand, setActiveBrand] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isBModalOpen, setIsBModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const searchRef = useRef(null);

  const toggleBrand = (brand) => {
    setActiveBrand((prev) => (prev === brand ? null : brand));
  };

  const filteredVideos = () => {
    return projects.filter((project) => {
      if (!project.teaser) return false;
      if (activeBrand && project.brand !== activeBrand) return false;
      if (
        searchTerm &&
        !project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !project.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      return project.title !== "Reel";
    });
  };

  const handleVideoClick = (project) => {
    setSelectedVideo(project);
    setIsBModalOpen(true);
  };

  const uniqueBrands = Array.from(
    new Set(projects.map((project) => project.brand))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const handleMouseEnter = (e) => {
    const videoElement = e.currentTarget.querySelector("video");

    if (videoElement.readyState >= 2) {
      setTimeout(() => {
        videoElement.play().catch((error) => {
          console.error("Error attempting to play the video:", error);
        });
      }, 100); // Debounce to avoid play/pause conflict
    }
  };

  // Function to handle mouse leave event
  const handleMouseLeave = (e) => {
    const videoElement = e.currentTarget.querySelector("video");

    setTimeout(() => {
      videoElement.pause();
    }, 100); // Debounce to avoid play/pause conflict
  };

  return (
    <div className="w-full flex flex-col justify-center bg-[#231F20] text-white min-h-screen relative">
      <div className="fixed top-0 w-full z-10">
        <Nav />
      </div>
      <div className="w-full flex flex-col h-full fixed top-24 p-4 md:p-16 overflow-auto">
        <div className="md:flex flex-row hidden items-center justify-between w-full mt-8 flex-wrap">
          <div className=" md:w-1/5">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative"
              ref={searchRef}
            >
              <input
                type="text"
                placeholder="SEARCH"
                className="input text-left w-full bg-[#231F20] border-white rounded-full text-white uppercase tracking-widest font-semibold text-xs focus:border-white input-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-2 top-2 text-xl">
                <MdSearch />
              </div>
            </motion.div>
          </div>

          <div className="flex flex-row  gap-4 items-center">
            <button
              className={`rounded-full px-2 gap-1 uppercase tracking-widest hover:bg-transparent flex items-center justify-center py-1 text-xs group ${
                !activeBrand
                  ? "bg-transparent outline-white transition-all duration-200 outline-1 outline"
                  : ""
              }`}
              onClick={() => toggleBrand(null)}
            >
              All
            </button>
            {uniqueBrands.slice(0, 7).map((brand, index) => (
              <button
                key={index}
                className={`rounded-full gap-1 uppercase tracking-widest hover:bg-transparent px-2 flex items-center justify-center py-1 text-xs group ${
                  activeBrand === brand
                    ? "bg-transparent outline-white transition-all duration-200 outline-1 outline"
                    : ""
                }`}
                onClick={() => toggleBrand(brand)}
              >
                {brand && brand}
              </button>
            ))}

            {uniqueBrands.length > 7 && (
              <div className="md:block hidden tracking-widest relative">
                <button
                  className="text-white hover:underline py-1 font-semibold uppercase text-xs text-left"
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                    setShowMore(!showMore);
                  }}
                >
                  {showMore ? (
                    <p className="flex items-center">
                      Show Less
                      <BsArrowUp />{" "}
                    </p>
                  ) : (
                    <p className="flex items-center">
                      Show More
                      <BsArrowDown />{" "}
                    </p>
                  )}
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      variants={containerVariants}
                      className="absolute bg-[#231F20] border overflow-y-scroll  glass h-max w-[12rem] max-h-56 bg-opacity text-white right-0 top-12 rounded-xl p-2 shadow-lg z-20"
                    >
                      {uniqueBrands.slice(7).map((brand, index) => (
                        <motion.button
                          variants={itemVariants}
                          key={index}
                          className="block  w-full text-xs tracking-widest uppercase hover:text-white text-left px-4 py-2"
                          onClick={() => {
                            toggleBrand(brand);
                            setDropdownOpen(false);
                          }}
                        >
                          {brand && brand}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Dropdown for mobile screens */}
        <div className="flex mt-4 md:hidden items-center justify-between w-full">
          <div className="relative w-1/2">
            {" "}
            <input
              type="text"
              placeholder="SEARCH"
              className="input w-full bg-[#231F20] border-white rounded-full text-white uppercase tracking-widest font-semibold text-xs text-left focus:border-white input-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
            <div className="absolute right-2 top-1 text-lg">
              <MdSearch />
            </div>
          </div>
          <div className="gap-2  flex  items-center relative">
            <p className="text-white text-3xl">
              <BiFilter />
            </p>
            <button
              className="bg-[#231F20] text-white text-sm px-4 py-1 rounded-full border border-white text-left"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {activeBrand || "ALL"}
            </button>
            {dropdownOpen && (
              <div className="absolute overflow-y-scroll h-[50vh] bg-[#231F20] border border-white text-white right-0 top-12 w-[12rem] glass rounded-lg shadow-lg z-20">
                <button
                  className="block w-full text-xs font-light tracking-widest text-left px-4 py-2"
                  onClick={() => {
                    toggleBrand(null);
                    setDropdownOpen(false);
                  }}
                >
                  ALL
                </button>
                {uniqueBrands.map((brand, index) => (
                  <button
                    key={index}
                    className="block w-full uppercase text-xs font-light tracking-widest text-left px-4 py-2"
                    onClick={() => {
                      toggleBrand(brand);
                      setDropdownOpen(false);
                    }}
                  >
                    {brand && brand}
                  </button>
                ))}
                {uniqueBrands.map((brand, index) => (
                  <button
                    key={index}
                    className="block w-full uppercase text-xs font-light tracking-widest text-left px-4 py-2"
                    onClick={() => {
                      toggleBrand(brand);
                      setDropdownOpen(false);
                    }}
                  >
                    {brand && brand}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="my-8 md:py-4 hidden bg-[#231F20] overflow-y-auto flex-grow h-full md:grid grid-cols-3 gap-4 justify-items-center">
          <AnimatePresence>
            {filteredVideos().map((project) => (
              <motion.div
                key={project.indexId}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleVideoClick(project)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative aspect-video rounded-lg h-max group w-full"
              >
                <video
                  src={project.teaser}
                  controls={false}
                  disablePictureInPicture
                  preload="auto"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={project.teaser} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div
                  className="absolute inset-0 text-center  flex items-center justify-center"
                  onClick={(e) => {
                    handleVideoClick(project);
                  }}
                >
                  <AnimatedText
                    brand={project.brand}
                    title={project.title}
                    isVisible={true}
                    smallText={true}
                  />{" "}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* MOBILE */}
        <div className="my-8 md:py-4 md:hidden bg-[#231F20] overflow-y-auto overflow-x-hidden flex-grow h-full grid grid-cols-1 gap-4 justify-items-center">
          {filteredVideos().map((project) => (
            <motion.div
              key={project.indexId}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleVideoClick(project)}
              className="relative cursor-pointer aspect-video rounded-lg h-max group w-full"
            >
              <video
                className="object-cover rounded-lg"
                controls={false}
                disablePictureInPicture
                preload="auto"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={project.teaser} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div
                className="absolute inset-0 text-center flex items-center justify-center"
                onClick={() => handleVideoClick(project)}
              >
                <AnimatedText
                  brand={project.brand}
                  title={project.title}
                  isVisible={true}
                  smallText={true}
                />{" "}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen modal */}

      {isBModalOpen && (
        <FullscreenModal
          isOpen={isBModalOpen}
          onClose={() => setIsBModalOpen(false)}
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
