import { IUserProfile } from "../../../models/user-profile.interface";
import { AuthAction, AuthActionTypes } from "./auth.action.interface";

export const setUserAction = (payload: IUserProfile): AuthAction => ({ type: AuthActionTypes.SET_USER, payload });
export const logoutUserAction = (): AuthAction => ({ type: AuthActionTypes.LOGOUT_USER });