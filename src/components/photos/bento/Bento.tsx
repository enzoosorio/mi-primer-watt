import { bentoPhotos } from '@/src/utils/bentoPhotos'
import Image from 'next/image'
import React from 'react'

export const Bento = () => {
  return (
    <section className="w-[95%] mx-auto flex flex-col items-center justify-center gap-12 my-12 welcomeToMain">
        <div className="gridContainer w-full bg-blue-600/10">
            {bentoPhotos.map((photo, index) => (
                    <div 
                    key={index}
                    className={`flex flex-col items-center justify-center gap-6 rounded-xl ${photo.aspectRatio}  h-full`}>
                        <Image src={photo.src} alt={photo.alt} 
                        className={`rounded-xl object-cover object-center w-full h-full max-w-full align-middle inline-block
                        `} 
                        width={photo.width} 
                        height={photo.height} />
                    </div>
                    
                ))}
        </div>
    </section>
  )
}
