import { IFullComment } from "../../../models/comment.interface";
import { CommentAction, CommentActionTypes } from "./comment.action.interface";

export const setCommentsAction = (payload: IFullComment[]): CommentAction => ({ type: CommentActionTypes.SET_COMMENTS, payload });
export const addCommentAction = (payload: IFullComment): CommentAction =>({type: CommentActionTypes.ADD_COMMENT, payload});