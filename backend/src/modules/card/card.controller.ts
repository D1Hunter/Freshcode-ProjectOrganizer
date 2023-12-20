import { Service } from "typedi";
import { CardService } from "./card.service";
import ListService from "../list/list.service";
import { FastifyRequestWithBody, FastifyRequestWithParams, FastifyRequestWithParamsAndBody } from "../../interfaces/fastify-custom-request.nterface";
import { FastifyReply } from "fastify";
import { HttpException } from "../../http/http.exception";
import { HttpStatus } from "../../http/http-status.enum";
import UserService from "../user/user.service";
import ActivityTypeService from "../activity-type/activity-type.service";
import ActivityService from "../activity/activity.service";
import { ActivityTypes } from "../activity-type/activity-type.type";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { UpdateCardParams } from "./schemas/update-card.schema";
import { MoveCardToListParams } from "./schemas/move-card-to-list.schema";
import CommentService from "../comment/comment.service";

@Service()
export default class CardController {
    constructor(
        private readonly cardService: CardService,
        private readonly listService: ListService,
        private readonly userService: UserService,
        private readonly activityTypeService: ActivityTypeService,
        private readonly activityService: ActivityService,
        private readonly commentService: CommentService
    ) { }

    async create(request: FastifyRequestWithBody<CreateCardDto>, reply: FastifyReply) {
        try {
            const { name, listId } = request.body;
            const user = await this.userService.getOneUserByEmail(request.user.email);
            if (!user) {
                throw new HttpException(`User with this email is not exist.`, HttpStatus.BAD_REQUEST);
            }
            const list = await this.listService.getOneById(listId);
            if (!list) {
                throw new HttpException('List with this id not found', HttpStatus.NOT_FOUND);
            }
            const activityType = await this.activityTypeService.getOneByName(ActivityTypes.ADD_CARD);
            if (!activityType) {
                throw new HttpException('Activity type not found', HttpStatus.NOT_FOUND);
            }
            const newCard = await this.cardService.create({ name, listId });
            const activityDescription = this.activityService.getActivityDescription({
                activityType: ActivityTypes.ADD_CARD,
                userEmail: user.email,
                cardName: newCard.name,
                listName: list.name
            })
            await this.activityService.create({ description: activityDescription, activityTypeId: activityType.id, userId: user.id, boardId: list.boardId || '', cardId: newCard.id });
            return { card: newCard };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async getAllByListId(request: FastifyRequestWithParams<{ listId: string }>, reply: FastifyReply) {
        try {
            const list = await this.listService.getOneById(request.params.listId);
            if (!list) {
                throw new HttpException('List with this id not found', HttpStatus.NOT_FOUND);
            }
            const cards = await this.cardService.getAllByListId(list.id);
            return { cards: cards }
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async getOneById(request: FastifyRequestWithParams<{ id: string }>, reply: FastifyReply) {
        try {
            const card = await this.cardService.getOneById(request.params.id)
            if (!card) {
                throw new HttpException('Card with this id not found', HttpStatus.NOT_FOUND);
            }
            const cardForFront = await this.cardService.getOneByIdFront(card.id);
            return { card: cardForFront };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async moveToList(request: FastifyRequestWithParams<MoveCardToListParams>, reply: FastifyReply) {
        try {
            const user = await this.userService.getOneUserByEmail(request.user.email);
            if (!user) {
                throw new HttpException(`User with this email is not exist.`, HttpStatus.BAD_REQUEST);
            }
            const card = await this.cardService.getOneById(request.params.id)
            if (!card) {
                throw new HttpException('Card with this id not found', HttpStatus.NOT_FOUND);
            }
            const list = await this.listService.getOneById(request.params.listId);
            if (!list) {
                throw new HttpException('List with this id not found', HttpStatus.NOT_FOUND);
            }
            const activityType = await this.activityTypeService.getOneByName(ActivityTypes.MOVE_CARD_TO_ANOTHER_LIST);
            if (!activityType) {
                throw new HttpException('Activity type not found', HttpStatus.NOT_FOUND);
            }
            const activityDescription = this.activityService.getActivityDescription({
                activityType: ActivityTypes.MOVE_CARD_TO_ANOTHER_LIST,
                userEmail: user.email,
                cardName: card.name,
                listName: list.name
            })
            await this.activityService.create({ description: activityDescription, activityTypeId: activityType.id, userId: user.id, cardId: card.id, boardId: list.boardId || '' });
            const updatedCard = await this.cardService.update(card.id, { name: card.name, description: card.description, listId: list.id });
            return { card: updatedCard };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async update(request: FastifyRequestWithParamsAndBody<UpdateCardParams, UpdateCardDto>) {
        const { name, listId, description } = request.body;
        const user = await this.userService.getOneUserByEmail(request.user.email);
        if (!user) {
            throw new HttpException(`User with this email is not exist.`, HttpStatus.BAD_REQUEST);
        }
        const card = await this.cardService.getOneById(request.params.id);
        if (!card) {
            throw new HttpException('Card with this id not found', HttpStatus.NOT_FOUND);
        }
        const list = await this.listService.getOneById(card.listId || '');
        if (!list) {
            throw new HttpException('List with this id not found', HttpStatus.NOT_FOUND);
        }
        await this.cardService.update(card.id, { name: name, description: description, listId: list.id });
        return { message: "The card has been updated successfully" };
    }

    async delete(request: FastifyRequestWithParams<{ id: string }>, reply: FastifyReply) {
        try {
            const user = await this.userService.getOneUserByEmail(request.user.email);
            if (!user) {
                throw new HttpException(`User with this email is not exist.`, HttpStatus.BAD_REQUEST);
            }
            const card = await this.cardService.getOneById(request.params.id);
            if (!card) {
                throw new HttpException('Card with this id not found', HttpStatus.NOT_FOUND);
            }
            const list = await this.listService.getOneById(card.listId || "");
            if (!list) {
                throw new HttpException('List with this id not found', HttpStatus.NOT_FOUND);
            }
            const activityType = await this.activityTypeService.getOneByName(ActivityTypes.REMOVE_CARD);
            if (!activityType) {
                throw new HttpException('Activity type not found', HttpStatus.NOT_FOUND);
            }
            const activityDescription = this.activityService.getActivityDescription({
                activityType: ActivityTypes.REMOVE_CARD,
                userEmail: user.email,
                cardName: card.name,
                listName: list.name
            })
            await this.activityService.create({ description: activityDescription, activityTypeId: activityType.id, userId: user.id, boardId: list.boardId || '' });
            await this.commentService.deleteAllByCardId(card.id);
            await this.cardService.delete(card.id);
            return { message: "The card has been deleted successfully" };
        } catch (error) {
            reply.status(500).send(error);
        }
    }
}