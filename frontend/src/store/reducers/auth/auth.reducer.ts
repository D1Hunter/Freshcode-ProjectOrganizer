import { AuthAction, AuthActionTypes } from "./auth.action.interface";
import { IAuthState } from "./auth.state.interface";

const initialState: IAuthState = {
    user:{
        id: "",
        email: ""
    },
    isAuth: false
}

export const authReducer = (state = initialState, action: AuthAction): IAuthState => {
    switch (action.type) {
        case AuthActionTypes.SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuth: true
            };
        case AuthActionTypes.LOGOUT_USER:
            return {
                ...state,
                user: {
                    id: "",
                    email: ""
                },
                isAuth: false
            };
        default:
            return state;
    };
};