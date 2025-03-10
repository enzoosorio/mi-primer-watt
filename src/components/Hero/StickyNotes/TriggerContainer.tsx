"use client"
import useIsVisible2 from '@/src/hooks/useIsVisible2';
import React from 'react'
import {AnimatePresence} from 'framer-motion'
import { Modal } from './Modal';

interface TriggerContainerProps {
    title: string;
    bgColor: string;
    titleForDialog: string;
    contentForDialog: string;
    showDialog: string;
    closeDialog: () => void;
    openDialog: (id: string) => void;
    stickyNoteId: string;
  }

export const TriggerContainer = ({ title, bgColor, titleForDialog, contentForDialog, showDialog, closeDialog, openDialog, stickyNoteId }: TriggerContainerProps) => {
    
    const { ref, isVisible } = useIsVisible2(0.6);
  
    return (
        <React.Fragment key={stickyNoteId}>
            <AnimatePresence
            initial={false}
            onExitComplete={() => null}
            >
            <div
        ref={ref}
        // initial="start"
        // animate={showDialog === stickyNoteId ? "active" : "end"}
        // exit="end"
        // variants={variantsForTrigger}
        onClick={() => showDialog === stickyNoteId ? closeDialog() : openDialog(stickyNoteId)}
        className={`w-[250px] h-[160px] md:w-[330px] md:h-[180px] 
            cursor-pointer flex flex-row items-center justify-center rounded-md ${bgColor}
            ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-50"} transition-all duration-300
            `}
        >
             <p className="text-[2.5rem] font-bold font-roboto">{title}</p> 
            
        </div>
        </AnimatePresence>
        <AnimatePresence 
         initial={false}
         onExitComplete={() => null}
        >
            {showDialog === stickyNoteId && (
                 <Modal titleForDialog={titleForDialog} title={title} contentForDialog={contentForDialog} showDialog={showDialog} stickyNoteId={stickyNoteId} handleClose={closeDialog} bgColor={bgColor}/>
                 
            )}
        </AnimatePresence>
        </React.Fragment>
  )
}
