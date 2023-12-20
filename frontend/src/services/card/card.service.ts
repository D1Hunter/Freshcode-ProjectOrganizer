import { AxiosResponse } from "axios";
import { axiosInstance } from "..";
import { CreateCardDto } from "./dto/create-card.dto";
import { ICreateCardResponse } from "./interfaces/create-card.response";
import { UpdateCardDto } from "./dto/update-card.dto";
import { IUpdateCardResponse } from "./interfaces/update-card.response";
import { IDeleteСardResponse } from "./interfaces/delete-card.response";
import { IGetOneCardByIdResponse } from "./interfaces/get-one-card-by-id.response";
import { IMoveCardToListResponse } from "./interfaces/move-card-to-list.response";

export const CardService = {
    async create(token: string | null, body: CreateCardDto): Promise<AxiosResponse<ICreateCardResponse>> {
        return axiosInstance.post('/card/create', body, { headers: { Authorization: `Bearer ${token}` } });
    },
    async getOneById(token: string | null, id: string): Promise<AxiosResponse<IGetOneCardByIdResponse>> {
        return axiosInstance.get(`/card/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    },
    async moveCardToList(token: string | null, id: string, listId: string): Promise<AxiosResponse<IMoveCardToListResponse>> {
        return axiosInstance.put(`/card/moveCardToList/${id}/${listId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    },
    async update(token: string | null, id: string, body: UpdateCardDto): Promise<AxiosResponse<IUpdateCardResponse>> {
        return axiosInstance.patch(`/card/update/${id}`, body, { headers: { Authorization: `Bearer ${token}` } });
    },
    async delete(token: string | null, id: string): Promise<AxiosResponse<IDeleteСardResponse>> {
        return axiosInstance.delete(`/card/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    }
}