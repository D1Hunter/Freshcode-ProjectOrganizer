import { IUserProfile } from "../../../models/user-profile.interface";

export enum AuthActionTypes {
    SET_USER = 'SET_USER',
    LOGOUT_USER   = 'LOGOUT_USER'
}

export interface SetUserAction {
    type: AuthActionTypes.SET_USER;
    payload: IUserProfile;
}


export interface LogoutUserAction{
    type: AuthActionTypes.LOGOUT_USER;
}

export type AuthAction = SetUserAction| LogoutUserAction