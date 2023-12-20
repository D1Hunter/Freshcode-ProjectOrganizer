import { Service } from "typedi";
import ActivityTypeService from "./activity-type.service";
import { FastifyRequestWithBody } from "../../interfaces/fastify-custom-request.nterface";
import { CreateActivityTypeDto } from "./dto/create-activity-type.dto";
import { HttpException } from "../../http/http.exception";
import { HttpStatus } from "../../http/http-status.enum";
import { FastifyReply, FastifyRequest } from "fastify";

@Service()
export default class ActivityTypeController {
    constructor(private readonly activityTypeService: ActivityTypeService) { }

    async create(request: FastifyRequestWithBody<CreateActivityTypeDto>, reply: FastifyReply) {
        try {
            const { name } = request.body;
            const activityTypeExist = await this.activityTypeService.getOneByName(name);
            if (activityTypeExist) {
                throw new HttpException('Activity type with this name is already exist', HttpStatus.BAD_REQUEST);
            }
            const newActivityType = await this.activityTypeService.create({ name });
            return { activityType: newActivityType };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async getAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const activities = await this.activityTypeService.getAll();
            return { activities: activities };
        } catch (error) {
            reply.status(500).send(error);
        }
    }
}