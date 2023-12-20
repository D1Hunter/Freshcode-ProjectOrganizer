import { FastifyInstance } from "fastify";
import Container from "typedi";
import { jwtAuth } from "../../hooks/jwt-auth.pre-parsing-hook";
import ActivityController from "./activity.controller";
import { GetActivitiesByBoardRoute, GetActivitiesByBoardSchema } from "./schemas/get-activities-by-board.schema";
import { GetActivitiesByCardRoute, GetActivitiesByCardSchema } from "./schemas/get-activities-by-card.schema";

const activityRouter = async (app: FastifyInstance) => {
    const Controller = Container.get(ActivityController);
    app.get<GetActivitiesByBoardRoute>("/allByBoardId/:boardId", { preParsing: jwtAuth, schema:GetActivitiesByBoardSchema }, Controller.getAllByBoardId.bind(Controller));
    app.get<GetActivitiesByCardRoute>("/allByCardId/:cardId", { preParsing: jwtAuth, schema:GetActivitiesByCardSchema }, Controller.getAllByCardId.bind(Controller));
}

export default activityRouter;