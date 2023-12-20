import { IBoard, IFullBoard } from "../../../models/board.interface";

export enum BoardActionTypes {
    SET_BOARDS = 'SET_BOARDS',
    SET_CURRENT_BOARD = 'SET_CURRENT_BOARD',
    UPDATE_BOARD = 'UPDATE_BOARD',
    DELETE_BOARD = 'DELETE_BOARD'
}

export interface SetBoardsAction {
    type: BoardActionTypes.SET_BOARDS;
    payload: IBoard[];
}

export interface SetCurrentBoardAction {
    type: BoardActionTypes.SET_CURRENT_BOARD;
    payload: IFullBoard;
}

export interface UpdateBoardAction {
    type: BoardActionTypes.UPDATE_BOARD;
    payload: IBoard;
}

export interface DeleteBoardAction {
    type: BoardActionTypes.DELETE_BOARD;
    payload: string;
}

export type BoardAction = SetBoardsAction | SetCurrentBoardAction | UpdateBoardAction | DeleteBoardAction;