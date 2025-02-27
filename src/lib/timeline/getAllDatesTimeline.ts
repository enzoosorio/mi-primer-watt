"use server"
import connectDB from "@/src/utils/db";
import { IAlbum } from "@/src/schemas/mongooseSchemas/Timeline";
import AlbumCollection from "@/src/schemas/mongooseSchemas/Timeline";

export interface IAlbumWithId extends IAlbum {
    _id: string;
}

export const getAllDatesTimeline = async () : Promise<IAlbumWithId[] | null> => {
    try {
        await connectDB();
    const datesTimeline : IAlbumWithId[] = JSON.parse(JSON.stringify(await AlbumCollection.find({}).sort({date: 1})));

    if(!datesTimeline || datesTimeline.length === 0){
        return null
    }

    return datesTimeline;

    } catch (error) {
        console.log(error);
        return null;
    }
}