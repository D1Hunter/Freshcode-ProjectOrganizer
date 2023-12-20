import { ActivityType } from "../../../../prisma/generated/client";
import { IBaseRepository } from "../../../interfaces/baserepository.interface";

export interface IActiviTypeRepository extends IBaseRepository<ActivityType> {
    getOneByName(name: string): Promise<ActivityType | null>
}