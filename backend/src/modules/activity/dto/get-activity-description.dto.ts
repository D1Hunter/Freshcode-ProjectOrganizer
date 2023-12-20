import { ActivityTypes } from "../../activity-type/activity-type.type";

export interface GetActivityDescriptionDto{
    readonly activityType:ActivityTypes,
    readonly userEmail:string,
    readonly cardName?:string,
    readonly listName?:string
    readonly boardName?:string
}