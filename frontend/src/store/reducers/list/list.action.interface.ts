import { ICard } from "../../../models/card.interface";
import { IFullList, IList } from "../../../models/list.interface";

export enum ListActionTypes {
    CREATE_LIST = 'CREATE_LIST',
    SET_LISTS = 'SET_LISTS',
    SET_CURRENT_LIST = 'SET_CURRENT_LIST',
    ADD_CARD_TO_LIST = 'ADD_CARD_TO_LIST',
    REMOVE_CARD_FROM_LIST = 'REMOVE_CARD_FROM_LIST',
    MOVE_CARD_TO_ANOTHER_LIST = 'MOVE_CARD_TO_ANOTHER_LIST',
    UPDATE_LIST = 'UPDATE_LIST',
    DELETE_LIST = 'DELETE_LIST'
}

export interface CreateListAction {
    type: ListActionTypes.CREATE_LIST;
    payload:IList
}

export interface SetListsAction {
    type: ListActionTypes.SET_LISTS;
    payload: IFullList[];
}

export interface SetCurrentListAction {
    type: ListActionTypes.SET_CURRENT_LIST;
    payload: IFullList;
}

export interface AddCardToListAction{
    type: ListActionTypes.ADD_CARD_TO_LIST;
    payload: ICard;
}

export interface RemoveCardFromListAction{
    type: ListActionTypes.REMOVE_CARD_FROM_LIST;
    payload: {
        listId:string,
        cardId:string,
    };
}

export interface MoveCardToAnotherListAction{
    type:ListActionTypes.MOVE_CARD_TO_ANOTHER_LIST;
    payload:{
        sourceCardIndex:number,
        cardId: string, 
        sourceListId: string,
        destinationListId: string
    };
}

export interface UpdateListAction {
    type: ListActionTypes.UPDATE_LIST;
    payload: IList;
}

export interface DeleteListAction {
    type: ListActionTypes.DELETE_LIST;
    payload: string;
}

export type ListAction = CreateListAction | SetListsAction | SetCurrentListAction | AddCardToListAction | RemoveCardFromListAction | MoveCardToAnotherListAction | UpdateListAction | DeleteListAction;