import { QnA } from '@/src/components/questions-and-answers/QnA'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Q&A",
  description: "En esta sección puedes encontrar algunas respuestas a las preguntas que han hecho las personas. Si tienes alguna pregunta con respecto al WAT, ¡no dudes en dejarla en el campo de preguntas!",
};
export default async function QnAPage() {

  return (
    <QnA />
  )
}
