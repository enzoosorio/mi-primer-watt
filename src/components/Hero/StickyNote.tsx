"use client";

import useIsVisible2 from '@/src/hooks/useIsVisible2';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface StickyNotesProps {
    title: string;
    bgColor?: string;
    textColor?: string;
    idStickyNote?: string;
    titleForDialog?: string;
    contentForDialog?: string;
  }

export const StickyNote = ({
    title,
    bgColor,
    textColor,
    idStickyNote,
    titleForDialog,
    contentForDialog,
  }: StickyNotesProps) => {
  
    const [showDialog, setShowDialog] = useState(false);
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    const { ref, isVisible } = useIsVisible2(0.6);

    const handleDialog = () => {
     const dialog = dialogRef.current
     if (dialog) {
       if(showDialog){
        document.body.style.overflow = 'auto'
        dialog.close()
        setShowDialog(false)
       }
         else{
          document.body.style.overflow = 'hidden'
          dialog.showModal()
          setShowDialog(true)
        }
    }
    }
    

    useEffect(() => {
      const handleClickOutsideDialog = (event: MouseEvent) => {
          const dialog = dialogRef.current;
          if (dialog && !dialog.contains(event.target as Node) && showDialog) {
              dialog.close();
              setShowDialog(false);
          }
      };
      document.addEventListener('click', handleClickOutsideDialog);
      return () => {
          document.removeEventListener('click', handleClickOutsideDialog);
      };
  }, [showDialog]);

    return (
   <React.Fragment key={idStickyNote}>
    <div
    ref={ref}
    id={idStickyNote}
    onClick={handleDialog}
  className={`w-[250px] h-[160px] md:w-[330px] md:h-[180px] cursor-pointer flex flex-row items-center justify-center rounded-md ${bgColor} ${textColor} 
  stickyNote ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-50"} transition-all duration-300`}
  data-dialog={`dialog-${idStickyNote}`}
>
  <p className="text-[2.5rem] font-bold font-roboto">{title}</p>
</div>

<dialog 
  ref={dialogRef}
  id={`dialog-${idStickyNote}`} 
  className={`sticky-dialog font-nunito fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${bgColor} p-3 rounded-lg shadow-lg min-w-[95%] sm:min-w-[400px] lg:min-w-[600px] min-h-max lg:min-h-[450px] pb-8 `}
>
  <nav 
  className="flex flex-row font-delicious-small-caps items-center justify-between border-b border-gray-900 w-full pb-2"
  >
    <p className="text-lg font-semibold">{titleForDialog}</p>
    <ul className="flex flex-row items-center justify-center gap-8 ">
      <li>
        {title}
      </li>
      <li className='h-full flex flex-row items-center justify-center gap-4 rounded-lg'>
        <button className=' h-full cursor-pointer rounded-full bg-white'>
          <Image src="/svgs/start-audio.svg" alt="" className={'close-btn w-8 h-8'} width={32} height={32}/>
        </button>
      </li>
      <li>
        <button
         onClick={handleDialog}
         className="close-btn font- bg-white text-black px-4 py-2 cursor-pointer outline-none hover:font-bold transition-all rounded-lg">Cerrar</button>
      </li>
    </ul>
  </nav>
  {contentForDialog && (
    <div className="w-[98%] mx-auto mt-4 text-pretty ">
    <p className="text-lg " dangerouslySetInnerHTML={{__html: contentForDialog}}/>
  </div>
  )}
  
</dialog>
   </React.Fragment>
  )
}
