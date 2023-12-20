import { List } from "../../../../prisma/generated/client";
import { IBaseRepository } from "../../../interfaces/baserepository.interface";

export interface IListRepository extends IBaseRepository<List> {
    deleteAllByBoardId(boardId:string):Object
}