import { Service } from "typedi";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import ListRepository from "./list.repository";

@Service()
export default class ListService {
    constructor(private readonly listRepository: ListRepository) { }

    async create(dto: CreateListDto) {
        return this.listRepository.create(dto);
    }

    async getOneById(id: string) {
        return this.listRepository.getOneById(id);
    }

    async getAllByBoardId(boardId:string){
        return this.listRepository.getAllByBoardId(boardId);
    }

    async update(id: string, dto: UpdateListDto) {
        return this.listRepository.update(id, dto);
    }

    async delete(id:string){
        return this.listRepository.delete(id);
    }

    async deleteAllByBoardId(boardId:string){
        return this.listRepository.deleteAllByBoardId(boardId);
    }
}
