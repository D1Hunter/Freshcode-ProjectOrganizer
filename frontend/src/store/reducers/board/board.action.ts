import { IBoard, IFullBoard } from "../../../models/board.interface";
import { BoardAction, BoardActionTypes } from "./board.action.interface";

export const setBoardsAction = (payload: IBoard[]): BoardAction => ({ type: BoardActionTypes.SET_BOARDS, payload });
export const setCurrentBoardAction = (payload: IFullBoard): BoardAction =>({type: BoardActionTypes.SET_CURRENT_BOARD, payload});
export const updateBoardAction = (payload: IBoard): BoardAction =>({type: BoardActionTypes.UPDATE_BOARD, payload});
export const deleteBoardAction = (payload: string): BoardAction =>({type: BoardActionTypes.DELETE_BOARD, payload});