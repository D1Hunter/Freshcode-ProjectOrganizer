import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const UpdateBoardParamsSchema = object({
    id: string().required('id is required in params')
}).required('params cannot be empty');

const UpdateBoardBodySchema = object({
    name: string().max(255).min(5).required()
}).required('body cannot be empty');

export type UpdateBoardParams = InferType<typeof UpdateBoardParamsSchema>;

export type UpdateBoardBody = InferType<typeof UpdateBoardBodySchema>;

export const UpdateBoardSchema: FastifySchema = {
    params: UpdateBoardParamsSchema,
    body: UpdateBoardBodySchema
};

export type UpdateBoardRoute = {
    Params: UpdateBoardParams;
    Body: UpdateBoardBody;
};