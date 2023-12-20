import { Comment } from "../../../../prisma/generated/client";
import { IBaseRepository } from "../../../interfaces/baserepository.interface";

export interface ICommentRepository extends IBaseRepository<Comment> {
    getAllByCardId(cardId: string): Promise<Object[] | null>;
    deleteAllByCardId(cardId:string):Promise<Object>;
    deleteAllByListId(listId: string): Promise<Object>;
    deleteAllByBoardId(boardId: string): Promise<Object>;
}