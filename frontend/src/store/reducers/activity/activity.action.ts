import { IActivity } from "../../../models/activity.interface";
import { ActivityActionTypes } from "./activity.action.interface";

export const setActivitiesAction = (payload: IActivity[]) => ({ type: ActivityActionTypes.SET_ACTIVITIES, payload });