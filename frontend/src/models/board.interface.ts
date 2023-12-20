import { IFullList } from "./list.interface";

export interface IBoard {
    id:string;
    name:string;
    userId:string;
}

export interface IFullBoard extends IBoard{
    lists:IFullList[]
}