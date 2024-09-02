import React from "react";

const IFramePlayer = ({ url }) => {
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
        src={`https://player.vimeo.com/video/${url}?badge=0&autopause=0&player_id=0&app_id=58479`}
        className="w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        title="Vimeo Player"
        aria-label="Vimeo Video Player"
      ></iframe>
    </div>
  );
};

export default IFramePlayer;
