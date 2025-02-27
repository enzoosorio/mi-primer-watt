import {date, object, string, minLength, pipe, required, InferOutput, transform, includes, enum_, optional} from 'valibot'

enum typesQuestions {
    "publico" = "publico",
    "privado" = "privado"
}


export const QNASchemaValibot = object({ 
    username: string(),
    typeQuestion: string(),
    question: pipe(string(), minLength(4, "La pregunta debe tener como mínimo 4 caracteres.")),
})

export type QNASchemaValibotType = InferOutput<typeof QNASchemaValibot>