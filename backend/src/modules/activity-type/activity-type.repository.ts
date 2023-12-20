import { Service } from "typedi";
import { ActivityType, Prisma } from "../../../prisma/generated/client";
import PrismaService from "../../db/prisma.service";
import { IActiviTypeRepository } from "./interfaces/activity-type.repository.interface";

@Service()
export default class ActivityTypeRepository implements IActiviTypeRepository {

    create(dto: Prisma.ActivityTypeUncheckedCreateInput): Promise<ActivityType> {
        return PrismaService.activityType.create({ data: dto });
    }

    getOneByName(name: string): Promise<ActivityType | null> {
        return PrismaService.activityType.findUnique({ where: { name } });
    }

    getOneById(id: string): Promise<ActivityType | null> {
        return PrismaService.activityType.findUnique({ where: { id } });
    }

    getAll(): Promise<ActivityType[]> {
        return PrismaService.activityType.findMany();
    }

    update(id: string, dto: Prisma.ActivityTypeUpdateInput): Promise<{ id: string; name: string; }> {
        return PrismaService.activityType.update({ where: { id }, data: dto });
    }
    
    delete(id: string): Promise<ActivityType | null> {
        return PrismaService.activityType.delete({ where: { id } });
    }
}