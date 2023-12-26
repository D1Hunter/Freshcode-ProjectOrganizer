import { ListAction, ListActionTypes } from "./list.action.interface";
import { IListState } from "./list.state.interface";

const initialState: IListState = {
    lists: []
}

export const listReducer = (state = initialState, action: ListAction): IListState => {
    switch (action.type) {
        case ListActionTypes.CREATE_LIST:
            return {
                ...state,
                lists: [...state.lists, { id: action.payload.id, name: action.payload.name, cards: [] }]
            }
        case ListActionTypes.SET_LISTS:
            return {
                ...state,
                lists: action.payload
            };
        case ListActionTypes.ADD_CARD_TO_LIST:
            state.lists.find((list) => list.id == action.payload.listId )?.cards.push(action.payload);
            return {
                ...state,
                lists: [...state.lists]
            }
        case ListActionTypes.REMOVE_CARD_FROM_LIST:
            const list = state.lists.find((list) => list.id == action.payload.listId);
            if (list) {
                list.cards = [...list.cards.filter(card => card.id != action.payload.cardId)];
            }
            return {
                ...state,
                lists: [...state.lists]
            }
        case ListActionTypes.MOVE_CARD_TO_ANOTHER_LIST:
            const sourceList = state.lists.find((list) => list.id === action.payload.sourceListId);
            const sourceCard = sourceList ? sourceList.cards.splice(action.payload.sourceCardIndex, 1)[0] : null;
            const destinationList = state.lists.find((list) => list.id === action.payload.destinationListId);
            if (destinationList && sourceCard) {
                destinationList.cards.push({...sourceCard, listId:action.payload.destinationListId});
            }
            return {
                ...state,
                lists: [...state.lists]
            }
        case ListActionTypes.UPDATE_LIST:
            return {
                ...state,
                lists: [...state.lists.map(list => {
                    if (list.id === action.payload.id) {
                        list.name = action.payload.name;
                    }
                    return list
                })]
            };
        case ListActionTypes.DELETE_LIST:
            return {
                ...state,
                lists: [...state.lists.filter(list => list.id !== action.payload)]
            };
        default:
            return state;
    }
}