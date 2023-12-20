import { IFullCard } from "../../../models/card.interface";
import { CardAction, CardActionTypes } from "./card.action.interface";

export const setCurrentCardAction = (payload:IFullCard): CardAction => ({type:CardActionTypes.SET_CURRENT_CARD, payload});
export const updateCardAction = (payload:IFullCard):CardAction => ({type:CardActionTypes.UPDATE_CARD, payload});