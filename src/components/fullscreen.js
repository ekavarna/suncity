import React from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import FPlayer from './Fplayer';

const FullscreenModal = ({ isOpen, onClose, videoProps }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[99] flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <motion.div
            className="relative w-full h-full flex items-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <button
              onClick={onClose}
              className="absolute z-10 top-4 right-4 text-white text-3xl"
            >
              <AiOutlineClose />
            </button>
            <FPlayer {...videoProps} isActive={true} showControls={true} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default FullscreenModal;
