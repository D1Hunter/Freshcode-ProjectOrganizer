import { AxiosResponse } from "axios";
import { axiosInstance } from "..";
import { RegisterUserDto } from "./dto/register-user.dto";
import { IRegisterUserResponse } from "./interfaces/register-user.response";
import { LoginUserDto } from "./dto/login-user.dto";
import { ILoginUserResponse } from "./interfaces/login-user.response";
import { ILogoutResponse } from "./interfaces/logout-user.response";

export const AuthService = {
    async registration(body: RegisterUserDto): Promise<AxiosResponse<IRegisterUserResponse>> {
        return axiosInstance.post('/auth/register', { ...body });
    },
    async login(body:LoginUserDto): Promise<AxiosResponse<ILoginUserResponse>>{
        return axiosInstance.post('/auth/login', { ...body });
    },
    async auth(token: string | null): Promise<AxiosResponse<ILoginUserResponse>> {
        return axiosInstance.get('/auth', { headers: { Authorization: `Bearer ${token}` } });
    },
    async logout(token: string | null): Promise<AxiosResponse<ILogoutResponse>>{
        return axiosInstance.get('/auth/logout', { headers: { Authorization: `Bearer ${token}` } });
    }
}