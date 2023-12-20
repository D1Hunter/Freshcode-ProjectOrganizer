import { ICard } from "../../../models/card.interface";
import { IFullList, IList } from "../../../models/list.interface";
import { ListAction, ListActionTypes } from "./list.action.interface";

export const createListAction = (payload: IList): ListAction => ({ type: ListActionTypes.CREATE_LIST, payload });
export const setListsAction = (payload: IFullList[]): ListAction => ({ type: ListActionTypes.SET_LISTS, payload });
export const addCardToListAction = (payload: ICard): ListAction => ({ type: ListActionTypes.ADD_CARD_TO_LIST, payload });
export const removeCardFromListAction = (payload: { listId: string, cardId: string }): ListAction => ({ type: ListActionTypes.REMOVE_CARD_FROM_LIST, payload });
export const moveCardToAnotherListAction = (payload: {
    sourceCardIndex:number,
    cardId: string,
    sourceListId: string,
    destinationListId: string
}): ListAction => ({ type: ListActionTypes.MOVE_CARD_TO_ANOTHER_LIST, payload });
export const updateListAction = (payload: IList): ListAction => ({ type: ListActionTypes.UPDATE_LIST, payload });
export const deleteListAction = (payload: string): ListAction => ({ type: ListActionTypes.DELETE_LIST, payload });