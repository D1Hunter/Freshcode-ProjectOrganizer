import { AxiosResponse } from "axios";
import { CreateListDto } from "./dto/create-list.dto";
import { axiosInstance } from "..";
import { ICreateListResponse } from "./interfaces/create-list.response";
import { UpdateListDto } from "./dto/update-list.dto";
import { IUpdateListResponse } from "./interfaces/update-list.response";
import { IDeleteListResponse } from "./interfaces/delete-list.response";
import { IGetAllListsByBoardId } from "./interfaces/get-all-lists-by-board-id";

export const ListService = {
    async create(token: string | null, body: CreateListDto): Promise<AxiosResponse<ICreateListResponse>> {
        return axiosInstance.post('/list/create', body, { headers: { Authorization: `Bearer ${token}` } });
    },
    async getAllByBoardId(token: string | null, boardId: string): Promise<AxiosResponse<IGetAllListsByBoardId>> {
        return axiosInstance.get(`/list/allByBoardId/${boardId}`, { headers: { Authorization: `Bearer ${token}` } });
    },
    async update(token: string | null, id: string, body: UpdateListDto): Promise<AxiosResponse<IUpdateListResponse>> {
        return axiosInstance.patch(`/list/update/${id}`, body, { headers: { Authorization: `Bearer ${token}` } });
    },
    async delete(token: string | null, id: string): Promise<AxiosResponse<IDeleteListResponse>> {
        return axiosInstance.delete(`/list/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    }
}