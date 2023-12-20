import { Dispatch, useCallback, useState } from "react";
import { RegisterUserDto } from "../../services/auth/dto/register-user.dto";
import { AuthAction } from "../reducers/auth/auth.action.interface";
import { AuthService } from "../../services/auth/auth.service";
import { AxiosError } from "axios";
import { LoginUserDto } from "../../services/auth/dto/login-user.dto";
import { logoutUserAction, setUserAction } from "../reducers/auth/auth.action";

export const useAuth = () => {
    const [isReady, setIsReady] = useState(false);
    
    const registerUser = (body: RegisterUserDto) => {
        return async (dispatch: Dispatch<AuthAction>) => {
            try {
                const response = await AuthService.registration(body);
                dispatch(setUserAction(response.data.user));
                localStorage.setItem('token', response.data.token);
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                }
            }
        }
    };

    const loginUser = (body: LoginUserDto) => {
        return async (dispatch: Dispatch<AuthAction>) => {
            try {
                const response = await AuthService.login(body);
                dispatch(setUserAction(response.data.user));
                localStorage.setItem('token', response.data.token);
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                }
            }
        }
    };

    const auth = useCallback(() => {
        return async (dispatch: Dispatch<AuthAction>) => {
            try {
                const token = localStorage.getItem('token');
                const response = await AuthService.auth(token);
                dispatch(setUserAction(response.data.user));
                localStorage.setItem('token', response.data.token);
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data.message);
                }
                localStorage.removeItem('token');
                dispatch(logoutUserAction());
            } finally {
                setIsReady(true);
            }
        }
    },[]);

    const logout = () => {
        return async (dispatch: Dispatch<AuthAction>) => {
            try {
                const token = localStorage.getItem('token');
                const response = await AuthService.logout(token);
                dispatch(logoutUserAction());
                localStorage.removeItem('token');
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                }
            }
        }
    };

    return {
        isReady,
        registerUser,
        loginUser,
        auth,
        logout
    }
}