import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const GetCardByIdParamsSchema = object({
    id: string().uuid().required()
}).required('params cannot be empty');

export type GetCardByIdParams = InferType<typeof GetCardByIdParamsSchema>;

export const GetCardSchema: FastifySchema = {
    params: GetCardByIdParamsSchema
};

export type GetCardByIdRoute = {
    Params: GetCardByIdParams;
};