import { Prisma } from "../../../prisma/generated/client";
import { v4 } from 'uuid';
import { userSeedData } from "../user/user.seed.data";

class BoardSeedData {
    boards: Prisma.BoardUncheckedCreateInput[] = [];
    constructor() {
        for (let i = 0; i < 3; ++i) {
            this.boards.push({
                id: v4(),
                name: `Project${i + 1}`,
                userId: userSeedData.users[0].id
            });
        }
    }
}

export const boardSeedData = new BoardSeedData();