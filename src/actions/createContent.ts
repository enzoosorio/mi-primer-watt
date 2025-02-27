"use server"

import { PutObjectCommand } from "@aws-sdk/client-s3";
import MediaCollection from "@/src/schemas/mongooseSchemas/MediaContent";
import ContentCollection from "@/src/schemas/mongooseSchemas/ContentAlbum";
import { IContentAlbum } from "../schemas/mongooseSchemas/ContentAlbum";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../utils/s3";
import connectDB from "../utils/db";
import { getAlbumByDate } from "../lib/timeline/getAlbumByDate";


export interface IcreateContent extends Omit<IContentAlbum, "album" | "media"> {
    date: Date;
    mediatype: string;
}
export const createContent = async (contentData : IcreateContent) => {
    try {
        await connectDB();
        const album = await getAlbumByDate(contentData.date);

        if(!album){
            return { error: "No se pudo encontrar el album" }
        }

        const uploadURL: { url: string, key: string } = await new Promise(async (resolve, reject) => {
            try {
                const fileName = `${contentData.title}-${Date.now()}`;
                const command = new PutObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME!,
                    Key: fileName,
                    ContentType: contentData.mediatype,
                });

                const signedUrl = await getSignedUrl(s3Client, command, {
                    expiresIn: 3600,
                });

                resolve({ url: signedUrl, key: fileName });
            } catch (error) {
                reject(error);
            }
        });

        const media = await MediaCollection.create({
            src : uploadURL.url,
            alt : contentData.title,
            type : contentData.mediatype
        });

        if(!media){
            return { error: "No se pudo crear el media" }
        }

        const content = await ContentCollection.create({
            ...contentData,
            album : album._id,
            media : media._id
        });

        if(!content){
            return { error: "No se pudo crear el contenido" }
        }

        return { success : "Contenido creado con éxito", uploadURL };


    } catch (error) {
        console.error("Error en createContent:", error);
    return { error: "Error interno del servidor" };
    }
}