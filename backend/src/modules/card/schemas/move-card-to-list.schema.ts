import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const MoveCardToListParamsSchema = object({
    id: string().uuid().required(),
    listId: string().uuid().required()
}).required('params cannot be empty');

export type MoveCardToListParams = InferType<typeof MoveCardToListParamsSchema>;

export const MoveCardToListSchema: FastifySchema = {
    params: MoveCardToListParamsSchema
};

export type MoveCardToListRoute = {
    Params: MoveCardToListParams;
};