import { FastifyInstance } from "fastify";
import { jwtAuth } from "../../hooks/jwt-auth.pre-parsing-hook";
import { CreateListRoute, CreateListSchema } from "./schemas/create-list.schema";
import Container from "typedi";
import ListController from "./list.controller";
import { UpdateListRoute, UpdateListSchema } from "./schemas/update-list.schema";
import { GetAllByBoardRoute, GetAllByBoardSchema } from "./schemas/get-all-by-board.schema";
import { DeleteListRoute } from "./schemas/delete-list.schema";

const listRouter = async (app: FastifyInstance) => {
    const Controller = Container.get(ListController);
    app.post<CreateListRoute>("/create", { preParsing: jwtAuth, schema: CreateListSchema }, Controller.create.bind(Controller));
    app.get<GetAllByBoardRoute>("/allByBoardId/:boardId", { preParsing: jwtAuth, schema: GetAllByBoardSchema}, Controller.getAllByBoardId.bind(Controller));
    app.patch<UpdateListRoute>("/update/:id", { preParsing: jwtAuth, schema: UpdateListSchema }, Controller.update.bind(Controller));
    app.delete<DeleteListRoute>("/delete/:id", { preParsing: jwtAuth }, Controller.delete.bind(Controller));
}

export default listRouter;