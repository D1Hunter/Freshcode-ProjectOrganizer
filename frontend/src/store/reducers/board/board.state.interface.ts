import { IBoard, IFullBoard } from "../../../models/board.interface";

export interface IBoardState{
    currentBoard:IFullBoard | null;
    boards:IBoard[];
}