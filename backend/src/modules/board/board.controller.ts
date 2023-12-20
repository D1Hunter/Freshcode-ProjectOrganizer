import UserService from "../user/user.service";
import BoardService from "./board.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyRequestWithBody, FastifyRequestWithParams, FastifyRequestWithParamsAndBody } from "../../interfaces/fastify-custom-request.nterface";
import { HttpException } from "../../http/http.exception";
import { HttpStatus } from "../../http/http-status.enum";
import { Service } from "typedi";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { DeleteBoardParams } from "./schemas/delete-board.schema";
import { UpdateBoardParams } from "./schemas/update-board.schema";
import ListService from "../list/list.service";
import { CardService } from "../card/card.service";
import ActivityService from "../activity/activity.service";
import CommentService from "../comment/comment.service";

@Service()
export default class BoardController {
    constructor(
        private readonly boardService: BoardService,
        private readonly userService: UserService,
        private readonly listService: ListService,
        private readonly cardService: CardService,
        private readonly activityService: ActivityService,
        private readonly commentService: CommentService
    ) { }

    async create(request: FastifyRequestWithBody<CreateBoardDto>, reply: FastifyReply) {
        try {
            const { name } = request.body;
            const user = await this.userService.getOneUserByEmail(request.user.email);
            if (!user) {
                throw new HttpException(`User with this id is not exist.`, HttpStatus.BAD_REQUEST);
            }
            const newBoard = await this.boardService.create({ name: name, userId: user.id });
            return { board: newBoard };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async getAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const user = await this.userService.getOneUserByEmail(request.user.email);
            if (!user) {
                throw new HttpException(`User with this id is not exist.`, HttpStatus.BAD_REQUEST);
            }
            const boards = await this.boardService.getAll();
            return { boards: boards };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async getOneById(request: FastifyRequestWithParams<DeleteBoardParams>, reply: FastifyReply) {
        try {
            const board = await this.boardService.getOneById(request.params.id);
            if (!board) {
                throw new HttpException('Board with this id not found', HttpStatus.NOT_FOUND);
            }
            const boardForFront = await this.boardService.getOneByIdFront(board.id);
            return { board: boardForFront };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async update(request: FastifyRequestWithParamsAndBody<UpdateBoardParams, UpdateBoardDto>, reply: FastifyReply) {
        try {
            const { name } = request.body;
            const user = await this.userService.getOneUserByEmail(request.user.email);
            if (!user) {
                throw new HttpException(`User with this id is not exist.`, HttpStatus.BAD_REQUEST);
            }
            const board = await this.boardService.getOneById(request.params.id);
            if (!board) {
                throw new HttpException('Board with this id not found', HttpStatus.NOT_FOUND);
            }
            if (board.userId != user.id) {
                throw new HttpException(`You cannot update someone else board`, HttpStatus.BAD_REQUEST);
            }
            await this.boardService.update(board.id, { name })
            return { message: "The board has been updated successfully" };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async delete(request: FastifyRequestWithParams<DeleteBoardParams>, reply: FastifyReply) {
        try {
            const user = await this.userService.getOneUserByEmail(request.user.email);
            if (!user) {
                throw new HttpException(`User with this email is not exist.`, HttpStatus.BAD_REQUEST);
            }
            const board = await this.boardService.getOneById(request.params.id);
            if (!board) {
                throw new HttpException('Board with this id not found', HttpStatus.NOT_FOUND);
            }
            if (board.userId != user.id) {
                throw new HttpException(`You cannot delete someone else board`, HttpStatus.BAD_REQUEST);
            }
            await this.activityService.deleteAllByBoardId(board.id);
            await this.commentService.deleteAllByBoardId(board.id);
            await this.cardService.deleteAllByBoardId(board.id);
            await this.listService.deleteAllByBoardId(board.id);
            await this.boardService.delete(board.id);
            return { message: "The board has been deleted successfully" };
        } catch (error) {
            reply.status(500).send(error);
        }
    }
}