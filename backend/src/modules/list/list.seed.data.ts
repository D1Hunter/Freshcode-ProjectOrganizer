import { v4 } from "uuid";
import { Board, Prisma } from "../../../prisma/generated/client";
import { boardSeedData } from "../board/board.seed.data";

class ListSeedData {
    lists: Prisma.ListUncheckedCreateInput[] = [];
    constructor() {
        const boardsDataSize = boardSeedData.boards.length;
        for (let i = 0; i < boardsDataSize; i++) {
            for (let i = 0; i < 2; ++i) {
                this.lists.push({
                    id: v4(),
                    name: `Queue${i + 1}`,
                    boardId: boardSeedData.boards[i].id,
                });
            }
        }
    }
}

export const listSeedData = new ListSeedData();