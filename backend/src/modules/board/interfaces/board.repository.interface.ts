import { Board } from "../../../../prisma/generated/client";
import { IBaseRepository } from "../../../interfaces/baserepository.interface";

export interface IBoardRepository  {
    create(dto: Object): Promise<Board>;
    getOneById(id: string): Promise<Board | null>;
    getAll(): Promise<Array<Object>>;
    update(id: string, dto: Object): Promise<Board>;
    delete(id: string): Promise<Board | null>;
}