import { Prisma, Token } from "../../../../prisma/generated/client";

export interface ITokenRepository {
    create(dto: Prisma.TokenUncheckedCreateInput): Promise<Token>;
    getOneByUserId(userId: string): Promise<Token | null>;
    update(userId:string,dto:Prisma.TokenUncheckedUpdateInput): Promise<Token | null>;
    delete(userId:string):Promise<Token>;
}