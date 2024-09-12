import React from "react";

const IFramePlayer = ({  autoplay }) => {
  const url = '6pGmszqWqns'
  if (!url) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        Video URL is missing
      </div>
    );
  }

  return (
    <div className="relative w-full h-full m-auto">
      <iframe
        src={`https://www.youtube.com/embed/${url}?autoplay=${autoplay ? 1 : 0}&mute=${autoplay ? 1 : 0}&rel=0&modestbranding=1&showinfo=0`}
        
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Player"
        aria-label="YouTube Video Player"
      ></iframe>
    </div>
  );
};

export default IFramePlayer;
