import { IFullCard } from "../../../models/card.interface";

export enum CardActionTypes {
    SET_CURRENT_CARD = 'SET_CURRENT_CARD',
    UPDATE_CARD = 'UPDATE_CARD',
    DELETE_CARD = 'DELETE_CARD'
}

export interface SetCurrentCardAction {
    type: CardActionTypes.SET_CURRENT_CARD;
    payload:IFullCard
}

export interface UpdateCardAction {
    type: CardActionTypes.UPDATE_CARD;
    payload: IFullCard;
}

export type CardAction = SetCurrentCardAction | UpdateCardAction;