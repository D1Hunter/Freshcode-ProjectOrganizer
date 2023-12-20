import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const UpdateListParamsSchema = object({
    id: string().required()
}).required('params cannot be empty');

const UpdateListBodySchema = object({
    name: string().max(255).min(5).required(),
}).required('body cannot be empty');

export type UpdateListParams = InferType<typeof UpdateListParamsSchema>;

export type UpdateListBody = InferType<typeof UpdateListBodySchema>;

export const UpdateListSchema: FastifySchema = {
    body: UpdateListBodySchema
};

export type UpdateListRoute = {
    Params:UpdateListParams;
    Body: UpdateListBody;
};