import { Service } from "typedi";
import { Prisma } from "../../../prisma/generated/client";
import PrismaService from "../../db/prisma.service";
import { IUserRepository } from "./interfaces/user.repository.interface";

@Service()
export default class UserRepository implements IUserRepository {
    async create(dto: Prisma.UserUncheckedCreateInput) {
        return PrismaService.user.create({ data: dto });
    }

    async getOneById(id: string) {
        return PrismaService.user.findUnique({ where: { id } });
    }

    async getOneByEmail(email: string) {
        return PrismaService.user.findUnique({ where: { email } })
    }
}