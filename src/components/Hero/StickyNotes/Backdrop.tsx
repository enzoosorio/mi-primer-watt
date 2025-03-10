import React from 'react'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom';

interface BackdropProps {
 onclick?: () => void;
}
export const Backdrop = ({ onclick }: BackdropProps) => {

  const sectionStickyNotes = document.querySelector(".stickyNotesSection");

  if (!sectionStickyNotes) {
    return null;
  }

  return createPortal(
    <motion.div
      className=" fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center"
      onClick={onclick}
      initial={{ opacity: 0,
        z : -10,
       }}
      animate={{ opacity: 1,
        z : 100000,
       }}
      exit={{ opacity: 0,
        z : -10,
       }}
    >
      
    </motion.div>,
    sectionStickyNotes 
  );
};