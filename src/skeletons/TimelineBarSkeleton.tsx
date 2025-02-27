import React from 'react'

export const TimelineBarSkeleton = () => {
  return (
    <div className='hidden lg:flex flex-col items-center justify-start  h-[600px] gap-6 w-full lg:w-[30%]'>
      <p className=' text-center text-xl font-delicious-small-caps '>Cargando fechas</p>
      <div
            style={{ height: `450px` }}
            className=" w-3 bg-gray-400 rounded-lg"
          ></div>
    </div>
  )
}
