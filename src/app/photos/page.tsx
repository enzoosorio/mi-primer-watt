import { MainPhotos } from '@/src/components/photos/MainPhotos'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Photos",
  description: "En esta sección puedes encontrar las fotos del viaje a Montana, teniendo fotos de diferentes lugares y con diferentes estilos de vida. ¡Disfruta de la experiencia!",
};

export default function PhotosPage(){
  return (
    <section
    className="w-full flex flex-col items-center justify-center gap-12 mt-12 welcomeToMain"
  >
  <div className="flex flex-col items-center justify-center gap-6 w-[95%] mx-auto">
    <h1 className="font-bold text-5xl font-roboto text-center">Photos</h1>
    <p className="font-nunito text-center">
      Disfruta de las fotos de los viajes que hemos realizado en Montana, en
      diferentes lugares y con diferentes estilos de vida. ¡Disfruta de la
      experiencia!
    </p>
  </div>
  <MainPhotos/>
</section>
  )
}
