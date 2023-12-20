import { Service } from "typedi";
import ActivityTypeRepository from "./activity-type.repository";
import { CreateActivityTypeDto } from "./dto/create-activity-type.dto";


@Service()
export default class ActivityTypeService {
    constructor(private readonly activityTypeRepository: ActivityTypeRepository) { }

    async create(dto: CreateActivityTypeDto) {
        return this.activityTypeRepository.create(dto);
    }

    async getOneByName(name: string) {
        return this.activityTypeRepository.getOneByName(name);
    }

    async getAll() {
        return this.activityTypeRepository.getAll();
    }
}