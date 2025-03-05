"use client"
import React, { useTransition } from 'react'
import { RInput } from '../UI/Input'
import toast from 'react-hot-toast'
import { createBentoPhotos } from '@/src/actions/createBentoPhotos'


interface AdminBentoPhotosProps {
    categoryBentoOptions : string[] | null
}
export const AdminBentoPhotos = ({categoryBentoOptions} : AdminBentoPhotosProps) => {

    const [isPending, startTransition] = useTransition()

    const handleCreatingBentoPhoto = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(e.currentTarget.category.value === "" && e.currentTarget.newCategory.value === ""){
            toast.error("Debes seleccionar o crear una nueva categoría")
            return
        }

        if(e.currentTarget.aspectRatio.value === ""){
            toast.error("Debes seleccionar el aspect ratio")
            return
        }

        const formData = new FormData(e.currentTarget);
        const mediaFiles = formData.getAll("bentomedia") as File[];
        
        if (mediaFiles.length === 0) {
            toast.error("Media no puede estar vacía");
            return;
        }

        startTransition(async() => {
            const category = e.currentTarget.category.value === "" ? e.currentTarget.newCategory.value : e.currentTarget.category.value
            
            const listingObjects = {
                alt : e.currentTarget.alternative.value,
                category : category,   
                mediaLength : mediaFiles.length,
                mediaType: mediaFiles[0].type,
                aspectRatio : e.currentTarget.aspectRatio.value
            }

            const res = await createBentoPhotos(listingObjects);

            if (res?.success === "Photos creadas con éxito") {

                await Promise.all(
                    res.uploadURL.map(async (url, index) => {

                        const file = mediaFiles[index];

                        const response = await fetch(url.url, {
                            method: "PUT",
                            body: file,
                            headers: {
                                "Content-Type": "image/*",
                            },
                        });

                        if (!response.ok) {
                            toast.error("Error al crear el contenido", {
                                position: "top-center",
                                className: "text-center",
                            });
                            return;
                        }
                        
                        toast.success("Bento foto creado con éxito");

                    })
                )
                
              } else {
                  toast.error(res?.error || "Error al crear el bento", {
                      position: "top-center",
                      className: "text-center",
                  });
              }
        })
    
    }
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-[95%]  xl:w-[80%] mx-auto ring-2 ring-rose rounded-xl p-4">
        <h1 className='font-delicious-small-caps text-2xl'>Bento Photos</h1>
        <form 
        onSubmit={(e) => handleCreatingBentoPhoto(e)}
        className='flex flex-col items-center justify-center gap-6 w-full'>
            <RInput htmlFor="bentomedia" accept="image/*" multiple label="Selecciona imagen(es)" name="bentomedia" type="file" placeholder="Media"/>
            <RInput htmlFor="alternative" label="Alt (opcional)" name="alternative" type="text" placeholder="paisaje atardecer..."/>
            <div className='flex flex-col items-start justify-center gap-4 w-full'>
                <label className='font-nunito text-lg ' htmlFor="aspectRatio">Aspect Ratio</label>
                <select
                className={`w-full max-w-[55ch] rounded-lg min-h-[40px] ring ring-gray-500 
                    px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-indigo-500`}
                id="aspectRatio"
                name="aspectRatio"
                >
                    <option value="Square">Aspecto cuadrado</option>
                    <option value="Wide">Aspecto video</option>
                    <option value="Tall">Aspecto tall</option>
                </select>
            </div>
            <div className='flex flex-col items-start justify-center gap-4 w-full'>
                <label className='font-nunito text-lg ' htmlFor="category">Categoria</label>
                <select
                disabled={categoryBentoOptions?.length === 0 || categoryBentoOptions == null}
                className={`w-full max-w-[55ch] rounded-lg min-h-[40px] ring ring-gray-500  px-4 py-2 text-sm font-medium 
                    ${categoryBentoOptions == null || categoryBentoOptions.length === 0 ? "bg-gray-300 cursor-auto" : "cursor-pointer"}
                    text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                id="category"
                name="category"
                >
                    {categoryBentoOptions && categoryBentoOptions.length > 0 ? (
                       <>
                        <option value="">Selecciona una categoría</option>
                        {
                            categoryBentoOptions.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))
                        }
                       </>
                        
                    ) : (
                        <option value="">Crea una nueva categoría</option>
                    )}
                </select>
            </div>
            <RInput htmlFor="newCategory" label="Nueva categoria" name="newCategory" type="text" placeholder="Categoria nueva..."/>
            <button
            disabled={isPending} 
            type="submit"
            className={`bg-primary-blue rounded-xl px-4 py-2 
                text-white font-delicious-small-caps 
            w-max cursor-pointer hover:bg-blue-400 transition-colors `}>
                Crear bento photo
        </button>
        </form>
    </div>
  )
}
