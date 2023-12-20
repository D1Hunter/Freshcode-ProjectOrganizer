import { IFullComment } from "../../../models/comment.interface";

export enum CommentActionTypes {
    SET_COMMENTS = 'SET_COMMENTS',
    ADD_COMMENT = "ADD_COMMENT"
}

export interface SetCommentsAction {
    type: CommentActionTypes.SET_COMMENTS;
    payload: IFullComment[];
}

export interface AddCommentAction {
    type: CommentActionTypes.ADD_COMMENT;
    payload: IFullComment;
}

export type CommentAction = SetCommentsAction | AddCommentAction;