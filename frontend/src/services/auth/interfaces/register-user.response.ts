import { IUserProfile } from "../../../models/user-profile.interface";

export interface IRegisterUserResponse{
    user:IUserProfile;
    token:string;
}