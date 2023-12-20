import { Service } from "typedi";
import { List, Prisma } from "../../../prisma/generated/client";
import PrismaService from "../../db/prisma.service";
import { IListRepository } from "./interfaces/list.repository.interface";

@Service()
export default class ListRepository implements IListRepository {

    create(dto: Prisma.ListUncheckedCreateInput): Promise<List> {
        return PrismaService.list.create({ data: dto });
    }

    getOneById(id: string): Promise<List | null> {
        return PrismaService.list.findUnique({ where: { id } });
    }

    getAll(): Promise<List[]> {
        return PrismaService.list.findMany();
    }

    getAllByBoardId(boardId: string) {
        return PrismaService.list.findMany({
            where: { boardId }, select: {
                id: true, name: true, boardId: true, cards: {
                    select: {
                        id: true,
                        name: true,
                        description: true
                    }
                }
            }
        });
    }

    update(id: string, dto: Prisma.ListUpdateInput): Promise<List> {
        return PrismaService.list.update({ where: { id }, data: dto });
    }

    delete(id: string): Promise<List | null> {
        return PrismaService.list.delete({ where: { id } });
    }

    deleteAllByBoardId(boardId: string) {
        return PrismaService.list.deleteMany({ where: { boardId } });
    }
}