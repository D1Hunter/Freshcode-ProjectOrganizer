import { AxiosResponse } from "axios";
import { axiosInstance } from "..";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ICreateCommentResponse } from "./interfaces/create-comment.response";
import { IGetAllCommentsByCardId } from "./interfaces/get-all-comments-by-card-id";

export const CommentService = {
    async create(token: string | null, body: CreateCommentDto): Promise<AxiosResponse<ICreateCommentResponse>> {
        return axiosInstance.post('/comment/create', body, { headers: { Authorization: `Bearer ${token}` } });
    },
    async getAllByCardId(token: string | null, cardId:string): Promise<AxiosResponse<IGetAllCommentsByCardId>>{
        return axiosInstance.get(`/comment/allByCardId/${cardId}`, { headers: { Authorization: `Bearer ${token}` } });
    },
}