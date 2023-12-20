import { ICard } from "./card.interface";

export interface IList{
    id:string;
    name:string;
}

export interface IFullList extends IList{
    cards:ICard[];
}