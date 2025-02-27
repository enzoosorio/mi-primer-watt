import { BancoPreguntas } from './BancoPreguntas'
import { Suspense } from 'react'
import { BancoRespuestasSkeleton } from '@/src/skeletons/BancoRespuestasSkeleton'
import { BancoRespuestasWrapper } from './BancoRespuestasWrapper'


export const QnA = () => {
  return (
    <section className="mt-10 flex flex-col items-center justify-center w-[95%] rounded-lg gap-16 mx-auto mb-20 p-6 min-h-[800px]">
    <div className="flex flex-col items-center justify-center gap-6">
    <h1 className="text-3xl font-bold text-center lg:text-5xl font-roboto  ">Preguntas y Respuestas</h1>
    <p className="text-base lg:text-lg text-center text-pretty font-nunito">Deja tu pregunta y lo contestaré! (cuando tenga tiempo)</p>
</div>
    <div className="flex flex-col-reverse lg:flex-row justify-start items-start w-full gap-8 ">
        <Suspense fallback={<BancoRespuestasSkeleton/>}>
        <BancoRespuestasWrapper/>
        </Suspense>
        <div className="relative w-full lg:w-[30%] flex flex-col items-center justify-center gap-6 h-full ">
            <BancoPreguntas/>
            <div className="relative  flex flex-col items-center justify-center gap-4 w-full bg-gray-200/75 rounded-xl p-5 shadow-xl ">
                <h1 className="text-xl text-center font-delicious-small-caps text-pretty">TAMBIÉN PUEDES ESCRIBIRME EN <p>INSTAGRAM <a className="text-rose" href="https://www.instagram.com/enzoosorioortiz/" target="_blank" rel="noopener noreferrer">@ENZOOSORIOORTIZ</a></p></h1>
            </div>
        </div>
    </div>
</section>
  )
}

