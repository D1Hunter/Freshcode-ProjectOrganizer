import { FastifySchema } from "fastify";
import { InferType, object, string } from "yup";

const LoginUserBodySchema= object({
    email: string().email().required(),
    password: string().max(16).min(8).required()
}).required();

export type LoginUserBody = InferType<typeof LoginUserBodySchema>

export const LoginUserSchema: FastifySchema = {
    body: LoginUserBodySchema,
};

export type LoginUserRoute = {
    Body: LoginUserBody;
};
