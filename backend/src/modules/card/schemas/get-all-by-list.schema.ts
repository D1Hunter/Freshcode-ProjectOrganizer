import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const GetAllByListParamsSchema = object({
    listId: string().uuid().required()
}).required('params cannot be empty');

export type GetAllByListParams = InferType<typeof GetAllByListParamsSchema>;

export const GetAllByListSchema: FastifySchema = {
    params: GetAllByListParamsSchema
};

export type GetAllByListRoute = {
    Params: GetAllByListParams;
};