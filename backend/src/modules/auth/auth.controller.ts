import { FastifyReply, FastifyRequest } from "fastify";
import { TokenService } from "../token/token.service";
import UserService from "../user/user.service";
import { HttpException } from "../../http/http.exception";
import * as bcryptjs from "bcryptjs";
import { FastifyRequestWithBody } from "../../interfaces/fastify-custom-request.nterface";
import { HttpStatus } from "../../http/http-status.enum";
import { Service } from "typedi";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Service()
export default class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) { }

    async register(request: FastifyRequestWithBody<RegisterUserDto>, reply: FastifyReply) {
        try {
            const { email, password } = request.body;
            const user = await this.userService.getOneUserByEmail(email);
            console.log("WHAT");
            if (user) {
                throw new HttpException('This email is already in use.', HttpStatus.BAD_REQUEST);
            }
            const hashPassword = await bcryptjs.hash(password, 6);
            const newUser = await this.userService.createUser({ email, password: hashPassword });
            const token = this.tokenService.generateAccessToken({ email: newUser.email });
            if (!token) {
                throw new HttpException('Error creating token.', HttpStatus.BAD_REQUEST);
            }
            await this.tokenService.saveToken(newUser.id, token);
            return { user:newUser, token };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async login(request: FastifyRequestWithBody<LoginUserDto>, reply: FastifyReply) {
        try {
            const { email, password } = request.body;
            const user = await this.userService.getOneUserByEmail(email);
            if (!user) {
                throw new HttpException('Incorrect data input.', HttpStatus.BAD_REQUEST);
            }
            const comparePassword = await bcryptjs.compare(password, user.password);
            if (!comparePassword) {
                throw new HttpException('Incorrect data input.', HttpStatus.BAD_REQUEST);
            }
            const token = await this.tokenService.generateAccessToken({ email: user.email });
            if (!token) {
                throw new HttpException('Error creating token.', HttpStatus.BAD_REQUEST);
            }
            await this.tokenService.saveToken(user.id, token);
            return { user, token };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async auth(request: FastifyRequest, reply: FastifyReply) {
        try {
            const user = await this.userService.getOneUserByEmail(request.user.email);
            if (!user) {
                throw new HttpException('The user was not found.', HttpStatus.NOT_FOUND);
            }
            const token = await this.tokenService.generateAccessToken(user);
            if (!token) {
                throw new HttpException('Error creating token.', HttpStatus.BAD_REQUEST);
            }
            await this.tokenService.saveToken(user.id, token);
            return { user, token };
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async logout(request: FastifyRequest, reply: FastifyReply) {
        try {
            const user = await this.userService.getOneUserByEmail(request.user.email);
            if (!user) {
                throw new HttpException('The user was not found.', HttpStatus.NOT_FOUND);
            }
            const token = await this.tokenService.generateAccessToken(user);
            if (!token) {
                throw new HttpException('Error creating token.', HttpStatus.BAD_REQUEST);
            }
            await this.tokenService.deleteToken(user.id);
            return { message: 'Successfully logged out' };
        }
        catch (error) {
            reply.status(500).send(error);
        }
    }
}