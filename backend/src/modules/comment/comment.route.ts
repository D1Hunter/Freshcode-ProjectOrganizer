import { FastifyInstance } from "fastify";
import CommentController from "./comment.controller";
import Container from "typedi";
import { CreateCommentRoute, CreateCommentSchema } from "./schemas/create-comment.schema";
import { jwtAuth } from "../../hooks/jwt-auth.pre-parsing-hook";
import { GetAllByCardRoute, GetAllByCardSchema } from "./schemas/get-all-by-card.schema";

const commentRouter = async (app: FastifyInstance) => {
    const Controller = Container.get(CommentController);
    app.post<CreateCommentRoute>("/create", { preParsing: jwtAuth, schema: CreateCommentSchema }, Controller.create.bind(Controller));
    app.get<GetAllByCardRoute>("/allByCardId/:cardId", { preParsing: jwtAuth, schema: GetAllByCardSchema }, Controller.getAllCommentsByCardId.bind(Controller));
}

export default commentRouter;