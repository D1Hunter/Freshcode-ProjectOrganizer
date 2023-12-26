import { v4 } from "uuid";
import { Prisma } from "../../../prisma/generated/client";
import { listSeedData } from "../list/list.seed.data";

class CardSeedData {
    cards: Prisma.CardUncheckedCreateInput[] = [];
    constructor() {
        const listsDataSize = listSeedData.lists.length;
        const cardIndex = new Map<string, number>();
        let boardId = "";
        for (let i = 0; i < listsDataSize; i++) {
            boardId = String(listSeedData.lists[i].boardId)
            const currentCardIndex = cardIndex.get(boardId) || 0;
            cardIndex.set(boardId, currentCardIndex + 1);
            this.cards.push({
                id: v4(),
                name: `Card${cardIndex.get(listSeedData.lists[i].boardId || '')}`,
                description: "",
                listId: listSeedData.lists[i].id
            });
        }
    }
}

export const cardSeedData = new CardSeedData();