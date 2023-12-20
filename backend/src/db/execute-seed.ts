import { activityTypeSeedData } from "../modules/activity-type/activity-type.seed.data";
import { activitySeedData } from "../modules/activity/activity.seed.data";
import { boardSeedData } from "../modules/board/board.seed.data";
import { cardSeedData } from "../modules/card/card.seed.data";
import { commentSeedData } from "../modules/comment/comment.seed.data";
import { listSeedData } from "../modules/list/list.seed.data";
import { userSeedData } from "../modules/user/user.seed.data";
import PrismaService from "./prisma.service";

const seed = async () => {
    console.log('Activity type seeding start...');
    await PrismaService.activityType.createMany({ data: activityTypeSeedData.activityTypes });

    console.log('User seeding start...');
    await PrismaService.user.createMany({ data: userSeedData.users });

    console.log('Board seeding start...');
    await PrismaService.board.createMany({ data: boardSeedData.boards });

    console.log('List seeding start...');
    await PrismaService.list.createMany({ data: listSeedData.lists });

    console.log('Card seeding start...');
    await PrismaService.card.createMany({ data: cardSeedData.cards });

    console.log('Comment seeding start...');
    await PrismaService.comment.createMany({ data: commentSeedData.comments });

    console.log('Activity seeding start...');
    await PrismaService.activity.createMany({ data: activitySeedData.activities });
}

seed().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await PrismaService.$disconnect();
});