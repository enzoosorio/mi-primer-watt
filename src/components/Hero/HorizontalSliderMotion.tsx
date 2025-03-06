"use client"
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react'
import { photosMap, photosSliderMessages } from "@/src/utils/photosSliderMock";
import Image from 'next/image';
export const HorizontalSliderMotion = () => {

    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
      });
      const transform = useTransform(scrollYProgress, [0, 1], ["5%", "-95%"]);
  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] my-40"
    >
      {/* Contenedor sticky que mantiene el motion div en pantalla */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          initial={{ x: "5%" }}
          style={{ x: transform }}
          className="flex gap-4"
        >
          {photosMap.map((album, index) => (
                      <div
                        key={index}
                        className="relative grid grid-cols-2 grid-rows-2 gap-4 items-center justify-center bg-sky-100/50 rounded-xl p-4 min-w-[800px]"
                      >
                        <p className="text-5xl w-max font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4">
                          {photosSliderMessages[index]}
                        </p>
                        {album.map((photo, photoIndex) => (
                          <Image
                            key={photoIndex}
                            src={photo.src}
                            alt={photo.alt}
                            className={`object-contain max-h-[300px] col-span-1 row-span-1  bg-black/15 rounded-xl ${
                              photoIndex >= album.length - 2 ? "z-20" : ""
                            }`}
                            width={photo.width}
                            height={photo.height}
                          />
                        ))}
                      </div>
                    ))}
        </motion.div>
      </div>
    </section>
  )
}
