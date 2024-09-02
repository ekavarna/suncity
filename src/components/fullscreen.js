import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { motion } from 'framer-motion';
import IFramePlayer from './iframePlayer';

const FullscreenModal = ({ isOpen, onClose, videoProps }) => {
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
  if (!isOpen) return null;
  

  return ReactDOM.createPortal(
    
    <motion.div
      className="fixed inset-0 z-[104] flex items-center justify-center bg-[#231F20]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-full flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent any click event bubbling
            onClose();
          }}
          className="absolute z-[106] top-4 right-4 text-white text-3xl"
        >
          <AiOutlineClose />
        </button>
        {videoProps.url && <IFramePlayer url={videoProps.url} />}
      </div>
    </motion.div>,
    document.body
  );
};

export default FullscreenModal;
