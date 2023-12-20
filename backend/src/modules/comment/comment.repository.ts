import { Comment, Prisma } from "../../../prisma/generated/client";
import { ICommentRepository } from "./interfaces/comment.repository.interface";
import PrismaService from "../../db/prisma.service";
import { Service } from "typedi";


@Service()
export class CommentRepository implements ICommentRepository {

    create(dto: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
        return PrismaService.comment.create({ data: dto });
    }

    getOneById(id: string): Promise<Comment | null> {
        return PrismaService.comment.findUnique({ where: { id } });
    }

    getAllByCardId(cardId: string) {
        return PrismaService.comment.findMany({
            where: { cardId }, 
            select: {
                id: true,
                text: true,
                createdAt: true,
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
        });
    }

    getAll(): Promise<Comment[]> {
        return PrismaService.comment.findMany();
    }

    update(id: string, dto: Object): Promise<Comment> {
        return PrismaService.comment.update({ where: { id }, data: dto });
    }

    delete(id: string): Promise<Comment | null> {
        return PrismaService.comment.delete({ where: { id } });
    }

    deleteAllByCardId(cardId: string): Promise<Object> {
        return PrismaService.comment.deleteMany({
            where: {
                cardId
            }
        });
    }

    deleteAllByListId(listId: string): Promise<Object> {
        return PrismaService.comment.deleteMany({
            where: {
                card: {
                    listId
                }
            }
        });
    }

    deleteAllByBoardId(boardId: string): Promise<Object> {
        return PrismaService.comment.deleteMany({
            where: {
                card: {
                    list: {
                        boardId
                    }
                }
            }
        });
    }
}