"use client"

import { IContentAlbumWithId } from '@/src/lib/timeline/getContentByAlbum';
import Image from 'next/image';
import React, {  useEffect, useRef, useState } from 'react'


interface ContentTimelineProps {
    contents: IContentAlbumWithId[];
}
export const ContentTimeline = ({ contents }: ContentTimelineProps) => {
    const [currentContent, setCurrentContent] = useState<IContentAlbumWithId[]>([])
    const [cardContentOpen, setCardContentOpen] = useState<number>(-1);
    const [isMobile, setIsMobile] = useState(true);
    const cardContentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        setCurrentContent(contents)
    }, [contents])

    useEffect(() => {
        function handleResize() {
          setIsMobile(window.innerWidth < 1024);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
      useEffect(() => {
        setIsMobile(window.innerWidth < 1024);
      }, []);

  return (
    <>
    <div className={`${cardContentOpen !== -1 ? "block" : "hidden"} absolute inset-0  bg-gray/35 z-30`}></div>
    
    <div className="flex flex-col items-center justify-start gap-12 w-full lg:w-[70%] shadow-xl bg-textura h-[700px] rounded-xl overflow-y-auto overflow-x-hidden py-5">
        {currentContent && currentContent.map((cardContent, indexCard) => (
          <div className="flex flex-row-reverse odd:flex-row items-center justify-start gap-4 lg:gap-16 w-[98%] h-full px-2 py-8 " key={indexCard}>
            <div 
            onClick={isMobile ? () => {
              setCardContentOpen(indexCard)
              document.body.style.overflow = "hidden"
            } : undefined}
            className={`relative flex flex-col ${indexCard % 2 === 0 ? "-rotate-2" : "rotate-2"} hover:scale-110 lg:hover:scale-100 transition-transform cursor-pointer lg:cursor-auto items-center justify-center gap-6 h-max py-4 lg:py-8 rounded-sm bg-white p-3 min-w-max mx-auto lg:mx-0`}>
              
              {/* // TODO : arreglar el problema de que el src no se carga */}
              <Image src={cardContent.mediaArr[indexCard].src.split("?")[0]} alt={cardContent.mediaArr[indexCard].alt} width={300} height={400} className="rounded-xl max-w-[250px] lg:max-w-none  object-cover object-center " />
              <p className="text-center font-delicious-small-caps text-lg lg:text-xl">{cardContent.title}</p>
            </div>
            <p className={`hidden lg:block textToTruncate text-pretty  w-auto ${indexCard % 2 === 0 ? "mr-1" : "ml-4"} text-lg font-nunito`}>
              {cardContent.description}
              
            </p>
            <div
            ref={cardContentRef}
            className={`absolute ${cardContentOpen === indexCard ? "left-0 opacity-100" : "left-[200%] opacity-0"} inset-40 mx-auto bg-textura z-40 p-4 rounded-lg shadow-xl w-full flex flex-col gap-2`}
          >
            <button 
            className="text-2xl cursor-pointer mb-6"
            onClick={() => {
              setCardContentOpen(-1)
              document.body.style.overflow = "auto"
            }}>
              X
            </button>
            <h3 className="font-delicious-small-caps text-2xl font-bold">Contexto:</h3>
            <p>{cardContent.description}</p>
            </div>
          </div>
        ))}
      </div>
      </>
  )
}
