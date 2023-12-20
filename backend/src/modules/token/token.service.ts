import jwt from "jsonwebtoken";
import { TokenPayload } from "./types/token.type";
import { ITokenRepository } from "./interfaces/token.repository.interface";
import { Token } from "../../../prisma/generated/client";
import { Service } from "typedi";
import { TokenRepository } from "./token.repository";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access';
const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION || '1h';

@Service()
export class TokenService{
    constructor(private readonly tokenRepository:TokenRepository){}

    generateAccessToken(payload: TokenPayload){
        return jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: JWT_ACCESS_EXPIRATION});
    }

    verifyToken(token:string){
        return jwt.verify(token, JWT_ACCESS_SECRET);
    }

    async saveToken(userId: string, accessToken: string) {
        const token = await this.tokenRepository.getOneByUserId(userId);
        if (!token) {
            return this.tokenRepository.create({
                accessToken,
                userId,
            });
        }
        return this.tokenRepository.update(userId, { accessToken });
    }

    async getTokenByUserId(userId: string) {
        return this.tokenRepository.getOneByUserId(userId);
    }

    async deleteToken(userId: string){
        return this.tokenRepository.delete(userId);
    }
}