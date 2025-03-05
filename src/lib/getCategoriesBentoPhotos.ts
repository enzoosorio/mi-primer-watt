"use server"

import CategoryBentoCollection from "../schemas/mongooseSchemas/CategoryBentoPhotos";
import connectDB from "../utils/db"

export const getCategoryBentoOptions = async (): Promise<string[] | null> => {
    await connectDB();

    try {
        const categoryBentoOptions : any = JSON.parse(JSON.stringify(await CategoryBentoCollection.distinct("category")));

        if (!categoryBentoOptions) {
            return null;
        }

        categoryBentoOptions.sort((a : string, b : string) => a.localeCompare(b));

        return categoryBentoOptions;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return null;
    }
};