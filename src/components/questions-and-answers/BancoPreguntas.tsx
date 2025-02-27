"use client";

import { createPregunta } from "@/src/actions/pregunta";
import React, { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

export const BancoPreguntas = () => {

    const [form, setForm] = useState({
      username: "",
        typeQuestion: "publico",
        question: "",
      });
      const [errors, setErrors] = useState<{ username?: string; question?: string }>({});
      const [isFormActive, setIsFormActive] = useState(false);
      const [isPending, startTransition] = useTransition();      

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { username?: string; question?: string } = {};
    
        if (!form.username.trim()) newErrors.username = "El nombre es obligatorio";
        if (!form.question.trim()) newErrors.question = "La pregunta no puede estar vacía";
    
        
        const regexUsername = /^[a-zA-Z\s]+$/;
        if (!regexUsername.test(form.username)) newErrors.username = "El nombre solo puede contener letras";

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
    
        startTransition(() => {
          createPregunta(form).then((response) => {
            if(response?.error){
              toast.error(response.error)
              return
            }
            toast.success(`${response?.success}`)
            setTimeout(() => {
              window.location.reload()
            }, 600);
          }).catch((error) => {
            console.log(error)
            toast.error("Ocurrió un error al enviar la pregunta")
            });
          setErrors({});
        })


      };

      useEffect(() => {
        if (errors.username) toast.error(errors.username)
        if (errors.question) toast.error(errors.question)
      }, [errors])

  return (
    //TODO : FIX THE ANIMATION WHEN CLICKING ON THE BUTTON
    <div className={`flex flex-col clip-path-preguntas-container grow items-center min-h-full justify-start ${isFormActive ? "gap-12 max-h-full overflow-auto " : "gap-8 max-h-[320px] overflow-y-hidden ]"} w-full bg-gray-200/75 rounded-xl p-5 shadow-xl transition-all`}>
        <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-3xl font-bold font-nunito mt-6 text-center">Banco de Preguntas</h1>
        <p className="text-base font-nunito">¡Venga, anímate a dejar tu pregunta!</p>
        </div>
        <div className={`flex flex-col items-center justify-center w-full gap-8 mx-auto px-2 ${isFormActive ? "hidden" : ""}`}>
            <p className="text-xl text-center font-delicious-small-caps w-[70%]">¡Pregunta haciendo click en el botón!</p>
            <button 
            onClick={() => setIsFormActive(true)}
            type="button" className=" w-full text-lg font-nunito rounded-lg px-2 py-4 cursor-pointer text-black bg-yellow outline-none shadow-sm max-w-[400px] transition-all duration-300 ease-in-out hover:font-bold">Preguntar</button>
        </div>
        <form onSubmit={handleSubmit} id="form-preguntas" className={`flex flex-col items-center justify-center gap-8 w-full transition-all ${isFormActive ? "opacity-100" : "opacity-0"}`}>
            <div className="w-full flex flex-col items-start justify-start gap-4">
                <label htmlFor="nombre" className="text-lg font-roboto text-right">Tu nombre</label>
                <input id="nombre" onChange={(e) => handleChange(e)} type="text" name="username" className="w-full rounded-lg px-2 py-4 font-roboto text-black bg-white/75 outline-none shadow-sm lg:max-w-[400px] " placeholder="Escribe tu pregunta aquí..." />
                
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-4">
                <label htmlFor="tipoPregunta" className="text-lg font-roboto text-left">¿Respuesta pública o privada?</label>
                <select id="tipoPregunta" name="typeQuestion" onChange={(e) => handleChange(e)} className="w-full rounded-lg px-2 py-4 font-roboto text-black bg-white/75 outline-none shadow-sm  lg:max-w-[400px] ">
                    <option value="publico">Público</option>
                    <option value="privado">Privado</option>
                </select>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-4">
                <label htmlFor="pregunta" className="text-lg font-roboto text-right">Tu pregunta</label>
                <textarea id="pregunta" name="question" onChange={(e) => handleChange(e)} className="w-full rounded-lg p-2  font-roboto text-black bg-white/75 outline-none shadow-sm  resize-none min-h-[150px]" placeholder="Escribe tu pregunta aquí..." />
                
            </div>
            <div className="flex flex-row items-center justify-center gap-8 w-full">
                <button 
                disabled={isPending}
                onClick={() => setIsFormActive(false)} type="button" className="submitButton w-full text-lg font-nunito rounded-lg px-2 py-4 cursor-pointer text-black bg-white outline-none shadow-sm max-w-[400px] transition-all duration-300 ease-in-out hover:font-bold">Cerrar</button>
                <button 
                disabled={isPending}
                type="submit" className="submitButton w-full text-lg font-nunito rounded-lg px-2 py-4 cursor-pointer text-black bg-yellow/75 outline-none shadow-sm max-w-[400px] transition-all duration-300 ease-in-out hover:font-bold">Preguntar</button>
            </div>
        </form>
        
</div>
  );
};
