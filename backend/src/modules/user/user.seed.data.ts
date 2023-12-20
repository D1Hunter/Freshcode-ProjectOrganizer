import { Prisma } from "../../../prisma/generated/client";
import { v4 } from "uuid";
import * as bcrypt from "bcryptjs"

class UserSeedData {
    users: Prisma.UserUncheckedCreateInput[] = [];
    constructor() {
        this.users.push({
            id: v4(),
            email:"test@test.com",
            password:bcrypt.hashSync("test1234",6),
            nickname:"test"
        });
    }
}

export const userSeedData = new UserSeedData();