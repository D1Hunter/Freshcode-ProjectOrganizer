import { IUserProfile } from "../../../models/user-profile.interface";

export interface ILoginUserResponse{
    user:IUserProfile;
    token:string;
}