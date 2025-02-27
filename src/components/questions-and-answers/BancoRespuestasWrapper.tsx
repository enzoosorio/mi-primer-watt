import { getAllAnswers } from "@/src/lib/getAllAnswers";
import { Suspense } from "react"
import { BancoRespuestas } from "./BancoRespuestas";


export const BancoRespuestasWrapper = async() => {
    const firstPageQnA = await getAllAnswers();

  return (
    <BancoRespuestas firstPageQnA={firstPageQnA}/>
  )
}
