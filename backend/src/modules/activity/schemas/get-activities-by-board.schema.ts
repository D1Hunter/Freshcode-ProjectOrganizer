import { FastifySchema } from "fastify";
import { InferType, array, object, string } from "yup";

const GetActivitiesByBoardParamsSchema = object({
    boardId: string().required('id is required in params')
}).required('params cannot be empty');

export type GetActivitiesByBoardParams = InferType<typeof GetActivitiesByBoardParamsSchema>

export const GetActivitiesByBoardSchema: FastifySchema = {
    params: GetActivitiesByBoardParamsSchema
};

export type GetActivitiesByBoardRoute = {
    Params: GetActivitiesByBoardParams;
};