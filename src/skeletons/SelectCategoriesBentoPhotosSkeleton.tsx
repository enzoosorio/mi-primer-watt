import React from 'react'

export const SelectCategoriesBentoPhotosSkeleton = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 w-full'>
            <p className='font-bold font-nunito text-lg'>Cargando Categorias...</p>
            <div className='flex flex-col items-center justify-center w-[50ch] h-10 bg-gray-300 rounded-lg'>
            </div>
    </div>
  )
}
