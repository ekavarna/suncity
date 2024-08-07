import React, { useEffect, useRef, useState } from "react";
import { BiPlay, BiPause } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { IoVolumeMute } from "react-icons/io5";
import { IoMdVolumeHigh } from "react-icons/io";

const FPlayer = ({ url, title, description, logo, isActive, showControls }) => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const container = useRef(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPlaying(false);
        video.pause();
      } else {
        if (isActive) {
          setIsPlaying(true);
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error("Failed to play video:", error);
              // Handle error or show paused UI
            });
          }
        }
      }
    };

    video.addEventListener("timeupdate", updateTime);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive]);

  useEffect(() => {
    const video = videoRef.current;
    if (isActive && !isPlaying) {
      setIsPlaying(true);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Failed to play video:", error);
          // Handle error or show paused UI
        });
      }
    } else if (!isActive && isPlaying) {
      setIsPlaying(false);
      video.pause();
    }
  }, [isActive]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Failed to play video:", error);
          // Handle error or show paused UI
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    const video = videoRef.current;
    setMuted(!muted);
    video.muted = !muted;
  };

  return (
    <div
      ref={container}
      className={`relative h-screen md:opacity-100 top-0 w-full`}
    >


      <div className="flex fp-bg h-full">
        <div className="relative w-full h-full overflow-hidden">
          <div className="w-full h-full">
            <video
              className="w-full object-cover rounded-md md:rounded-none h-full"
              ref={videoRef}
              muted={muted}
              autoPlay={isActive}
              onContextMenu={(e) => e.preventDefault()}
              loop
              preload="auto"
              src={url ? url : ""}
            ></video>
          </div>
        </div>
      </div>

      {/* Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-4 flex gap-4 items-center px-2 md:px-8 w-full"
          >
            {/* <div className="w-max md:block hidden relative">
              <AnimatePresence>
                {showControl && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 absolute text-justify bottom-16 space-y-4 bg-black/50 w-max outline outline-white flex flex-col text-white rounded-box max-w-xs text-xs"
                  >
                    {description ? description : 'No summary found'}
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setShowControl(!showControl)}
                className="btn group uppercase bg-transparent text-white font-light w-max text-xs hover:bg-red-600 outline-white outline-1 outline rounded-full border-none btn-sm"
              >
                <MdFiberManualRecord className="text-red-500 group-hover:text-white text-xl" />{" "}
                Summary
              </button>
            </div> */}
            <div className="z-10 w-[80%] mx-auto  text-white ">
              <p className=" font-light w-full text-center text-sm">{title!== "Reel" && title}</p>
              <div className="text-xl flex items-center gap-2 w-full ">
                <button className="text-3xl" onClick={handlePlayPause}>
                  {isPlaying ? <BiPause /> : <BiPlay />}
                </button>
                <input
                  type="range"
                  className="range-input"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={(e) => {
                    videoRef.current.currentTime = e.target.value;
                  }}
                />
                <button className="text-2xl text-white" onClick={handleMute}>
                  {muted ? <IoVolumeMute /> : <IoMdVolumeHigh />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FPlayer;