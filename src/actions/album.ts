"use server"

import { revalidatePath } from "next/cache";
import {  IAlbum } from "../schemas/mongooseSchemas/Timeline";
import AlbumCollection from "../schemas/mongooseSchemas/Timeline";
import connectDB from "../utils/db"

export const createAlbum = async (album : IAlbum) => {
    await connectDB();

    const albumExists = await AlbumCollection.findOne({date: album.date});

    if(albumExists){
        return { error: `El album con la fecha seleccionada ya existe` }
    }

    const newAlbum = await AlbumCollection.create(album);

    if(!newAlbum){
        return { error: "No se pudo crear el album" }
    }

    revalidatePath("/admin/1029384756?option=timeline");

    return {success : "Album creado con éxito"};

}

