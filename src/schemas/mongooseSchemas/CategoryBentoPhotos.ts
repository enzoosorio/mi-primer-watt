
import mongoose, { model, Schema } from "mongoose";


export interface ICategoryBentoPhotos{
    _id: mongoose.Types.ObjectId;
    category: string;
}


const categoryBentoPhotosSchema = new Schema<ICategoryBentoPhotos>({
    category: String,
});

const CategoryBentoCollection = mongoose.models["CategoryBento"] 
    ? (mongoose.models["CategoryBento"] as mongoose.Model<ICategoryBentoPhotos>) 
    : model<ICategoryBentoPhotos>("CategoryBento", categoryBentoPhotosSchema);

export default CategoryBentoCollection