import mongoose, { model, Schema } from "mongoose";

export interface IBentoPhotos{
    src: string;
    alt: string;
    aspectRatio : string;
    categoryId: mongoose.Types.ObjectId;
}

const bentoPhotosSchema = new Schema<IBentoPhotos>({
    src: String,
    alt: String,
    aspectRatio: String,
    categoryId: mongoose.Types.ObjectId,
});


const BentoPhotosCollection = mongoose.models["BentoPhotos"] 
    ? (mongoose.models["BentoPhotos"] as mongoose.Model<IBentoPhotos>) 
    : model<IBentoPhotos>("BentoPhotos", bentoPhotosSchema);

export default BentoPhotosCollection