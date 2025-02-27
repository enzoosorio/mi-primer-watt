import {object, string, minLength, pipe, InferOutput} from 'valibot'

export const QNASchemaValibot = object({ 
    username: string(),
    typeQuestion: string(),
    question: pipe(string(), minLength(4, "La pregunta debe tener como mínimo 4 caracteres.")),
})

export type QNASchemaValibotType = InferOutput<typeof QNASchemaValibot>