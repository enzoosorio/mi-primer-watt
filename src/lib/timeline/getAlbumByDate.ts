"use server"
import AlbumCollection  from "@/src/schemas/mongooseSchemas/Timeline"
import connectDB from "@/src/utils/db"
import { IAlbumWithId } from "./getAllDatesTimeline"


export const getAlbumByDate = async (date : Date | string) => {

    await connectDB()
    const album : IAlbumWithId = JSON.parse(JSON.stringify(await AlbumCollection.findOne({date: date})));
    
    if(!album){
        return null
    }

    return album;
}