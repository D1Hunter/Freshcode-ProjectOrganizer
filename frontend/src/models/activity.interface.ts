import { IUserProfile } from "./user-profile.interface";

export interface IActivity{
    id:string,
    description:string,
    createdAt:string,
    user:IUserProfile,
    boardId:string,
    cardId:string
}