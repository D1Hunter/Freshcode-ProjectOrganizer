import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const DeleteListParamsSchema = object({
    id: string().required('id is required in params')
}).required('params cannot be empty');

export type DeleteListParams = InferType<typeof DeleteListParamsSchema>;

export const DeleteListSchema: FastifySchema = {
    params: DeleteListParamsSchema
};

export type DeleteListRoute = {
    Params: DeleteListParams;
};