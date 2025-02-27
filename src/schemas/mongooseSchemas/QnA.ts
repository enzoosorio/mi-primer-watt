import mongoose from "mongoose";


const typesQnA = ['pendiente', 'aprobada', 'respondida']
const typesQuestion = ['publico', 'privado']

const checkIsValidState = (value : string) => {
    return typesQnA.includes(value)
}

const checkIsValidQuestionType = (value : string) => {
    return typesQuestion.includes(value)
}

export interface IQnA {
    username: string,
    typeQuestion: string,
    question: string,
    answer: string,
    state: string,
    createdAt: Date,
    updatedAt: Date,
}

const qnaSchema = new mongoose.Schema<IQnA>({
    username : {
        type: String,
        required: true,
    },
    typeQuestion : {
        type: String,
        default: "publico",
        validate :{ 
            validator: checkIsValidQuestionType,
            message: props => `${props.value} no es un tipo de pregunta valido`
        },
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        default: "",
    },
    state : {
        type: String,
        default: "pendiente",
        validate: {
            validator: checkIsValidState,
            message: props => `${props.value} no es un estado valido`,
        },
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
})

const QnACollection = mongoose.models.QuestionsAnswers || mongoose.model<IQnA>("QuestionsAnswers", qnaSchema );

export default QnACollection
