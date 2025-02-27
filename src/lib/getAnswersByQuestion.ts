"use server";

import QnACollection, { IQnA } from "../schemas/mongooseSchemas/QnA";
import connectDB from "../utils/db";

export const getAnswersByQuestion = async (question: string) => {
    try {
        await connectDB();
        const regex = new RegExp(question, "i"); // "i" para que no distinga entre mayúsculas y minúsculas
        
        const filteredAnswers: IQnA[] = JSON.parse(JSON.stringify(
            await QnACollection.find({ question: { $regex: regex } })
        ));
        
        if(!filteredAnswers || filteredAnswers.length === 0) {
            return null;
        }

        return filteredAnswers;
    } catch (error) {
        console.log(error);
        return null;
    }
};