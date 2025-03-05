"use client"
import { useIsVisible3 } from '@/src/hooks/useIsVisible3'
import { BentoPhotosResponse, getBentoPhotos } from '@/src/lib/bento/getBentoPhotos'
import { IBentoPhotos } from '@/src/schemas/mongooseSchemas/BentoPhotos'
import Image from 'next/image'
import React, { useEffect, useState, useTransition } from 'react'

interface BentoPhotosComponentProps {
  photos: IBentoPhotos[]
  totalPhotos: number
  category: string | null
}

export const LIMIT_IMAGES = 10
export const BentoPhotosComponent = ({photos, totalPhotos, category} : BentoPhotosComponentProps) => {

const [photosState, setPhotosState] = useState<IBentoPhotos[]>(photos)
const [photosLength, setPhotosLength] = useState(photos.length)
const [remainingImages, setRemainingImages] = useState(totalPhotos); 
const [totalPhotosState, setTotalPhotosState] = useState(totalPhotos)
const { refs, visibleItems } = useIsVisible3(0.6)
const [shownIds, setShownIds] = useState<string[]>([])
const [isPending, startTransition] = useTransition()

  const loadMorePhotos = (categoryOpt : string | null = null) => {
    startTransition(async() => {
      
      const limitImages = remainingImages > LIMIT_IMAGES ? LIMIT_IMAGES : remainingImages

      const newPhotos = await getBentoPhotos(shownIds, limitImages, categoryOpt);
      
      if (!("error" in newPhotos)) {
        setPhotosState((prevPhotos) => [...prevPhotos, ...newPhotos.photos]);
        setShownIds((prevIds) => [...prevIds, ...newPhotos.photos.map((p) => p._id)]);
        setPhotosLength((prevLength) => prevLength + newPhotos.photos.length);

        const remainImages = remainingImages - newPhotos.photos.length
        setRemainingImages(remainImages)
      }
    })
  };

  const initPhotosWithCategory = async({category} : {category : string | null}) => {
    const res : BentoPhotosResponse | {error: string} = await getBentoPhotos([], 10, category)
    if("error" in res){
      return
    }
    setPhotosState(res.photos)
    setPhotosLength(res.photos.length)
    setTotalPhotosState(res.total)
    setRemainingImages(res.total - res.photos.length)
    setShownIds(res.photos.map((p) => p._id))
  
  }

useEffect(() => {
    refs.current = refs.current.slice(0, photosState.length);
  }, [photosState, refs]);

  useEffect(() =>{
    initPhotosWithCategory({category})
    
  }, [category])

  return (
   <>
    <div className="gridContainer w-full bg-blue-600/10">
            {photosState.map((photo, index) => {
             
          return (
            <div
              ref={(el) => { refs.current[index] = el }}
              key={index}
              className={`relative w-full transition-all duration-500 ease-in-out 
                ${photo.aspectRatio === "Square" ? "Square" 
                  : photo.aspectRatio === "Wide" ? "Wide" 
                  : "Tall"} 
                ${visibleItems.has(index) ? "scale-100 opacity-100" : "scale-90 opacity-50"} 
                flex items-center justify-center rounded-xl overflow-hidden`}
            >
              <Image
                src={photo.src.split("?")[0]}
                alt={photo.alt}
                className="w-full h-full object-cover"
                width={400}
                height={500}
              />
            </div>
          );
        })}
        </div>
        {remainingImages > 0 ? (
      <div 
        onClick={() => loadMorePhotos(category)}
        className='relative w-max h-max group'
      >
        <div 
          className='absolute inset-1 bg-amber-200 -z-10 blur-lg group-hover:blur-sm transition-all duration-300 rounded-full '></div>
        <h3 
          className='font-delicious-small-caps cursor-pointer group-hover:text-sky-600 transition-colors text-2xl text-center text-primary-blue underline font-bold'>
          {isPending ? (
            <span className='no-underline'>Cargando fotos...</span>
          ) : (
            <>
              <span>Cargar más fotos </span>
              <span className='no-underline'> ({photosLength} / {totalPhotosState})</span>
            </>
          )}
        </h3>
      </div>
    ) : (
      <div 
      className='relative w-max h-max group'
    >
      <div 
        className='absolute inset-1 bg-amber-200 -z-10 blur-sm  rounded-full '></div>
      <h3 
        className='font-delicious-small-caps text-sky-600 text-2xl text-center font-bold'>
          Todas las fotos cargadas :&#41;
            <span className='no-underline'> ({photosLength} / {totalPhotosState})</span>
          
      </h3>
    </div>
    )}
   </>
  )
}
