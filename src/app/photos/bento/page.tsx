import { Bento } from '@/src/components/photos/bento/Bento'
import React from 'react'
import { Metadata } from 'next'
import { getBentoPhotos } from '@/src/lib/bento/getBentoPhotos';
import { IBentoPhotos } from '@/src/schemas/mongooseSchemas/BentoPhotos';

export const metadata: Metadata = {
  title: "Bento",
  description: "Fotos en formato Bento Layout. Mira las imágenes del viaje en un formato diferente.",
};

const BentoPage = async() => {

  const bentoPhotos : IBentoPhotos[] | {error: string} = await getBentoPhotos()
  if ("error" in bentoPhotos) {
    return <p>{bentoPhotos.error}</p>;
  }

console.log({bentoPhotos})
  return (
    <Bento photos={bentoPhotos} />
  )
}

export default BentoPage