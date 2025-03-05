import { IBentoPhotos } from '@/src/schemas/mongooseSchemas/BentoPhotos'
import { bentoPhotos } from '@/src/utils/bentoPhotos'

import Image from 'next/image'
import React from 'react'

interface BentoPhotosProps{
  photos : IBentoPhotos[]
}
export const Bento = ({photos} : BentoPhotosProps) => {

  const bentoPhotoss : IBentoPhotos[] = photos ?? bentoPhotos

  return (
    <section className="w-[95%] mx-auto flex flex-col items-center justify-center gap-12 my-12 welcomeToMain">
        <div className="gridContainer w-full bg-blue-600/10">
            {bentoPhotoss.map((photo, index) => (
                    <div 
                    key={index}
                    className={`flex flex-col items-center justify-center gap-6 rounded-xl aspect-auto h-full`}>
                        <Image src={photo.src.split("?")[0]} 
                        alt={photo.alt}
                        className={`rounded-xl object-cover object-center w-full h-full max-w-full align-middle inline-block
                        `} 
                        width={400} 
                        height={400} />
                    </div>
                    
                ))}
        </div>
    </section>
  )
}
