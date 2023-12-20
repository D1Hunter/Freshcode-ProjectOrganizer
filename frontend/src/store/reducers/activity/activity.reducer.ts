import { ActivityAction, ActivityActionTypes } from "./activity.action.interface";
import { IActivityState } from "./activity.state.interface";

const initialState:IActivityState = {
    activities: []
}

export const activityReducer = (state = initialState, action: ActivityAction): IActivityState => {
    switch (action.type) {
        case ActivityActionTypes.SET_ACTIVITIES:
            return {
                ...state,
                activities:action.payload
            }
        default:
            return state;
    };
};