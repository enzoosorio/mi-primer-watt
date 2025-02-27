"use server";

import QnACollection, { IQnA } from "@/src/schemas/mongooseSchemas/QnA";
import connectDB from "@/src/utils/db";
import { QNASchemaValibot } from "../schemas/valibotSchemas/qnaSchemaValibot";
import { InferInput } from "valibot";
import { IQnAWithId } from "../lib/getQuestionsInPending";
import { UpdatingOnlyPartOfQuestion } from "../components/admin/TableContainer";
export const createPregunta = async (qna: InferInput<typeof QNASchemaValibot>) => {
    try {
        await connectDB();
        const newQnA : IQnA = await QnACollection.create({
            username: qna.username,
            typeQuestion: qna.typeQuestion,
            question: qna.question,
            state: "pendiente",
        });

        if (!newQnA) {
            return {error : "No se pudo crear la pregunta"};
        }

        return {success : "Pregunta creada correctamente"};
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const updatePregunta = async (pregunta : UpdatingOnlyPartOfQuestion) => {
    try {
        await connectDB();
        const newQnA : IQnAWithId | null = await QnACollection.findOneAndUpdate<IQnAWithId>(
            { _id: pregunta._id },
            {
                question : pregunta.question,
                answer : pregunta.answer,
                state : pregunta.state,
            },
            { new: true }
        );

        if (!newQnA) {
            return {error : "No se pudo actualizar la pregunta"};
        }

        return {success : "Pregunta actualizada correctamente"};
    } catch (error) {
        console.log(error);
        return null;
    }
};