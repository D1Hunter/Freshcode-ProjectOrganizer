import { Prisma, User } from "../../../../prisma/generated/client";

export interface IUserRepository {
    create(dto: Prisma.UserUncheckedCreateInput): Promise<User>;
    getOneById(id: string): Promise<User|null>;
    getOneByEmail(email: string): Promise<User|null>;
}