import React, { useState, useRef, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { MdSearch } from "react-icons/md";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { BiFilter, BiSort } from "react-icons/bi";
import FullscreenModal from "../components/fullscreen";
import Nav from "../components/nav";
import Fuse from "fuse.js";

export default function Work({ projects }) {
  const [activeBrand, setActiveBrand] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isBModalOpen, setIsBModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest' or 'oldest'
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const searchRef = useRef(null);
  const videoContainerRef = useRef(null);
  useEffect(() => {
    if (videoContainerRef.current) {
      videoContainerRef.current.scrollTo(0, 0);
    }
  }, [activeBrand, searchTerm, sortOrder]);

  const toggleBrand = (brand) => {
    setActiveBrand((prev) => (prev === brand ? null : brand));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    if (e.target.value) {
      setActiveBrand(null); // Reset the brand filter
    }
  };

  const fuseOptions = {
    keys: ["title", "brand"],
    includeScore: true,
    threshold: 0.3,
  };
  const filteredVideos = useMemo(() => {
    let filtered = projects.filter((project) => {
      if (searchTerm) {
        const fuse = new Fuse([project], fuseOptions);
        const result = fuse.search(searchTerm);
        return (
          result.length > 0 &&
          project.title !== "Reel" &&
          project.title !== "ReelMobile"
        );
      }

      if (activeBrand && project.brand !== activeBrand) return false;
      return project.title !== "Reel" && project.title !== "ReelMobile";
    });

    // Apply sorting based on sortOrder
    filtered.sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [projects, activeBrand, searchTerm, sortOrder]);

  const handleVideoClick = (project) => {
    setSelectedVideo(project);
    setIsBModalOpen(true);
  };

  const uniqueBrands = Array.from(
    new Set(
      projects
        .filter(
          (project) =>
            project.title !== "Reel" && project.title !== "ReelMobile"
        )
        .map((project) => project.brand)
    )
  ).sort();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  const handleMouseEnter = (e) => {
    const videoElement = e.currentTarget.querySelector("video");

    if (videoElement.readyState >= 2) {
      setTimeout(() => {
        videoElement.play().catch((error) => {
          console.error("Error attempting to play the video:", error);
        });
      }, 100);
    }
  };

  const handleMouseLeave = (e) => {
    const videoElement = e.currentTarget.querySelector("video");
    setTimeout(() => {
      videoElement.pause();
    }, 100);
  };

  return (
    <div className="w-full flex flex-col justify-end bg-black text-white min-h-screen relative">
      <div className="fixed top-0 w-full z-10">
        <Nav />
      </div>
      <div className="w-full flex flex-col h-full fixed top-[8%] lg:top-[14%] lg:max-h-[94%] max-h-[92%] p-4 md:p-16 overflow-auto">
        <div className="md:flex flex-row hidden items-center justify-between w-full mt-6 flex-wrap">
          <div className="flex flex-row gap-6 items-center">
            <button
              className={`uppercase tracking-widest flex items-center justify-center text-xs group ${
                !activeBrand
                  ? "bg-transparent border-[#F0A09D] border-b text-[#FEF271] outline-white transition-all duration-200"
                  : ""
              }`}
              onClick={() => toggleBrand(null)}
            >
              All
            </button>
            {uniqueBrands.slice(0, 6).map((brand, index) => (
              <button
                key={index}
                className={`uppercase tracking-widest hover:font-medium flex items-center justify-center text-xs group ${
                  activeBrand === brand
                    ? "bg-transparent text-[#F0A09D border-b border-[#FEF271] outline-white transition-all duration-200"
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
                  className="text- hover:underline text-theme-yellow py-1 font-semibold uppercase text-xs text-left"
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                    setShowMore(!showMore);
                  }}
                >
                  {showMore ? (
                    <p className="flex items-center">
                      Show Less
                      <BsArrowUp />
                    </p>
                  ) : (
                    <p className="flex items-center">
                      Show More
                      <BsArrowDown />
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
                      className="absolute bg-black border overflow-y-scroll glass h-max w-[12rem] max-h-56 bg-opacity text-white right-0 top-12 rounded-xl p-2 shadow-lg z-20"
                    >
                      {uniqueBrands.slice(6).map((brand, index) => (
                        <motion.button
                          variants={itemVariants}
                          key={index}
                          className={`block w-full uppercase text-xs font-light tracking-widest text-left px-4 hover:font-medium py-2 ${
                            activeBrand === brand
                              ? "text-theme-yellow"
                              : "text-white"
                          }`}
                          onClick={() => {
                            toggleBrand(brand);
                            setDropdownOpen(false);
                            setShowMore(!showMore);
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
              <div className="relative">
              <button
                className="text-theme-yellow hover:underline py-1 font-semibold uppercase tracking-widest text-xs flex items-center gap-1"
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              >
                <BiSort className="text-md" />
                Sort
              </button>
              <AnimatePresence>
                {sortDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bg-black border border-white text-white right-0 top-8 w-[12rem] glass rounded-lg shadow-lg z-20"
                  >
                    <button
                      className={`block w-full text-xs font-light tracking-widest text-left px-4 py-2 ${
                        sortOrder === "newest"
                          ? "text-theme-yellow"
                          : "text-white"
                      }`}
                      onClick={() => {
                        setSortOrder("newest");
                        setSortDropdownOpen(false);
                      }}
                    >
                      Newest
                    </button>
                    <button
                      className={`block w-full text-xs font-light tracking-widest text-left px-4 py-2 ${
                        sortOrder === "oldest"
                          ? "text-theme-yellow"
                          : "text-white"
                      }`}
                      onClick={() => {
                        setSortOrder("oldest");
                        setSortDropdownOpen(false);
                      }}
                    >
                      Oldest
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
          

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative group md:w-[200px]"
              ref={searchRef}
            >
              <input
                type="text"
                placeholder="SEARCH"
                className="input text-left w-full bg-black group-focus:border-[#F0A09D] border-white rounded-full text-white uppercase tracking-widest font-semibold text-xs input-sm"
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className="absolute group-focus:text-[#F0A09D] right-2 top-2 text-xl">
                <MdSearch />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className="flex mt-4 md:hidden items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="gap-2 flex items-center relative">
              <button
                className="bg-black uppercase text-white text-sm px-4 py-1 flex items-center gap-1 rounded-full border border-white text-left max-w-[120px] truncate"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <p className="text-white text-base">
                  <BiFilter />
                </p>
                <span className="truncate">{activeBrand || "ALL"}</span>
              </button>

              {dropdownOpen && (
                <div 
                className="absolute overflow-y-scroll h-[50vh] bg-black border border-white text-white left-0 top-12 w-[12rem] glass rounded-lg shadow-lg z-20">
                  <button
                    className="block w-full text-xs font-light tracking-widest text-left px-4 py-2"
                    onClick={() => {
                      toggleBrand(null);
                      setDropdownOpen(false);
                      setShowMore(!showMore);
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
                        setShowMore(!showMore);
                      }}
                    >
                      {brand && brand}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="bg-black text-white text-sm px-4 py-1 flex items-center gap-1 rounded-full border border-white text-left"
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              >
                <BiSort className="text-md" />
                Sort
              </button>
              <AnimatePresence>
                {sortDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                className="absolute overflow-y-scroll  bg-black border border-white text-white left-0 top-12 w-[12rem] glass rounded-lg shadow-lg z-20">
                  
                    <button
                      className={`block w-full text-xs font-light tracking-widest text-left px-4 py-2 ${
                        sortOrder === "newest"
                          ? "text-theme-yellow"
                          : "text-white"
                      }`}
                      onClick={() => {
                        setSortOrder("newest");
                        setSortDropdownOpen(false);
                      }}
                    >
                      Newest
                    </button>
                    <button
                      className={`block w-full text-xs font-light tracking-widest text-left px-4 py-2 ${
                        sortOrder === "oldest"
                          ? "text-theme-yellow"
                          : "text-white"
                      }`}
                      onClick={() => {
                        setSortOrder("oldest");
                        setSortDropdownOpen(false);
                      }}
                    >
                      Oldest
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="SEARCH"
              className="input w-full bg-black border-white rounded-full text-white uppercase tracking-widest font-semibold text-xs text-left focus:border-white input-xs"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute right-2 top-1 text-lg">
              <MdSearch />
            </div>
          </div>
        </div>

        {/* Desktop Video Grid */}
        <div
          ref={videoContainerRef}
          className="mb-8 mt-4 md:py-4 hidden bg-black overflow-y-auto h-full lg:grid grid-cols-4 gap-4"
        >
          {filteredVideos.map((project) => (
            <motion.div
              key={project.indexId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleVideoClick(project)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-video order-first rounded-lg group w-full"
            >
              <video
                preload="auto"
                controls={false}
                muted
                playsInline
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                onError={(e) => {
                  console.error("Error loading video:", e.currentTarget.error);
                }}
              >
                <source
                  src={`https://cms.suncitystudios.in/${project.teaser}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div
                className="absolute inset-0 text-center flex items-center justify-center"
                onClick={(e) => {
                  handleVideoClick(project);
                }}
              >
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 mt-4 flex gap-4 bg-gradient-to-t from-black/50 to-transparent items-end justify-center p-2 w-full"
                >
                  <div className="w-full gap-2 text-white text-left flex items-center">
                    <h1 className="uppercase text-xs font-Armavir">
                      {project.brand}
                    </h1>
                    <h1>|</h1>
                    <h1 className="text-xs font-medium">{project.title}</h1>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Video Grid */}
        <div
          ref={videoContainerRef}
          className={`my-8 md:py-4 lg:hidden bg-black overflow-y-auto overflow-x-hidden grid grid-cols-1 gap-4 justify-items-center ${
            filteredVideos.length > 2 ? "h-full" : "h-max"
          }`}
        >
          {filteredVideos.map((project) => (
            <motion.div
              key={project.indexId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
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
                <source
                  src={`https://cms.suncitystudios.in/${project.teaser}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div
                className="absolute inset-0 flex items-center justify-center"
                onClick={() => handleVideoClick(project)}
              >
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 mt-4 flex gap-4 bg-gradient-to-t from-black/50 to-transparent items-end justify-center p-2 w-full"
                >
                  <div className="w-full gap-2 text-white flex items-center">
                    <h1 className="uppercase font-Armavir">
                      <span className="text-sm">{project.brand}</span>
                    </h1>
                    <h1>|</h1>
                    <h1 className="text-xs font-medium">{project.title}</h1>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-between font-light px-4 md:px-12 pb-2 text-sm mx-0 fixed bottom-0 left-0 w-full right-0 items-center">
        <h1>2024. Copyright. All rights reserved.</h1>
        <h1>Sun City Studios</h1>
      </div>

      {/* Fullscreen Modal */}
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
                  showControls: true,
                }
              : {}
          }
        />
      )}
    </div>
  );
}
