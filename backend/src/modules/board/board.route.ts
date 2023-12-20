import { FastifyInstance } from "fastify";
import { CreateBoardRoute, CreateBoardSchema } from "./schemas/create-board.schema";
import { jwtAuth } from "../../hooks/jwt-auth.pre-parsing-hook";
import Container from 'typedi';
import BoardController from "./board.controller";
import { DeleteBoardRoute, DeleteBoardSchema } from "./schemas/delete-board.schema";
import { onSendSetStatusCode } from "../../hooks/set-response-status-code.on-send-hook";
import { HttpStatus } from "../../http/http-status.enum";
import { UpdateBoardSchema, UpdateBoardRoute } from "./schemas/update-board.schema";
import { GetBoardRoute, GetBoardSchema } from "./schemas/get-board.schema";

const boardRouter = async (app: FastifyInstance) => {
    const Controller = Container.get(BoardController);
    app.post<CreateBoardRoute>(
        "/create",
        { preParsing: jwtAuth, schema: CreateBoardSchema, onSend: onSendSetStatusCode(HttpStatus.CREATED) },
        Controller.create.bind(Controller));
    app.get("/all", { preParsing: jwtAuth }, Controller.getAll.bind(Controller));
    app.get<GetBoardRoute>("/:id", { preParsing: jwtAuth, schema: GetBoardSchema }, Controller.getOneById.bind(Controller));
    app.patch<UpdateBoardRoute>("/update/:id", { preParsing: jwtAuth, schema: UpdateBoardSchema }, Controller.update.bind(Controller));
    app.delete<DeleteBoardRoute>("/delete/:id", { preParsing: jwtAuth, schema: DeleteBoardSchema }, Controller.delete.bind(Controller));
}

export default boardRouter;