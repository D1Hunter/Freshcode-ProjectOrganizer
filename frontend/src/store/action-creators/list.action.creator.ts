import { Dispatch, useState } from "react";
import { CreateListDto } from "../../services/list/dto/create-list.dto";
import { ListService } from "../../services/list/list.service";
import { AxiosError } from "axios";
import { createListAction, deleteListAction, updateListAction } from "../reducers/list/list.action";
import { ListAction } from "../reducers/list/list.action.interface";
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
        updateList,
        deleteList
    }
}