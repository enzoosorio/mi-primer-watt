import mongoose, { Schema, model } from "mongoose";


export interface IContentAlbum {
    title: string;
    description: string;
    media: mongoose.Types.ObjectId;
    album: mongoose.Types.ObjectId;
}

const contentAlbumSchema = new Schema<IContentAlbum>({
    title : String,
    description : String,
    media: [{ type: Schema.Types.ObjectId, ref: "Media" }],
    album: { type: Schema.Types.ObjectId, ref: "Album" },
}, { timestamps: true });


const ContentCollection = mongoose.models.ContentAlbum || model("ContentAlbum", contentAlbumSchema);

export default ContentCollection