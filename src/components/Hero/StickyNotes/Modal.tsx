"use client"
import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import Image from 'next/image';

interface ModalProps {
  title: string;
 titleForDialog: string;
 contentForDialog: string;
 bgColor: string;
 showDialog: string;
 stickyNoteId: string;
 handleClose: () => void;
}

export const Modal = ({  handleClose, bgColor, title, titleForDialog, contentForDialog, showDialog, stickyNoteId }: ModalProps) => {
  
  const [show, setShow] = useState(false);

    useEffect(() => {
      const delay = () => {
        if(showDialog === stickyNoteId){
          setTimeout(() => {
            setShow(true);
          }, 1000);
        }
        else{
          setShow(false);
        }
        
      }
      delay();
    }, [showDialog, stickyNoteId]);


    const dropIn = {
        hidden: { 
            x : 0,
            y : 0,
            translateX : "0%",
            translateY : "0%",
            width : "330px",
            height : "180px",
            
            opacity: 1,
            z : -10,
            transition: { 
                duration: .1,
                type: "spring",
                damping: 100,
                stiffness: 500,  
            }
            
        },
        visible: {
            x : "50%",
            y : "50%",
            width : "70%",
            height : "60%",
            opacity: 1,
            z : 10,
            transition: { 
                duration: .8,
                type: "spring",
                damping: 10,
                stiffness: 50,  
            }
        },
        exit: {
            x : 0,
            y : 0,
            translateX : "0%",
            translateY : "0%",
            width : "330px",
            height : "180px",
            opacity: 0,
            z : -10,
            transition: { 
                duration: .1,
                type: "spring",
            }
        },
      };

    return (
        <motion.div
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-0 left-0 inset-0 w-[250px] h-[160px] md:w-[330px] md:h-[180px] rounded-lg p-4 shadow-lg ${bgColor} text-pretty z-50`}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        >
            
            {titleForDialog &&(
                <>
                {show && (
                  <nav 
                className="flex flex-row font-delicious-small-caps items-center justify-between border-b border-gray-900 w-full pb-2"
                >
                  <p className="text-lg font-semibold">{titleForDialog}</p>
                  <ul className="flex flex-row items-center justify-center gap-8 ">
                    <li>
                      {titleForDialog}
                    </li>
                    <li className='h-full flex flex-row items-center justify-center gap-4 rounded-lg'>
                      <button className=' h-full cursor-pointer rounded-full bg-white'>
                        <Image src="/svgs/start-audio.svg" alt="" className={'close-btn w-8 h-8'} width={32} height={32}/>
                      </button>
                    </li>
                    <li>
                      <button
                       onClick={handleClose}
                       className="close-btn font- bg-white text-black px-4 py-2 cursor-pointer outline-none hover:font-bold transition-all rounded-lg">Cerrar</button>
                    </li>
                  </ul>
                </nav>
                )}
                </>
            )}
            <p className={`text-[2.5rem] font-bold font-roboto text-center ${show ? "mt-0" : "mt-8" }`}>{title}</p> 
            <>
            {show && (
              <motion.div className="w-[98%] mx-auto mt-4 text-pretty ">
                <p className="text-lg " dangerouslySetInnerHTML={{__html: contentForDialog}}/>
              </motion.div>
            )}
            </>
        </motion.div>
  )
}
