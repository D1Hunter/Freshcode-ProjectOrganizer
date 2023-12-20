import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const GetBoardParamsSchema = object({
    id: string().required('id is required in params')
}).required('params cannot be empty');

export type GetBoardParams = InferType<typeof GetBoardParamsSchema>;

export const GetBoardSchema: FastifySchema = {
    params: GetBoardParamsSchema
};

export type GetBoardRoute = {
    Params: GetBoardParams;
};