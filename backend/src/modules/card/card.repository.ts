import { Service } from "typedi";
import { Card, Prisma } from "../../../prisma/generated/client";
import PrismaService from "../../db/prisma.service";
import { ICardRepository } from "./interfaces/card.repository.interface";


@Service()
export class CardRepository implements ICardRepository {

    create(dto: Prisma.CardUncheckedCreateInput): Promise<Card> {
        return PrismaService.card.create({ data: dto });
    }

    getOneById(id: string): Promise<Card | null> {
        return PrismaService.card.findUnique({ where: { id } });
    }

    getOneByIdFront(id: string) {
        return PrismaService.card.findUnique({
            where: { id }, select: {
                id: true,
                name: true,
                description: true,
                comments: true,
                list: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
    }

    getAll(): Promise<Card[]> {
        return PrismaService.card.findMany();
    }

    getAllByListId(listId: string) {
        return PrismaService.card.findMany({ where: { listId } });
    }

    update(id: string, dto: Prisma.CardUpdateInput): Promise<Card> {
        return PrismaService.card.update({ where: { id }, data: dto });
    }

    delete(id: string): Promise<Card | null> {
        return PrismaService.card.delete({ where: { id } });
    }

    deleteAllByListId(listId: string): Promise<Object> {
        return PrismaService.card.deleteMany({
            where: {
                listId
            }
        });
    }

    deleteAllByBoardId(boardId: string): Promise<Object> {
        return PrismaService.card.deleteMany({
            where: {
                list: {
                    boardId
                }
            }
        });
    }
}