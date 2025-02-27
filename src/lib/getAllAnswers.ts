"use server";
import QnACollection, { IQnA } from "../schemas/mongooseSchemas/QnA";
import connectDB from "../utils/db";

export const getAllAnswersByPage = async (page: number = 1, limit: number = 5) => {
   try {
       await connectDB();

       // Obtener el total de documentos
       const totalDocuments = await QnACollection.countDocuments({
        state: { $in: ["aprobada", "respondida"] },
        typeQuestion: "publico"
    });
       const totalPages = Math.ceil(totalDocuments / limit);

       // Obtener los documentos de la página actual
       const qna: IQnA[] = JSON.parse(JSON.stringify(
        await QnACollection.find({
            state: { $in: ["aprobada", "respondida"] },
            typeQuestion: "publico"
        })
        .skip((page - 1) * limit)
        .limit(limit)
    ));

       return {
           data: qna,
           totalPages,
           currentPage: page,
           totalDocuments
       };
   } catch (error) {
       console.log(error);
       return null;
   }
};

 export const getAllAnswers = async () => {
    try {
        await connectDB();
        const qna : IQnA[] = JSON.parse(JSON.stringify(await QnACollection.find({
            state: { $in: ["aprobada", "respondida"] },
            typeQuestion: "publico"
        })));
 
        if (!qna || qna.length === 0) {
           return null;
        }
 
        return qna;
     } catch (error) {
         console.log(error);
         return null;
     }
  };