import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const GetAllByBoardParamsSchema = object({
    boardId: string().required()
}).required('params cannot be empty');

export type GetAllByBoardParams = InferType<typeof GetAllByBoardParamsSchema>;

export const GetAllByBoardSchema: FastifySchema = {
    params: GetAllByBoardParamsSchema
};

export type GetAllByBoardRoute = {
    Params:GetAllByBoardParams;
};