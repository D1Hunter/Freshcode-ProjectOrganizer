import { Service } from "typedi";
import ListService from "./list.service";
import BoardService from "../board/board.service";
import { FastifyRequestWithBody, FastifyRequestWithParams, FastifyRequestWithParamsAndBody } from "../../interfaces/fastify-custom-request.nterface";
import { FastifyReply } from "fastify";
import { HttpException } from "../../http/http.exception";
import { HttpStatus } from "../../http/http-status.enum";
import ActivityTypeService from "../activity-type/activity-type.service";
import ActivityService from "../activity/activity.service";
import { ActivityTypes } from "../activity-type/activity-type.type";
import UserService from "../user/user.service";
import { UpdateListDto } from "./dto/update-list.dto";
import { CreateListDto } from "./dto/create-list.dto";
import { GetAllByBoardParams } from "./schemas/get-all-by-board.schema";
import { DeleteListParams } from "./schemas/delete-list.schema";
import { UpdateListParams } from "./schemas/update-list.schema";
import CommentService from "../comment/comment.service";
import { CardService } from "../card/card.service";


@Service()
export default class ListController {
    constructor(
        private readonly listService: ListService,
        private readonly boardService: BoardService,
        private readonly userService: UserService,
        private readonly activityTypeService: ActivityTypeService,
        private readonly activityService: ActivityService,
        private readonly cardService: CardService,
        private readonly commentService: CommentService
    ) { }

    async create(request: FastifyRequestWithBody<CreateListDto>, reply: FastifyReply) {
        try {
            const { name, boardId } = request.body;
            const board = await this.boardService.getOneById(boardId);
            if (!board) {
                throw new HttpException('Board with this id not found', HttpStatus.NOT_FOUND);
            }
            const newList = await this.listService.create({ name: name, boardId: boardId });
            return { list: newList };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async getAllByBoardId(request: FastifyRequestWithParams<GetAllByBoardParams>, reply: FastifyReply) {
        try {
            const board = await this.boardService.getOneById(request.params.boardId);
            if (!board) {
                throw new HttpException('Board with this id not found', HttpStatus.NOT_FOUND);
            }
            const lists = await this.listService.getAllByBoardId(board.id);
            return { lists: lists };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async update(request: FastifyRequestWithParamsAndBody<UpdateListParams, UpdateListDto>, reply: FastifyReply) {
        try {
            const { name } = request.body;
            const list = await this.listService.getOneById(request.params.id);
            if (!list) {
                throw new HttpException('List with this id not found', HttpStatus.NOT_FOUND);
            }
            await this.listService.update(list.id, { name: name });
            return { message: "The list has been updated successfully" };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async delete(request: FastifyRequestWithParams<DeleteListParams>, reply: FastifyReply) {
        try {
            const user = await this.userService.getOneUserByEmail(request.user.email);
            if (!user) {
                throw new HttpException(`User with this email is not exist.`, HttpStatus.BAD_REQUEST);
            }
            const list = await this.listService.getOneById(request.params.id);
            if (!list) {
                throw new HttpException('List with this id not found', HttpStatus.NOT_FOUND);
            }
            const board = await this.boardService.getOneById(list.boardId || "");
            if (!board) {
                throw new HttpException('Board with this id not found', HttpStatus.NOT_FOUND);
            }
            const activityType = await this.activityTypeService.getOneByName(ActivityTypes.REMOVE_LIST);
            if (!activityType) {
                throw new HttpException('Activity type not found', HttpStatus.NOT_FOUND);
            }
            const activityDescription = this.activityService.getActivityDescription({
                activityType: ActivityTypes.REMOVE_LIST,
                userEmail: user.email,
                listName: list.name,
                boardName: board.name
            });
            await this.activityService.create({ description: activityDescription, activityTypeId: activityType.id, userId: user.id, boardId: board.id });
            await this.commentService.deleteAllByListId(list.id);
            await this.cardService.deleteAllByListId(list.id);
            await this.listService.delete(list.id);
            return { message: "The list has been deleted successfully" };
        } catch (error) {
            reply.status(500).send(error);
        }
    }
}