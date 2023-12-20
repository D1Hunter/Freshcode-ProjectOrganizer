import { Service } from "typedi";
import { Prisma, Token } from "../../../prisma/generated/client";
import PrismaService from "../../db/prisma.service";
import { ITokenRepository } from "./interfaces/token.repository.interface";

@Service()
export class TokenRepository implements ITokenRepository {
    create(dto: Prisma.TokenUncheckedCreateInput): Promise<Token> {
        return PrismaService.token.create({ data: dto });
    }

    getOneByUserId(userId: string): Promise<Token | null> {
        return PrismaService.token.findUnique({ where: { userId } })
    }

    update(userId: string, dto: Prisma.TokenUncheckedUpdateInput): Promise<Token | null> {
        return PrismaService.token.update({ where: { userId }, data: dto });
    }

    delete(userId:string):Promise<Token>{
        return PrismaService.token.delete({where:{userId}});
    }
}