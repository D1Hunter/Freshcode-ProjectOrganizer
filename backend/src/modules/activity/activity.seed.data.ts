import { v4 } from "uuid";
import { Prisma } from "../../../prisma/generated/client";
import { cardSeedData } from "../card/card.seed.data";
import { userSeedData } from "../user/user.seed.data";
import { boardSeedData } from "../board/board.seed.data";
import { listSeedData } from "../list/list.seed.data";
import { activityTypeSeedData } from "../activity-type/activity-type.seed.data";
import { ActivityTypes } from "../activity-type/activity-type.type";
import { commentSeedData } from "../comment/comment.seed.data";

class ActivitySeedData {
    activities: Prisma.ActivityUncheckedCreateInput[] = [];
    constructor() {
        for (const board of boardSeedData.boards) {
            for (const list of listSeedData.lists) {
                if (list.boardId === board.id) {
                    const cards = cardSeedData.cards.filter((card) => card.listId === list.id);
                    const addCardActivityType = activityTypeSeedData.activityTypes.filter((activityType) => activityType.name == ActivityTypes.ADD_CARD)[0];
                    const addCommentToCardActivityType = activityTypeSeedData.activityTypes.filter((activityType) => activityType.name == ActivityTypes.ADD_COMMENT_TO_CARD)[0];
                    for (const card of cards) {
                        this.activities.push({
                            id: v4(),
                            description: `${userSeedData.users[0].email} added ${card.name} to ${list.name}`,
                            activityTypeId: addCardActivityType.id || v4(),
                            userId: userSeedData.users[0].id || v4(),
                            boardId: board.id || v4(),
                            cardId: card.id || v4(),
                        });
                        for (const comment of commentSeedData.comments.filter((comment) => comment.cardId === card.id)) {
                            this.activities.push({
                                id: v4(),
                                description: `${userSeedData.users[0].email} added comment to ${card.name}`,
                                activityTypeId: addCommentToCardActivityType.id || v4(),
                                userId: userSeedData.users[0].id || v4(),
                                boardId: board.id || v4(),
                                cardId: card.id || v4()
                              });
                        }
                    }
                }
            }
        }
    }
}

export const activitySeedData = new ActivitySeedData();