import { DoesItWorth } from '@/src/components/DIW/DoesItWorth'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "¿Vale la pena? (opinión personal)",
  description: "Voy a profundizar, dada mi opinión personal, en qué tan vale la pena el viaje a Montana. ¿Te parece que es una buena idea? ¿O no? ¿Por qué?",
};
export default function DoesItWorthPage() {
  return (
    <DoesItWorth/>
  )
}
