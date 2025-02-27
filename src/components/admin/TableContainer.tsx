"use client"

import { updatePregunta } from '@/src/actions/pregunta';
import { getQuestionsInPending, IQnAWithId } from '@/src/lib/getQuestionsInPending'
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';

interface TableContainerProps {
  questionsInPending: IQnAWithId[] | null;
}

export interface UpdatingOnlyPartOfQuestion {
    _id: string
    question: string;
    answer: string;
    state: string;
}

export const TableContainer =({ questionsInPending }: TableContainerProps) => {

    const [partsToModify, setPartsToModify] = useState<UpdatingOnlyPartOfQuestion>({
        _id: "",
        question: "",
        answer: "",
        state: "",
    })
    const [isBeingModified, setIsBeingModified] = useState("")
    const [isPending, startTransition] = useTransition();

    const handleUpdateQuestion = async (questionId : string) => {
        try {
            setPartsToModify({
                ...partsToModify,
                _id: questionId
            })

            if(partsToModify.question === "" || partsToModify.answer === "" || partsToModify.state === "") {
                toast.error("No puedes dejar campos vacíos")
                return
            }

            startTransition(() => {
                updatePregunta(partsToModify).then((response) => {
                    if(response?.error){
                        toast.error(response.error)
                        return
                    }
                    toast.success(`${response?.success}`)
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                }).catch((error) => {
                    console.log(error)
                    toast.error("Ocurrió un error al actualizar la pregunta")
                    });
                setPartsToModify({
                    ...partsToModify,
                    _id: "",
                    question: "",
                    answer: "",
                    state: "",
                })
                setIsBeingModified("")
            })
        }catch (error) {
            console.log(error)
            toast.error("Ocurrió un error al actualizar la pregunta")
            }
    }

    const handleChangeQuestion = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setPartsToModify({
            ...partsToModify,
            [e.target.name]: e.target.value,
        })
    }

  return (
    <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
    <thead className="bg-gray-100 text-left">
      <tr>
        <th className="border border-gray-300 font-nunito p-4 w-1/6">Id</th>
        <th className="border border-gray-300 font-nunito p-4 w-1/6">Name</th>
        <th className="border border-gray-300 font-nunito p-4 w-1/6 ">Estado</th>
        <th className="border border-gray-300 font-nunito p-4 w-1/3">Pregunta</th>
        <th className="border border-gray-300 font-nunito p-4 w-1/3">Respuesta</th>
        <th className="border border-gray-300 font-nunito p-4 w-1/6 text-center">Modificar</th>
      </tr>
    </thead>
    <tbody>
      {questionsInPending?.map((question) => (
        <tr key={question._id.toString()} className="odd:bg-gray-50">
          <td className="border border-gray-300 font-nunito p-4 max-w-[40px] truncate">{question._id.toString()}</td>
          <td className="border border-gray-300 font-nunito p-4">{question.username}</td>
          <td className={`border border-gray-300 font-nunito text-center transition-colors ${question._id !== partsToModify._id ? "bg-gray-100" : question.state === "pendiente" ? "bg-amber-200" : question.state === "respondida" ? "bg-green-200" : ""}`}>
            <select 
            className=' outline-none w-full h-[52px]' 
            name='state'
            disabled= {partsToModify._id !== question._id}
            value={partsToModify._id === question._id ? partsToModify.state : question.state} 
            onChange={(e) => handleChangeQuestion(e)}>
                <option value="pendiente">Pendiente</option>
                <option value="respondida">Respondida</option>
            </select>
          </td>
          <td className="border border-gray-300 font-nunito h-full">
              <input 
              type="text"
              disabled= {partsToModify._id !== question._id}
              value={partsToModify._id === question._id ? partsToModify.question : question.question}
              name='question'
              onChange={(e) => handleChangeQuestion(e)}
              className={`w-full h-[52px] px-2 outline-none ${question._id !== partsToModify._id ? "bg-gray-100" : ""} transition-colors`}
              />
          </td>
          <td className="border border-gray-300 font-nunito h-full">
          <input 
              type="text"
              disabled= {partsToModify._id !== question._id}
              value={partsToModify._id === question._id ? partsToModify.answer : question.answer}
              placeholder='Respuesta...'
              name='answer'
              onChange={(e) => handleChangeQuestion(e)}
              className={`w-full h-[52px] px-2 outline-none ${question._id !== partsToModify._id ? "bg-gray-100" : ""} transition-colors`}
              />
            </td>
          <td className='px-4'>
            {isBeingModified !== "" ? (
                <div className='flex flex-row gap-4 w-full'>
                    <button 
                    disabled={isPending}
                    onClick={() => handleUpdateQuestion(question._id)}
                    className={`text-white font-nunito p-2 rounded-lg ${isPending ? "bg-gray-400" : "bg-green-500"} transition-colors cursor-pointer`}>
                        Guardar
                    </button>
                    <button
                    disabled={isPending} 
                    onClick={() => {
                        setIsBeingModified("")
                        setPartsToModify({
                            ...partsToModify,
                            _id: "",
                            question: "",
                            answer: "",
                            state: "",
                        })
                    }}
                    className={`bg-none border border-red-400 cursor-pointer  text-black font-nunito p-2 rounded-lg ${isPending ? "bg-gray-400" : "border-red-400"} transition-colors`}>
                        Cancelar
                    </button>
                </div>
            ) : (
                <button 
                 onClick={() => {
                    setIsBeingModified(question._id)
                    setPartsToModify({
                        _id: question._id,
                        question: question.question,
                        answer: question.answer,
                        state: question.state,
                    })
                 }}
                 className="bg-amber-500 text-white font-delicious-small-caps w-full px-4 py-2 rounded-lg mx-auto cursor-pointer hover:bg-amber-600 transition-colors">
                    Modificar
                </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}