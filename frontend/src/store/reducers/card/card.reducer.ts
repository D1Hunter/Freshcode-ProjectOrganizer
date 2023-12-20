import { CardAction, CardActionTypes } from "./card.action.interface";
import { ICardState } from "./card.state.interface";


const initialState: ICardState = {
    currentCard: null
}

export const cardReducer = (state=initialState, action: CardAction):ICardState =>{
    switch (action.type) {
        case CardActionTypes.SET_CURRENT_CARD:
            return {
                ...state,
                currentCard:action.payload
            };
        default:
            return state;
    }
}