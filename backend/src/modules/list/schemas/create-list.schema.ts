import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const CreateListBodySchema = object({
    name: string().max(255).min(5).required(),
    boardId: string().uuid().required()
});

export type CreateListBody = InferType<typeof CreateListBodySchema>;

export const CreateListSchema: FastifySchema = {
    body: CreateListBodySchema
};

export type CreateListRoute = {
    Body: CreateListBody;
};