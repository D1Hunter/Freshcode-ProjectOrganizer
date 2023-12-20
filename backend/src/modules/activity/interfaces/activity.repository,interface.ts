import { Activity } from "../../../../prisma/generated/client";

export interface IActivityRepository {
    create(dto: Object): Promise<Activity>;
    getAll(): Promise<Array<Activity>>;
    getAllByBoardId(boardId: string): Promise<Array<Object>>;
    getAllByCardId(cardId: string): Promise<Array<Object>>;
    deleteAllByBoardId(boardId: string): Promise<Object>;
}