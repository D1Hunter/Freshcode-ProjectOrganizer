import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const CreateActivityTypeBodySchema = object({
    name: string().max(255).min(5).required()
}).required('body cannot be empty');

export type CreateActivityTypeBody = InferType<typeof CreateActivityTypeBodySchema>

export const CreateActivityTypeSchema: FastifySchema = {
    body: CreateActivityTypeBodySchema
};

export type CreateActivityTypeRoute = {
    Body: CreateActivityTypeBody;
};