import { CommentAction, CommentActionTypes } from "./comment.action.interface"
import { ICommentState } from "./comment.state.interface"

const initialState: ICommentState = {
    comments: []
}

export const commentReducer = (state = initialState, action: CommentAction): ICommentState => {
    switch (action.type) {
        case CommentActionTypes.SET_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }
        case CommentActionTypes.ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }
        default:
            return state;
    }
}