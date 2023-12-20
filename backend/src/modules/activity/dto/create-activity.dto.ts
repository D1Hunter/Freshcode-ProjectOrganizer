export interface CreateActivityDto{
    readonly description:string,
    readonly activityTypeId:string,
    readonly userId:string,
    readonly boardId:string,
    readonly cardId?:string
}