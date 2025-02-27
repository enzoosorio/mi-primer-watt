import { IMedia } from "@/src/types/schemas/Media";
import mongoose, { model, Schema } from "mongoose";

const mediaContentSchema = new Schema<IMedia>({
    src: String,
    alt: String,
    type: String,
});


const MediaCollection = mongoose.models["Media"] 
    ? (mongoose.models["Media"] as mongoose.Model<IMedia>) 
    : model<IMedia>("Media", mediaContentSchema);

export default MediaCollection