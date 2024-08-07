import React from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from "react-icons/ai";
import FPlayer from './Fplayer';

const FullscreenModal = ({ isOpen, onClose, videoProps }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0   z-[99] flex items-center justify-center bg-black ">
      <div className="relative w-full h-full flex items-center">
        <button
          onClick={onClose}
          className="absolute z-10 top-4 right-4 text-white text-3xl"
        >
          <AiOutlineClose />
        </button>
        <FPlayer {...videoProps} isActive={true} showControls={true} />
      </div>
    </div>,
    document.body
  );
};

export default FullscreenModal;
