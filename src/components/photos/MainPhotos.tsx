import React from 'react'

export const MainPhotos = () => {
  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-center w-[95%] lg:w-[80%] mx-auto h-[550px]"
    >
      <a
        id="comparative"
        href="/photos/comparative"
        className="text-lg w-full h-full font-semibold rounded-tl-xl rounded-tr-xl lg:rounded-tl-xl lg:rounded-bl-xl lg:rounded-tr-none comparative-photo-image hover:bg-center border border-gray-400 hover:shadow-xl text-black transition-shadow"
      >
        <div className="w-[85%] mx-auto flex flex-col items-end h-full justify-center gap-6 ">
          <h3 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-nunito text-center w-full lg:text-right ">Comparative</h3>
        <p className="text-center lg:text-right text-lg lg:text-xl text-pretty  mx-auto lg:mx-0 lg:w-[80%]">
          Compara las imágenes de diferentes lugares, tomadas por diferentes
          celulares!
        </p>
        </div>
      </a>
      <a
        href="/photos/bento"
        id="bento"
        className="text-lg w-full h-full font-semibold rounded-bl-xl rounded-br-xl lg:rounded-tr-xl lg:rounded-br-xl lg:rounded-bl-none border bento-cartoon hover:bg-center border-gray-400  hover:shadow-xl text-black transition-shadow flex flex-col items-start justify-center gap-6 "
      >
      <div className="w-[85%] mx-auto flex flex-col items-center lg:items-start h-full justify-center gap-6 ">
        <h3 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-nunito text-center">Bento</h3>
        <p className="text-center lg:text-left text-xl text-pretty ">
          Visualiza las fotos en un formato diferente; imágenes por doquier sin
          un orden en específico.
        </p>
       </div>
      </a>
    </div>
  )
}
