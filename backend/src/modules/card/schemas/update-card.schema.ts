import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const UpdateCardBodySchema = object({
    name: string().max(255).min(5).required(),
    description: string().max(500).required(),
    listId: string().uuid().required()
}).required('body cannot be empty');

const UpdateCardParamsSchema = object({
    id: string().uuid().required()
}).required('params cannot be empty');

export type UpdateCardBody = InferType<typeof UpdateCardBodySchema>;

export type UpdateCardParams = InferType<typeof UpdateCardParamsSchema>;

export const UpdateCardSchema: FastifySchema = {
    params: UpdateCardParamsSchema,
    body: UpdateCardBodySchema
};

export type UpdateCardRoute = {
    Params: UpdateCardParams;
    Body: UpdateCardBody;
};