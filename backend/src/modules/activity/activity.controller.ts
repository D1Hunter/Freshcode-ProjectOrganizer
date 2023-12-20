import { Service } from "typedi";
import ActivityService from "./activity.service";
import BoardService from "../board/board.service";
import { CardService } from "../card/card.service";
import { FastifyRequestWithParams } from "../../interfaces/fastify-custom-request.nterface";
import { HttpException } from "../../http/http.exception";
import { HttpStatus } from "../../http/http-status.enum";
import { FastifyReply } from "fastify";
import { GetActivitiesByBoardParams } from "./schemas/get-activities-by-board.schema";
import { GetActivitiesByCardParams } from "./schemas/get-activities-by-card.schema";

@Service()
export default class ActivityController {
    constructor(
        private readonly activityService: ActivityService,
        private readonly boardService: BoardService,
        private readonly cardService: CardService) { }

    async getAllByBoardId(request: FastifyRequestWithParams<GetActivitiesByBoardParams>, reply: FastifyReply) {
        try {
            const board = await this.boardService.getOneById(request.params.boardId);
            if (!board) {
                throw new HttpException('Board with this id not found', HttpStatus.NOT_FOUND);
            }
            const activities = await this.activityService.getAllByBoardId(board.id);
            return { activities: activities };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async getAllByCardId(request: FastifyRequestWithParams<GetActivitiesByCardParams>, reply: FastifyReply) {
        try {
            const card = await this.cardService.getOneById(request.params.cardId);
            if (!card) {
                throw new HttpException('Card with this id not found', HttpStatus.NOT_FOUND);
            }
            const activities = await this.activityService.getAllByCardId(card.id);
            return { activities: activities };
        } catch (error) {
            reply.status(500).send(error);
        }
    }
}