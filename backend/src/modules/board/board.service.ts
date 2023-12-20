import { CreateBoardDto } from "./dto/create-board.dto";
import BoardRepository from "./board.repository";
import { Service } from "typedi";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Service()
export default class BoardService {
    constructor(private readonly boardRepository: BoardRepository) { }

    async create(dto: CreateBoardDto) {
        return this.boardRepository.create(dto);
    }

    async getAll() {
        return this.boardRepository.getAll();
    }

    async getOneById(id: string) {
        return this.boardRepository.getOneById(id);
    }

    async getOneByIdFront(id:string){
        return this.boardRepository.getOnyByIdFront(id);
    }

    async update(id: string, dto: UpdateBoardDto) {
        return this.boardRepository.update(id, dto);
    }

    async delete(id: string) {
        return this.boardRepository.delete(id);
    }
}