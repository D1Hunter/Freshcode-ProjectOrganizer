import { FastifyReply } from "fastify";
import { FastifyRequestWithBody, FastifyRequestWithParams } from "../../interfaces/fastify-custom-request.nterface";
import CommentService from "./comment.service";
import UserService from "../user/user.service";
import { HttpException } from "../../http/http.exception";
import { HttpStatus } from "../../http/http-status.enum";
import { CardService } from "../card/card.service";
import ActivityTypeService from "../activity-type/activity-type.service";
import ActivityService from "../activity/activity.service";
import { ActivityTypes } from "../activity-type/activity-type.type";
import { Service } from "typedi";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { GetAllByCardParams } from "./schemas/get-all-by-card.schema";
import ListService from "../list/list.service";

@Service()
export default class CommentController {
    constructor(
        private readonly commentService: CommentService,
        private readonly cardService: CardService,
        private readonly listService: ListService,
        private readonly userService: UserService,
        private readonly activityTypeService: ActivityTypeService,
        private readonly activityService: ActivityService) { }

    async create(request: FastifyRequestWithBody<CreateCommentDto>, reply: FastifyReply) {
        try {
            const { text, cardId } = request.body;
            const user = await this.userService.getOneUserByEmail(request.user.email);
            if (!user) {
                throw new HttpException(`User with this email is not exist.`, HttpStatus.BAD_REQUEST);
            }
            const card = await this.cardService.getOneById(cardId);
            if (!card) {
                throw new HttpException('Card with this id not found', HttpStatus.NOT_FOUND);
            }
            const list = await this.listService.getOneById(card.listId || '');
            if (!list) {
                throw new HttpException('List with this id not found', HttpStatus.NOT_FOUND);
            }
            const activityType = await this.activityTypeService.getOneByName(ActivityTypes.ADD_COMMENT_TO_CARD);
            if (!activityType) {
                throw new HttpException('Activity type not found', HttpStatus.NOT_FOUND);
            }
            const activityDescription = this.activityService.getActivityDescription({
                activityType: ActivityTypes.ADD_COMMENT_TO_CARD,
                userEmail: user.email,
                cardName: card.name
            });
            await this.activityService.create({ description: activityDescription, activityTypeId: activityType.id, userId: user.id, cardId: card.id, boardId: list.boardId || '' });
            const newComment = await this.commentService.create({ text, cardId, userId: user.id });
            return { comment: { id: newComment.id, text: newComment.text, createdAt: newComment.createdAt, user: { id: user.id, email: user.email } } };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async getAllCommentsByCardId(request: FastifyRequestWithParams<GetAllByCardParams>, reply: FastifyReply) {
        try {
            const card = await this.cardService.getOneById(request.params.cardId);
            if (!card) {
                throw new HttpException('Card with this id not found', HttpStatus.NOT_FOUND);
            }
            const comments = await this.commentService.getAllByCardId(card.id);
            return { comments: comments };
        } catch (error) {
            reply.status(500).send(error);
        }
    }
}