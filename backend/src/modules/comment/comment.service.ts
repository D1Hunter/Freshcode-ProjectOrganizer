import { Service } from "typedi";
import { CommentRepository } from "./comment.repository";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Service()
export default class CommentService {
    constructor(private readonly commentRepository: CommentRepository) { }

    async create(dto: CreateCommentDto) {
        return this.commentRepository.create(dto);
    }

    async getAllByCardId(cardId: string) {
        return this.commentRepository.getAllByCardId(cardId);
    }

    async deleteAllByCardId(cardId:string){
        return this.commentRepository.deleteAllByCardId(cardId);
    }

    async deleteAllByListId(listId:string){
        return this.commentRepository.deleteAllByListId(listId);
    }

    async deleteAllByBoardId(boardId: string) {
        return this.commentRepository.deleteAllByBoardId(boardId);
    }
} 