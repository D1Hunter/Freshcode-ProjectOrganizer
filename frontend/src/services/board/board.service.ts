import { AxiosResponse } from "axios";
import { CreateBoardDto } from "./dto/create-board.dto";
import { axiosInstance } from "..";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { IDeleteBoardResponse } from "./interfaces/delete-board.response";
import { IUpdateBoardResponse } from "./interfaces/update-board.response";
import { ICreateBoardResponse } from "./interfaces/create-board.response";
import { IGetAllBoardsResponse } from "./interfaces/get-all-boards.response";
import { IGetOneBoardByIdResponse } from "./interfaces/get-one-board-by-id.response";

export const BoardService = {
    async create(token: string | null, body: CreateBoardDto): Promise<AxiosResponse<ICreateBoardResponse>> {
        return axiosInstance.post('/board/create', body, { headers: { Authorization: `Bearer ${token}` } });
    },
    async getAll(token: string | null): Promise<AxiosResponse<IGetAllBoardsResponse>> {
        return axiosInstance.get('/board/all', { headers: { Authorization: `Bearer ${token}` } });
    },
    async getOneById(token: string | null, id: string): Promise<AxiosResponse<IGetOneBoardByIdResponse>> {
        return axiosInstance.get(`/board/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    },
    async update(token: string | null, id: string, body: UpdateBoardDto): Promise<AxiosResponse<IUpdateBoardResponse>> {
        return axiosInstance.patch(`/board/update/${id}`, body, { headers: { Authorization: `Bearer ${token}` } });
    },
    async delete(token: string | null, id: string): Promise<AxiosResponse<IDeleteBoardResponse>> {
        return axiosInstance.delete(`/board/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    }
}