import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { fetchProjectsData } from "./dataService";

export default function Director({ isOpen, onClose }) {
  const [projects, setProjects] = useState([]);
  const [isBModalOpen, setIsBModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (project) => {
    setSelectedVideo(project);
    setIsBModalOpen(true);
  };
  useEffect(() => {
    const loadProjectsData = async () => {
      const projectsData = await fetchProjectsData();
      setProjects(projectsData);
    };

    loadProjectsData();
    return () => {};
  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed z-[100] inset-0 overflow-y-auto bg-black text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } flex items-center justify-center lg:px-24   px-4`}
    >
      <button
        className="absolute rounded-full border border-white btn btn-circle btn-xs text-xl  z-10 top-4 right-4 "
        onClick={onClose}
      >
        <IoCloseSharp />
      </button>
      <div className="h-full py-6">
        <div className="flex flex-col mx-auto md:flex-row items-center justify-center gap-8 max-w-[820px]  my-auto py-4">
          <div className="relative aspect-[3/4] w-full max-w-xs ">
            <img
              src="https://cms.suncitystudios.in/uploads/director_3253b8e772.webp"
              alt="Director Rahul Bharti  Sun City Studios"
              className="h-full w-full object-cover     rounded-xl shadow-lg"
            />
          </div>
          <div className=" basis-1/2 space-y-2 md:text-left  lg:max-w-full max-w-xs">
            <h1 className=" font-light text-theme-pink  uppercase">director</h1>
            <h1 className="font-Armavir text-2xl text-theme-yellow  uppercase">
              Rahul Bharti{" "}
            </h1>
            <div className="font-light text-left md:text-justify text-sm space-y-4 ">
              <p>
                Rahul Bharti is a seasoned director whose humour is so intelligent
                and subtle it’s practically wearing reading glasses. He has a
                filmmaking style that’s like a well-tailored suit unassuming yet
                unforgettable. His approach is modest, but don’t let that fool
                you; it packs a punch sharper than a box of witty one-liners.
                Bharti excels at taking everyday scenarios and giving them a twist
                so unique you’d think he’s got a secret deal with the universe.
              </p>
              <p>
                His films are like your favourite pair of jeans, comfortably
                relatable but with just enough flair to make everyone take a
                second look. With a keen eye for detail and an uncanny
                understanding of human quirks, he crafts stories that resonate so
                deeply you might start wondering if he’s been eavesdropping on
                your life.
              </p>
              <p>
                Over the years, he has crafted stories for brands like Make My
                Trip, Swiggy, BoAt, Shaadi.com, Center Fresh, Shark Tank, Zomato,
                Jio Cinema, Vadilal, Dunzo, PayTM, Hotstar, Pizza Hut, Winzo
                amongst others.
              </p>
            </div>
          </div>
        
        </div>
        <div className="my-8 md:py-4 h-max  bg-black  grid grid-cols-1 md:grid-cols-4 gap-4 ">
          {projects.slice(8, 16).map((project) => (
            <div
              key={project.indexId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleVideoClick(project)}
              className="relative aspect-video order-first rounded-lg  group w-full"
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
                className="absolute inset-0 text-center  flex items-center justify-center"
                onClick={(e) => {
                  handleVideoClick(project);
                }}
              >
                <div
                  className="absolute inset-0 text-center flex items-center justify-center"
                  onClick={() => handleVideoClick(project)}
                >
                  <div
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.7
                    }}
                    className="absolute inset-0  mt-4  flex gap-4 bg-gradient-to-t from-black/50 to-transparent  items-end justify-center p-2   w-full"
                  >
                    <div className="  w-full gap-2   text-white flex items-center">
                      <h1 className="uppercase text-sm font-Armavir ">
                        {project.brand}
                      </h1>
                      <h1>|</h1>
                      <h1 className="text-xs  text-left font-medium">
                        {project.title}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
