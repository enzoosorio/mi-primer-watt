'use client'
import {useState, useEffect} from 'react'
import { photosMap, photosSliderMessages } from '@/src/utils/photosSliderMock'
import Image from 'next/image';

export const HorizontalSlider = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [photoWidth, setPhotoWidth] = useState(0);


    const prevAlbum = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? photosMap.length - 1 : prevIndex - 1
      );
    };

    const nextAlbum = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photosMap.length);
    };


    useEffect(() => {
      const updateWidth = () => {
        // setIsMobile(window.innerWidth <= 768);
        setPhotoWidth(window.innerWidth <= 768 ? 420 : 500);
      };
      updateWidth();
      window.addEventListener("resize", updateWidth);
    
      return () => window.removeEventListener("resize", updateWidth);
    }, []);

  return (
    <section
  className="no-scrollbar w-full flex flex-row items-center justify-center gap-12 mt-56 pb-40 welcomeToMain"
>
<div className="no-scrollbar relative flex items-center justify-center gap-24 w-full md:w-max my-20">
        {/* Contenedor principal que aloja todos los álb  umes */}
        <p className="block absolute -top-20 text-3xl lg:hidden left-1/2 -translate-x-1/2 font-delicious-small-caps text-center">Desliza!</p>
        <div className={"no-scrollbar w-[856px] md:w-[1016px] mx-auto flex overflow-x-auto lg:overflow-hidden"}>
          <div
            className="no-scrollbar  flex transition-transform duration-400 ease-in-out lg:w-auto gap-x-6  "
            style={{ transform: `translateX(-${currentIndex * 1040 }px)` }}
          >
            {photosMap.map((album, index) => (
              <div key={index} className="relative flex flex-wrap w-[856px] md:w-[1016px] justify-center gap-4   ">
                <p className="text-5xl w-max font-bold absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-70%]">
                  {photosSliderMessages[index]}
                </p>
                {album.map((photo, photoIndex) => (
                  <Image
                    key={photoIndex}
                    src={photo.src}
                    alt={photo.alt}
                    className={`object-cover h-[300px]  md:w-auto md:h-auto  ${ photoIndex === album.length - 2 || photoIndex === album.length - 1 ? "z-20" : ""}`}
                    style={{ width : `${photoWidth}px`}}
                    width={photo.width}
                    height={photo.height}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

      <div className="absolute hidden lg:flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-row items-center lg:justify-center lg:gap-[930px] xl:gap-[1050px] w-[125%] transition-all ">
      <button
          onClick={prevAlbum}
          className={`w-max rounded-full ${
            currentIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-yellow hover:bg-rose cursor-pointer"
          } px-2 py-6 transition-all duration-300`}
          disabled={currentIndex === 0}
        >
          <Image src="/svgs/Chevron Down.svg" alt="" width={32} height={32} className={'rotate-90'} />
        </button>
        <button
          onClick={nextAlbum}
          className={`w-max  rounded-full ${
            currentIndex === photosMap.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-yellow hover:bg-rose cursor-pointer"
          } px-2 py-6 transition-all duration-300`}
          disabled={currentIndex === photosMap.length - 1}
        >
          <Image src="/svgs/Chevron Down.svg" alt="" width={32} height={32} className={'-rotate-90'} />
        </button>
      </div>
      </div>
</section>
  )
}
