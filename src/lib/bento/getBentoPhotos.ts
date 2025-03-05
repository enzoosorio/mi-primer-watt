"use server"

import BentoPhotosCollection, { IBentoPhotos } from "@/src/schemas/mongooseSchemas/BentoPhotos";
import CategoryBentoCollection from "@/src/schemas/mongooseSchemas/CategoryBentoPhotos";
import connectDB from "@/src/utils/db";

interface IBentoPhotosWithId extends IBentoPhotos{
    _id: string;
}

export interface BentoPhotosResponse {
  photos: IBentoPhotosWithId[];
  total: number;
}


export const getBentoPhotos = async (shownIds: string[] = [], limitNumber: number = 10, category: string | null = null): Promise<BentoPhotosResponse | { error: string }> => {
    try {
        await connectDB();
        //todo: poder arreglar que si se escribe una categoria inexistente en la url, igualmente devuelva todas las fotos y
        // el error de categoria no encontrada
        let bentoPhotos: IBentoPhotosWithId[] = [];
        let totalPhotos: number = 0;
        if (category) {
            const categoryToFind = await CategoryBentoCollection.where("category").equals(category).findOne();

            if (!categoryToFind) {
                return { error: "No se encontró la categoría" };
            }

            bentoPhotos = JSON.parse(JSON.stringify(
                await BentoPhotosCollection.aggregate([
                    { $match: { _id: { $nin: shownIds }, categoryId: categoryToFind._id } },
                    { $sample: { size: limitNumber } }
                ])
            ));

            totalPhotos = await BentoPhotosCollection.countDocuments({ categoryId: categoryToFind._id });
        } else {
            bentoPhotos = JSON.parse(JSON.stringify(
                await BentoPhotosCollection.aggregate([
                    { $match: { _id: { $nin: shownIds } } },
                    { $sample: { size: limitNumber } }
                ])
            ));

            totalPhotos = await BentoPhotosCollection.countDocuments();
        }

        if (!bentoPhotos.length) {
            return { error: "No se encontraron fotos" };
        }

        return { photos: bentoPhotos, total: totalPhotos }; 

    } catch (error) {
        console.error("Error en getBentoPhotos:", error);
        return { error: "Error interno del servidor" };
    }
};