import { FastifyInstance } from "fastify";
import Container from "typedi";
import { jwtAuth } from "../../hooks/jwt-auth.pre-parsing-hook";
import CardController from "./card.controller";
import { CreateCardRoute, CreateCardSchema } from "./schemas/create-card.schema";
import { UpdateCardRoute, UpdateCardSchema } from "./schemas/update-card.schema";
import { GetAllByListRoute, GetAllByListSchema } from "./schemas/get-all-by-list.schema";
import { GetCardByIdRoute } from "./schemas/get-card-by-id.schema";
import { DeleteCardByIdRoute, DeleteCardByIdSchema } from "./schemas/delete-card.schema";
import { MoveCardToListParams, MoveCardToListRoute, MoveCardToListSchema } from "./schemas/move-card-to-list.schema";

const cardRouter = async (app: FastifyInstance) => {
    const Controller = Container.get(CardController);
    app.post<CreateCardRoute>("/create", { preParsing: jwtAuth, schema: CreateCardSchema }, Controller.create.bind(Controller));
    app.get<GetAllByListRoute>("/allByListId/:listId", { preParsing: jwtAuth, schema:GetAllByListSchema }, Controller.getAllByListId.bind(Controller));
    app.get<GetCardByIdRoute>("/:id", { preParsing: jwtAuth }, Controller.getOneById.bind(Controller));
    app.put<MoveCardToListRoute>("/moveCardToList/:id/:listId",{ preParsing: jwtAuth, schema:MoveCardToListSchema}, Controller.moveToList.bind(Controller));
    app.patch<UpdateCardRoute>("/update/:id", { preParsing: jwtAuth, schema: UpdateCardSchema }, Controller.update.bind(Controller));
    app.delete<DeleteCardByIdRoute>("/delete/:id", { preParsing: jwtAuth, schema:DeleteCardByIdSchema }, Controller.delete.bind(Controller));
}

export default cardRouter;