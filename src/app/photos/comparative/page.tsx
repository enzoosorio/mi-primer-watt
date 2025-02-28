import { Comparative } from '@/src/components/photos/comparative/Comparative'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Comparative",
  description: "Vamos a comparar las fotos y videos tomados por diferentes dispositivos, y quiza te sirva para comparar los resultados.",
};

export default function ComparativePage() {

  return (
    <Comparative/>
  )
}
