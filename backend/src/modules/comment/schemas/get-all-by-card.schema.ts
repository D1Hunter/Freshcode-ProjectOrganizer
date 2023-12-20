import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const GetAllByCardParamsSchema = object({
    cardId: string().uuid().required()
}).required();

export type GetAllByCardParams = InferType<typeof GetAllByCardParamsSchema>;

export const GetAllByCardSchema: FastifySchema = {
    params: GetAllByCardParamsSchema
};

export type GetAllByCardRoute = {
    Params: GetAllByCardParams;
};