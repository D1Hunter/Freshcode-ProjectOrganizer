import { Dispatch, useCallback, useState } from "react";
import { CommentAction } from "../reducers/comment/comment.action.interface";
import { CommentService } from "../../services/comment/comment.service";
import { addCommentAction, setCommentsAction } from "../reducers/comment/comment.action";
import { AxiosError } from "axios";
import { CreateCommentDto } from "../../services/comment/dto/create-comment.dto";

export const useComment = () => {
    const [isReady, setReady] = useState(false);

    const getCommentsByCardId = useCallback((cardId: string) => {
        return async (dispatch: Dispatch<CommentAction>) => {
            try {
                setReady(false);
                const token = localStorage.getItem('token');
                const response = await CommentService.getAllByCardId(token, cardId);
                dispatch(setCommentsAction(response.data.comments));
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data.message);
                }
            } finally {
                setReady(true);
            }
        }
    }, []);

    const addCommentToCard = (dto: CreateCommentDto) => {
        return async (dispatch: Dispatch<CommentAction>) => {
            try {
                setReady(false);
                const token = localStorage.getItem('token');
                const response = await CommentService.create(token, dto);
                dispatch(addCommentAction(response.data.comment));
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                }
            } finally {
                setReady(true);
            }
        }
    }

    return {
        isReady,
        getCommentsByCardId,
        addCommentToCard
    }
}