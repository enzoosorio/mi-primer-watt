import { Bento } from '@/src/components/photos/bento/Bento'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Bento",
  description: "Fotos en formato Bento Layout. Mira las imágenes del viaje en un formato diferente.",
};

const BentoPage = () => {
  return (
    <Bento/>
  )
}

export default BentoPage