import { Service } from "typedi";
import { CreateUserDto } from "./dto/create-user.dto";
import { IUserRepository } from "./interfaces/user.repository.interface";
import UserRepository from "./user.repository";


@Service()
export default class UserService{
    constructor(private readonly userRepository:UserRepository){}

    async createUser(dto:CreateUserDto){
        const nickname = dto.email.split('@')[0];
        return this.userRepository.create({ nickname:nickname, ...dto });
    }

    async getOneUserById(id:string){
        return this.userRepository.getOneById(id);
    }

    async getOneUserByEmail(email:string){
        return this.userRepository.getOneByEmail(email);
    }
}
