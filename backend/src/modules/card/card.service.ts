import { Service } from "typedi";
import { CardRepository } from "./card.repository";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

@Service()
export class CardService {
    constructor(private readonly cardRepository: CardRepository) { }

    async create(dto: CreateCardDto) {
        return this.cardRepository.create({ description: "", ...dto });
    }

    async getOneById(id: string) {
        return this.cardRepository.getOneById(id);
    }

    async getOneByIdFront(id: string) {
        return this.cardRepository.getOneByIdFront(id);
    }

    async getAllByListId(listId: string) {
        return this.cardRepository.getAllByListId(listId);
    }

    async update(id: string, dto: UpdateCardDto) {
        return this.cardRepository.update(id, dto);
    }

    async delete(id: string) {
        return this.cardRepository.delete(id);
    }

    async deleteAllByListId(listId: string) {
        return this.cardRepository.deleteAllByListId(listId);
    }

    async deleteAllByBoardId(boardId: string) {
        return this.cardRepository.deleteAllByBoardId(boardId);
    }
}