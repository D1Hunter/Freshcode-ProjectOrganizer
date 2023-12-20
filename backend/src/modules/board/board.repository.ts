import { Board, Prisma } from "../../../prisma/generated/client";
import PrismaService from "../../db/prisma.service";
import { IBoardRepository } from "./interfaces/board.repository.interface";
import { Service } from "typedi";

@Service()
export default class BoardRepository implements IBoardRepository {
    create(dto: Prisma.BoardUncheckedCreateInput): Promise<Board> {
        return PrismaService.board.create({ data: dto });
    }
    getOneById(id: string): Promise<Board | null> {
        return PrismaService.board.findUnique({ where: { id } });
    }
    getOnyByIdFront(id: string){
        return PrismaService.board.findUnique({where:{id}, select:{
            id:true,
            name:true,
            userId:true,
            lists:{
                select:{
                    id:true,
                    name:true,
                    cards:{
                        select:{
                            id:true,
                            name:true
                        }
                    }
                }
            }
        }})
    }
    getAll(): Promise<Board[]> {
        return PrismaService.board.findMany();
    }
    update(id: string, dto: Prisma.BoardUpdateInput): Promise<Board> {
        return PrismaService.board.update({ where: { id }, data: dto });
    }
    delete(id: string): Promise<Board | null> {
        return PrismaService.board.delete({ where: { id } });
    }
}