import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const CreateCommentBodySchema = object({
    text: string().trim().min(5).required(),
    cardId: string().uuid().required(),
}).required('body cannot be empty');

export type CreateCommentBody = InferType<typeof CreateCommentBodySchema>

export const CreateCommentSchema: FastifySchema = {
    body: CreateCommentBodySchema
};

export type CreateCommentRoute = {
    Body: CreateCommentBody
}