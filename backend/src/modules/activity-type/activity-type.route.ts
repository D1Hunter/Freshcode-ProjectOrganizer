import { FastifyInstance } from "fastify";
import Container from "typedi";
import ActivityTypeController from "./activity-type.controller";
import { CreateActivityTypeRoute, CreateActivityTypeSchema } from "./schemas/create-activity-type.schema";
import { jwtAuth } from "../../hooks/jwt-auth.pre-parsing-hook";
import { onSendSetStatusCode } from "../../hooks/set-response-status-code.on-send-hook";
import { HttpStatus } from "../../http/http-status.enum";

const activityTypeRouter = async (app: FastifyInstance) => {
    const Controller = Container.get(ActivityTypeController);
    app.post<CreateActivityTypeRoute>("/create",
        { preParsing: jwtAuth, schema: CreateActivityTypeSchema, onSend: onSendSetStatusCode(HttpStatus.CREATED) },
        Controller.create.bind(Controller));
    app.get("/all", { preParsing: jwtAuth }, Controller.getAll.bind(Controller));
}

export default activityTypeRouter;