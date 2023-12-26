import { Dispatch, useCallback, useState } from "react";
import { CardAction } from "../reducers/card/card.action.interface";
import { CardService } from "../../services/card/card.service";
import { AxiosError } from "axios";
import { setCurrentCardAction } from "../reducers/card/card.action";
import { UpdateCardDto } from "../../services/card/dto/update-card.dto";
import { IFullCard } from "../../models/card.interface";
import { addCardToListAction, moveCardToAnotherListAction, removeCardFromListAction } from "../reducers/list/list.action";
import { ListAction } from "../reducers/list/list.action.interface";
import { CreateCardDto } from "../../services/card/dto/create-card.dto";

export const useCard = () => {
    const [isReady, setReady] = useState(false);

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

    const getCardById = useCallback((id: string) => {
        return async (dispatch: Dispatch<CardAction>) => {
            try {
                setReady(false);
                const token = localStorage.getItem('token');
                const response = await CardService.getOneById(token, id);
                dispatch(setCurrentCardAction(response.data.card));
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data.message);
                }
            } finally {
                setReady(true);
            }
        }
    }, []);

    const moveCardToList = (id: string, sourceCardIndex: number, sourceListId: string, destinationListId: string) => {
        return async (dispatch: Dispatch<ListAction>) => {
            try {
                setReady(false);
                const token = localStorage.getItem('token');
                const response = await CardService.moveCardToList(token, id, destinationListId);
                dispatch(moveCardToAnotherListAction({ sourceCardIndex, cardId: id, destinationListId, sourceListId }));
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

    const updateCard = (card: IFullCard, dto: UpdateCardDto) => {
        return async (dispatch: Dispatch<CardAction>) => {
            try {
                const token = localStorage.getItem('token');
                const response = await CardService.update(token, card.id, dto);
                dispatch(setCurrentCardAction({ ...card, ...dto }));
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
        addCardToList,
        removeCardFromList,
        getCardById,
        moveCardToList,
        updateCard
    }
}