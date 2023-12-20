import { IUserProfile } from "../../../models/user-profile.interface";

export interface IAuthState{
    user:IUserProfile;
    isAuth:boolean;
}