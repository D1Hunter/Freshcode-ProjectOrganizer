import { Card } from "../../../../prisma/generated/client";
import { IBaseRepository } from "../../../interfaces/baserepository.interface";

export interface ICardRepository extends IBaseRepository<Card> {
    deleteAllByListId(listId: string): Promise<Object>;
    deleteAllByBoardId(boardId: string): Promise<Object>;
}