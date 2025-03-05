"use server"

import BentoPhotosCollection, { IBentoPhotos } from "@/src/schemas/mongooseSchemas/BentoPhotos";
import connectDB from "@/src/utils/db";


export const getBentoPhotos = async() : Promise<IBentoPhotos[] | {error: string}> => {
    try {
        await connectDB();

        const bentoPhotos : IBentoPhotos[] = JSON.parse(JSON.stringify(await BentoPhotosCollection.find({})));
        
        if(!bentoPhotos){
            return { error: "No se pudo obtener las fotos" }
        }
        const shuffledPhotos = bentoPhotos.sort(() => Math.random() - 0.5);

        return shuffledPhotos;

    } catch (error) {
        console.error("Error en getBentoPhotos:", error);
        return { error: "Error interno del servidor" };
    }
}