"use server"

import { PutObjectCommand } from "@aws-sdk/client-s3";
import connectDB from "../utils/db";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../utils/s3";
import BentoPhotosCollection, { IBentoPhotos } from "../schemas/mongooseSchemas/BentoPhotos";
import CategoryBentoCollection, { ICategoryBentoPhotos } from "../schemas/mongooseSchemas/CategoryBentoPhotos";

interface IcreateBentoPhotos {
    alt: string;
    category: string;
    mediaLength: number;
    mediaType: string;
    aspectRatio: string;
}

export const createBentoPhotos = async(listingObject : IcreateBentoPhotos) => {

    try {
        await connectDB();

        const uploadURL: { url: string, key: string }[] = 
        await Promise.all(Array.from({ length: listingObject.mediaLength }, (_, i) => i + 1).map(async (_, index) => {
            const fileName = `${listingObject.alt}-${Date.now()}`;
            const fileKey = `bentophotos/${index}-${fileName}`;
            
            const command = new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: fileKey,
                ContentType: 'image/jpeg',
            });

            const signedUrl = await getSignedUrl(s3Client, command, {
                expiresIn: 3600,
            });

            return { url: signedUrl, key: fileName };
        }));


        const category : ICategoryBentoPhotos = await CategoryBentoCollection.create({
            category: listingObject.category
        });

        if(!category){
            return { error: "No se pudo crear la categoría" }
        }

        const bentoPhotos = await Promise.all(
            uploadURL.map(async (url, index) => {
                return BentoPhotosCollection.create({
                    src: url.url,
                    alt: `${index}-${listingObject.alt}`,
                    categoryId: category._id,
                    aspectRatio : listingObject.aspectRatio
                });
            })
        );

        if(!bentoPhotos){
            return { error: "No se pudo crear el bento" }
        }

        return { success : "Photos creadas con éxito", uploadURL };


    } catch (error) {
        console.error("Error en createBentoPhotos:", error);
        return { error: "Error interno del servidor" };
    }

}