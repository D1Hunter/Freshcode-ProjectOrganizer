import { v4 } from "uuid";
import { Prisma } from "../../../prisma/generated/client";
import { boardSeedData } from "../board/board.seed.data";
import { listSeedData } from "../list/list.seed.data";
import { cardSeedData } from "../card/card.seed.data";
import { userSeedData } from "../user/user.seed.data";

class CommentSeedData {
    comments: Prisma.CommentUncheckedCreateInput[] = [];
    constructor() {
        const boardsDataSize = boardSeedData.boards.length;
        for (const board of boardSeedData.boards) {
            for (const list of listSeedData.lists) {
                if (list.boardId === board.id) {
                    const cards = cardSeedData.cards.filter((card) => card.listId === list.id);
                    for (const card of cards) {
                        this.comments.push({
                            id: v4(),
                            text: `Important information for ${card.name}`,
                            cardId: card.id,
                            userId: userSeedData.users[0].id
                        });
                    }
                }
            }
        }
    }
}

export const commentSeedData = new CommentSeedData();