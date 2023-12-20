import { AxiosResponse } from "axios";
import { axiosInstance } from "..";
import { IGetAllActivitiesByBoardId } from "./interfaces/get-all-activities-by-board-id.response copy";
import { IGetAllActivitiesByCardId } from "./interfaces/get-all-activities-by-card-id.response";

export const ActivityService = {
    async getAllByBoardId(token: string | null, boardId: string): Promise<AxiosResponse<IGetAllActivitiesByBoardId>>{
        return axiosInstance.get(`/activity/allByBoardId/${boardId}`, { headers: { Authorization: `Bearer ${token}` } });
    },
    async getAllByCardId(token: string | null, cardId: string): Promise<AxiosResponse<IGetAllActivitiesByCardId>>{
        return axiosInstance.get(`/activity/allByCardId/${cardId}`, { headers: { Authorization: `Bearer ${token}` } });
    }
}