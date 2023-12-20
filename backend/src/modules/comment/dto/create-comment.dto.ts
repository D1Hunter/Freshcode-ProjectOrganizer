export interface CreateCommentDto{
    readonly text:string,
    readonly userId?:string,
    readonly cardId:string
}