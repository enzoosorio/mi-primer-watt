"use server"

import connectDB from "@/src/utils/db";
import { IAlbumWithId } from "./getAllDatesTimeline";
import AlbumCollection from "@/src/schemas/mongooseSchemas/Timeline";


export const getAlbumIdByDate = async (date : Date | string | undefined ) => {

    if(!date){
        return null
    }
    await connectDB()
    let dateToSearch;
    
    if(typeof date === "string"){
        dateToSearch = new Date(date)
    }
    else{
        dateToSearch = date
    }
    
    const album : IAlbumWithId = JSON.parse(JSON.stringify(await AlbumCollection.findOne({date: date})));
    
    const albumId = album._id.toString()

    return albumId
}