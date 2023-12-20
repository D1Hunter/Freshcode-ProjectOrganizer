import { FastifyReply, FastifyRequest } from "fastify";
import { HttpException } from "../http/http.exception";
import { TokenService } from "../modules/token/token.service";
import { TokenPayload } from "../modules/token/types/token.type";
import UserService from "../modules/user/user.service";
import Container from "typedi";

const tokenService = Container.get(TokenService);
const userService = Container.get(UserService);

declare module 'fastify' {
    interface FastifyRequest {
      user: {
        email:string
      }
    }
}

export async function jwtAuth(request: FastifyRequest, reply: FastifyReply) {
    try {
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new HttpException('No authorization', 401);
        }
        const user = tokenService.verifyToken(token) as TokenPayload;
        if (!user) {
            throw new HttpException('No authorization', 401);
        }
        const userDB = await userService.getOneUserByEmail(user.email);
        if (!userDB) {
            throw new HttpException('No authorization', 401);
        }
        const tokenDB = await tokenService.getTokenByUserId(userDB.id);
        if(!tokenDB){
            throw new HttpException('No authorization', 401);
        }
        request.user = userDB;
    } catch (error) {
        return reply.status(401).send({message: 'Auth error'});
    }
}