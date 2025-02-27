
import QnACollection, { IQnA } from "../schemas/mongooseSchemas/QnA";
import connectDB from "../utils/db";

export interface IQnAWithId extends IQnA {
    _id: string;
}
export const getQuestionsInPending = async () : Promise<IQnAWithId[] | null> => {
    try {
        await connectDB();
        
        const pendingQuestions : IQnAWithId[] = JSON.parse(JSON.stringify(await QnACollection.find({ state: "pendiente" })));
        
        if(!pendingQuestions || pendingQuestions.length === 0) {
            return null;
        }

        return pendingQuestions;
    } catch (error) {
        console.log(error);
        return null;
    }
};