import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const GetActivitiesByCardParams = object({
    cardId: string().required('id is required in params')
}).required('params cannot be empty');

export type GetActivitiesByCardParams = InferType<typeof GetActivitiesByCardParams>

export const GetActivitiesByCardSchema: FastifySchema = {
    params: GetActivitiesByCardParams
};

export type GetActivitiesByCardRoute = {
    Params: GetActivitiesByCardParams;
};