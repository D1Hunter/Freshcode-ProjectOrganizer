import { IUserProfile } from "./user-profile.interface";

export interface IComment {
    id:string;
    text:string;
    createdAt:string;
    userId:string;
    cardId:string;
}

export interface IFullComment{
    id:string;
    text:string;
    createdAt:string;
    user:IUserProfile;
}