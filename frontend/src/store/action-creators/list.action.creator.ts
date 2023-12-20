import { Dispatch, useCallback, useState } from "react";
import { CreateListDto } from "../../services/list/dto/create-list.dto";
import { ListService } from "../../services/list/list.service";
import { AxiosError } from "axios";
import { addCardToListAction, createListAction, deleteListAction, removeCardFromListAction, setListsAction, updateListAction } from "../reducers/list/list.action";
import { ListAction } from "../reducers/list/list.action.interface";
import { CreateCardDto } from "../../services/card/dto/create-card.dto";
import { CardService } from "../../services/card/card.service";
import { UpdateListDto } from "../../services/list/dto/update-list.dto";

export const useList = () => {
    const [isReady, setReady] = useState(false);

    const createList = (dto: CreateListDto) => {
        return async (dispatch: Dispatch<ListAction>) => {
            try {
                setReady(false);
                const token = localStorage.getItem('token');
                const response = await ListService.create(token, dto);
                dispatch(createListAction(response.data.list));
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

    const getListsByBoardId = useCallback((boardId: string) => {
        return async (dispatch: Dispatch<ListAction>) => {
            try {
                setReady(false);
                const token = localStorage.getItem('token');
                const response = await ListService.getAllByBoardId(token, boardId);
                dispatch(setListsAction(response.data.lists));
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

    const addCardToList = (dto: CreateCardDto) => {
        return async (dispatch: Dispatch<ListAction>) => {
            try {
                setReady(false);
                const token = localStorage.getItem('token');
                const response = await CardService.create(token, dto);
                dispatch(addCardToListAction(response.data.card));
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

    const removeCardFromList = (cardId: string, listId: string) => {
        return async (dispatch: Dispatch<ListAction>) => {
            try {
                setReady(false);
                const token = localStorage.getItem('token');
                const response = await CardService.delete(token, cardId);
                dispatch(removeCardFromListAction({ cardId, listId }));
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

    const updateList = (id: string, dto: UpdateListDto) => {
        return async (dispatch: Dispatch<ListAction>) => {
            try {
                setReady(false);
                const token = localStorage.getItem('token');
                const response = await ListService.update(token, id, dto);
                dispatch(updateListAction({ id, name: dto.name }));
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                }
            }
            finally {
                setReady(true);
            }
        }
    }

    const deleteList = (id: string) => {
        return async (dispatch: Dispatch<ListAction>) => {
            try {
                setReady(false);
                const token = localStorage.getItem('token');
                const response = await ListService.delete(token, id);
                dispatch(deleteListAction(id));
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                }
            }
            finally {
                setReady(true);
            }
        }
    }


    return {
        isReady,
        createList,
        getListsByBoardId,
        addCardToList,
        removeCardFromList,
        updateList,
        deleteList
    }
}