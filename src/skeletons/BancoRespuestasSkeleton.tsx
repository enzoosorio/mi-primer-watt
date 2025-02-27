import React from 'react'
import { MoonLoader } from 'react-spinners'

export const BancoRespuestasSkeleton = () => {
  return (
    <div className='w-[75%] min-h-[442px] bg-gray/10 p-4 rounded-xl flex flex-col gap-8 items-center justify-center font-delicious-small-caps text-4xl'>
        Cargando...
        <MoonLoader color="#000" loading={true} />
  </div>
  )
}
