import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RegisterUserRoute, RegisterUserSchema } from "./schemas/register-user.schema";
import { onSendSetStatusCode } from "../../hooks/set-response-status-code.on-send-hook";
import { HttpStatus } from "../../http/http-status.enum";
import Container from "typedi";
import AuthController from "./auth.controller";
import { LoginUserRoute, LoginUserSchema } from "./schemas/login-user.schema";
import { jwtAuth } from "../../hooks/jwt-auth.pre-parsing-hook";

const authRouter = async (app: FastifyInstance) => {
  const Controller = Container.get(AuthController);
  app.post<RegisterUserRoute>("/register",
    { schema: RegisterUserSchema, onSend: onSendSetStatusCode(HttpStatus.CREATED) },
    Controller.register.bind(Controller));
  app.post<LoginUserRoute>("/login", { schema: LoginUserSchema }, Controller.login.bind(Controller));
  app.get("/", { preHandler: jwtAuth }, Controller.auth.bind(Controller));
  app.get("/logout", { preHandler: jwtAuth }, Controller.logout.bind(Controller));
}

export default authRouter;
