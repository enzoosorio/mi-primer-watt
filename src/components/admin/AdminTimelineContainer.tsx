"use client"

import { RInput, RInputArea } from "../UI/Input";
import { createAlbum } from "@/src/actions/album";
import toast from "react-hot-toast";
import { IAlbum } from "@/src/schemas/mongooseSchemas/Timeline";
import { useState, useTransition } from "react";
import { createContent, IcreateContent } from "@/src/actions/createContent";

interface AdminTimelineContainerProps {
  datesTimeline : IAlbum[] | null
}

export const AdminTimelineContainer = ({datesTimeline} : AdminTimelineContainerProps) => {
  
  const [isPending, startTransition] = useTransition()
  const [pickedAlbum, setPickedAlbum] = useState<string>("")
  
  const handleCreatingAlbum = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(e.currentTarget.fecha.value === ""){
      toast.error("Fecha no puede estar vacía")
      return
    }

   startTransition(async() => {
    const date = new Date(e.currentTarget.fecha.value)
    const res = await createAlbum({date})
    if(res.success === "Album creado con éxito"){
      toast.success("Album creado con éxito")
    }
    else{
      toast.error(res?.error || "Error al crear el album", {
        position: "top-center",
        className: "text-center",
      })
    }
   })
   

  } 

  const handleCreatingContentAlbum = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pickedDate = new Date(pickedAlbum).toISOString().split("T")[0];
    const mediaFiles = formData.getAll("media") as File[];

    if (pickedDate === "") {
        toast.error("Fecha no puede estar vacía");
        return;
    }

    if (formData.get("titlee") === "") {
        toast.error("Titulo no puede estar vacío");
        return;
    }

    if (formData.get("descripcion") === "") {
        toast.error("Descripción no puede estar vacía");
        return;
    }

    if (mediaFiles.length === 0) {
        toast.error("Media no puede estar vacía");
        return;
    }

   startTransition(async() => {
    const date = new Date(pickedDate);

    const listingObject: IcreateContent = {
            date, 
            title: formData.get("titlee") as string,
            description: formData.get("description") as string,
            mediatype: mediaFiles[0].type,
        };

    const res = await createContent(listingObject);
        if (res?.success === "Contenido creado con éxito") {

          const file = mediaFiles[0];
          const response = await fetch(res.uploadURL.url, {
            method: "PUT",
            body: file,
          });

          if (response.ok) {
            toast.success("Contenido creado con éxito");
          }
        } else {
            toast.error(res?.error || "Error al crear el contenido", {
                position: "top-center",
                className: "text-center",
            });
        }
   })
   

  } 

  const handlePickingAlbum = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setPickedAlbum(e.target.value)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-[95%]  xl:w-[80%] mx-auto">
      {/* <TimelineContainer datesTimeline={datesTimeline} className="flex w-full" currentDate= {datesTimeline[0].dateString}/> */}
      <div className="flex flex-col items-start justify-start gap-6 w-full px-4 py-10 ring-2 ring-rose rounded-xl">
      <h3 className="text-left text-2xl font-nunito w-full">Creación del Album (Fecha)</h3>
      <form 
      onSubmit={(e) => handleCreatingAlbum(e)}
      className="flex flex-col items-start justify-start gap-6 w-full">
        <RInput htmlFor="fecha" label="Fecha" type="date" name="fecha" placeholder="Fecha"/>
        <button 
        disabled={isPending}
        type="submit"
        className={`bg-primary-blue rounded-xl px-4 py-2 text-white font-nunito w-max cursor-pointer hover:bg-blue-400 transition-colors
        ${isPending ? "bg-gray-400 cursor-auto" : "bg-primary-blue"} transition-colors
        `}>
            Crear dia para el album
        </button>

      </form>
      </div>
      <div 
      className={`flex flex-col items-center justify-center gap-6 w-full px-4 py-10 ring-2 ring-rose rounded-xl ${datesTimeline == null || datesTimeline == undefined ? "bg-gray-500" : ""}`}>
        <h3 className="text-left text-2xl font-nunito w-full">Creación del Contenido para el album</h3>
      <div className="flex flex-col items-end justify-start gap-2 w-full">
        <label className='font-nunito text-lg ' htmlFor="pickAlbum">Buscar album por fecha</label>
        <select
        onChange={(e) => handlePickingAlbum(e)}
        disabled={datesTimeline == null}
        id="pickAlbum"
        className={`w-full max-w-[50ch] rounded-xl border-2 border-gray-400 p-2 ${datesTimeline?.length === 0 ? "bg-gray-300" : ""}`}>
          {datesTimeline && datesTimeline.length > 0 ? (
      <>
        <option value="">Selecciona una fecha</option>
        {
          datesTimeline.map((date, index) => (
            <option key={index} value={new Date(date.date).toISOString().split("T")[0]}>
              {index + 1} - {date.date && new Date(date.date).toISOString().split("T")[0]}
            </option>
          ))
        }
      </>
    ) : (
      <option value="">No hay fechas disponibles</option>
    )}
        </select>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 w-full">
      <form 
      onSubmit={(e) => handleCreatingContentAlbum(e)}
      className="flex flex-col items-center justify-center gap-6 w-full">
        <RInput htmlFor="fecha" disabled={true} label="Fecha" name="fechaContent" type="date" value={pickedAlbum} placeholder="Fecha"/>
        <RInput htmlFor="titulo" label="Titulo" name="titlee" type="text" placeholder="Titulo"/>
        <RInputArea htmlFor="descripcion" label="Descripción" name="description" type="text" placeholder="Descripción"/>
        <RInput htmlFor="media" accept="image/*, video/*, .gif" multiple label="Media" name="media" type="file" placeholder="Media"/>
        
        <button 
        disabled={datesTimeline == null || datesTimeline.length === 0}
        type="submit"
        className={`bg-primary-blue rounded-xl px-4 py-2 text-white font-delicious-small-caps w-max cursor-pointer hover:bg-blue-400 transition-colors ${datesTimeline == null || datesTimeline.length === 0 ? "bg-gray-500" : ""}`}>
            Crear contenido para el album
        </button>

      </form>
      </div>
      </div>

    </div>
  )
}
