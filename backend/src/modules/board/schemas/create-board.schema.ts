import { FastifySchema, RouteGenericInterface } from "fastify";
import { InferType, object, string } from "yup";

const CreateBoardBodySchema = object({
    name: string().max(255).min(5).required()
}).required('body cannot be empty');

export type CreateBoardBody = InferType<typeof CreateBoardBodySchema>;

export const CreateBoardSchema: FastifySchema = {
    body: CreateBoardBodySchema
};

export type CreateBoardRoute = {
    Body:CreateBoardBody;
};