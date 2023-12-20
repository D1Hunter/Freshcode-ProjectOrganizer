import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const DeleteCardByIdParamsSchema = object({
    id: string().uuid().required()
}).required('params cannot be empty');

export type DeleteCardByIdParams = InferType<typeof DeleteCardByIdParamsSchema>;

export const DeleteCardByIdSchema: FastifySchema = {
    params: DeleteCardByIdParamsSchema
};

export type DeleteCardByIdRoute = {
    Params: DeleteCardByIdParams;
};