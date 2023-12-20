import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const CreateCardBodySchema = object({
    name: string().max(255).min(5).required(),
    listId: string().uuid().required()
}).required('body cannot be empty');

export type CreateCardBody = InferType<typeof CreateCardBodySchema>;

export const CreateCardSchema: FastifySchema = {
    body: CreateCardBodySchema
};

export type CreateCardRoute = {
    Body: CreateCardBody;
}