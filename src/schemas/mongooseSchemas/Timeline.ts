import mongoose, { Schema, model } from "mongoose";

export interface IAlbum {
    date: Date;
}

const albumSchema = new Schema<IAlbum>({
    date: { type: Date, required: true },
}, { timestamps: true });

    
const AlbumCollection = mongoose.models.Album || model("Album", albumSchema);

export default AlbumCollection
