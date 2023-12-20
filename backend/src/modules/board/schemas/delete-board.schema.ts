import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const DeleteBoardParamsSchema = object({
    id: string().required('id is required in params')
}).required('params cannot be empty');

export type DeleteBoardParams = InferType<typeof DeleteBoardParamsSchema>;

export const DeleteBoardSchema: FastifySchema = {
    params: DeleteBoardParamsSchema
};

export type DeleteBoardRoute = {
    Params: DeleteBoardParams
}