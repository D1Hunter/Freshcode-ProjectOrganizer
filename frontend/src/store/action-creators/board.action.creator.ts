import { Dispatch, useCallback, useState } from "react";
import { CreateBoardDto } from "../../services/board/dto/create-board.dto";
import { BoardAction } from "../reducers/board/board.action.interface";
import { BoardService } from "../../services/board/board.service";
import { deleteBoardAction, setBoardsAction, setCurrentBoardAction } from "../reducers/board/board.action";
import { AxiosError } from "axios";
import { UpdateBoardDto } from "../../services/board/dto/update-board.dto";
import { setListsAction } from "../reducers/list/list.action";
import { useNavigate } from "react-router-dom";

export const useBoard = () => {
    const [isReady, setReady] = useState(false);
    const navigate = useNavigate();

    const createBoard = (dto: CreateBoardDto) => {
        return async (dispatch: Dispatch<BoardAction>) => {
            try {
                const token = localStorage.getItem('token');
                const response = await BoardService.create(token, dto);
                dispatch(setCurrentBoardAction({ ...response.data.board, lists: [] }));
                navigate(`/board/${response.data.board.id}`);
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                }
            }
        }
    }

    const getBoards = useCallback(() => {
        return async (dispatch: Dispatch<BoardAction>) => {
            try {
                setReady(false);
                const token = localStorage.getItem('token');
                const response = await BoardService.getAll(token);
                dispatch(setBoardsAction(response.data.boards));
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data.message);
                }
            } finally {
                setReady(true);
            }
        }
    }, [])

    const getBoardById = useCallback((id: string) => {
        return async (dispatch: Dispatch<any>) => {
            try {
                setReady(false);
                const token = localStorage.getItem('token');
                const response = await BoardService.getOneById(token, id);
                dispatch(setListsAction(response.data.board.lists));
                dispatch(setCurrentBoardAction(response.data.board));
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data.message);
                }
            } finally {
                setReady(true);
            }
        }
    }, [])

    const updateBoard = (id: string, dto: UpdateBoardDto) => {
        return async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await BoardService.update(token, id, dto);
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data.message);
                }
            }
        }
    }

    const deleteBoard = (id: string) => {
        return async (dispatch: Dispatch<BoardAction>) => {
            try {
                const token = localStorage.getItem('token');
                const response = await BoardService.delete(token, id);
                dispatch(deleteBoardAction(id));
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data.message);
                }
            }
        }
    }

    return {
        isReady,
        createBoard,
        getBoards,
        getBoardById,
        updateBoard,
        deleteBoard
    }
}