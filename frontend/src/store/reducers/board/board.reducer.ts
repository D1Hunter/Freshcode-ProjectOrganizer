import { BoardAction, BoardActionTypes } from "./board.action.interface";
import { IBoardState } from "./board.state.interface";

const initialState: IBoardState = {
    currentBoard: null,
    boards:[]
}

export const boardReducer = (state=initialState, action: BoardAction):IBoardState =>{
    switch (action.type) {
        case BoardActionTypes.SET_BOARDS:
            return {
                ...state,
                boards:action.payload
            };
        case BoardActionTypes.SET_CURRENT_BOARD:
            return {
                ...state,
                currentBoard:action.payload,
            };
        case BoardActionTypes.UPDATE_BOARD:
            return {
                ...state,
                boards: [...state.boards.filter(board => board.id !== action.payload.id), action.payload]
            };
        case BoardActionTypes.DELETE_BOARD:
            const currentBoard = state.currentBoard?.id === action.payload ? null : state.currentBoard;
            return {
                ...state,
                boards:  [...state.boards.filter(board => board.id !== action.payload)],
                currentBoard:currentBoard
            };
        default:
            return state;
    }
}