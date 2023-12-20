import { Service } from "typedi";
import { Activity, Prisma } from "../../../prisma/generated/client";
import PrismaService from "../../db/prisma.service";
import { IActivityRepository } from "./interfaces/activity.repository,interface";

@Service()
export default class ActivityRepository implements IActivityRepository {

    create(dto: Prisma.ActivityUncheckedCreateInput): Promise<Activity> {
        return PrismaService.activity.create({ data: dto });
    }

    getAll(): Promise<Array<Activity>> {
        return PrismaService.activity.findMany();
    }

    getAllByBoardId(boardId: string): Promise<Object[]> {
        return PrismaService.activity.findMany({
            where: {
                boardId: boardId
            },
            select: {
                id: true,
                description: true,
                createdAt: true,
                boardId: true,
                cardId: true,
                user: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            },
            orderBy:{
                createdAt:'desc'
            }
        })
    }

    getAllByCardId(cardId: string): Promise<Object[]> {
        return PrismaService.activity.findMany({
            where: {
                cardId: cardId
            },
            select: {
                id: true,
                description: true,
                createdAt: true,
                boardId: true,
                cardId: true,
                user: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            },
            orderBy:{
                createdAt:'desc'
            }
        })
    }

    deleteAllByBoardId(boardId: string): Promise<Object> {
        return PrismaService.activity.deleteMany({
            where: {
                boardId
            },
        });
    }
}