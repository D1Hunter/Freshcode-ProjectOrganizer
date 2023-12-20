import { IActivity } from "../../../models/activity.interface";

export enum ActivityActionTypes {
    SET_ACTIVITIES = "SET_ACTIVITIES"
}

export interface SetActivitiesAction {
    type: ActivityActionTypes.SET_ACTIVITIES,
    payload:IActivity[]
}

export type ActivityAction = SetActivitiesAction;