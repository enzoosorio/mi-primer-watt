import { getAllAnswers } from "@/src/lib/getAllAnswers";
import { BancoRespuestas } from "./BancoRespuestas";

export const BancoRespuestasWrapper = async() => {
    const firstPageQnA = await getAllAnswers();

  return (
    <BancoRespuestas firstPageQnA={firstPageQnA}/>
  )
}
