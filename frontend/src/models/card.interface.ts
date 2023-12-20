import { IFullComment } from "./comment.interface";
import { IList } from "./list.interface";

export interface ICard {
    id:string;
    name:string;
    listId:string;
}

export interface IFullCard extends ICard{
    description:string;
    comments:IFullComment[];
    list:IList;
}