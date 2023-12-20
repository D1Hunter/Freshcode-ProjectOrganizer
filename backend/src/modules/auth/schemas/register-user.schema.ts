import { FastifySchema } from "fastify";
import { createYupSchema } from "fastify-yup-schema";
import { InferType, object, string } from "yup";

const RegisterUserBodySchema = object({
    email: string().email().required(),
    password: string().max(16).min(8).required()
}).required();

export type RegisterUserBody = InferType<typeof RegisterUserBodySchema>

export const RegisterUserSchema: FastifySchema = createYupSchema((yup) => ({
    body: RegisterUserBodySchema
}));

export type RegisterUserRoute = {
    Body: RegisterUserBody;
}