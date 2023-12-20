import PrismaService from "./prisma.service";

const dropDB =async () => {
    console.log('Dropping database start...');
    await PrismaService.comment.deleteMany();
    await PrismaService.activity.deleteMany();
    await PrismaService.activityType.deleteMany();
    await PrismaService.card.deleteMany();
    await PrismaService.list.deleteMany();
    await PrismaService.board.deleteMany();
    await PrismaService.token.deleteMany();
    await PrismaService.user.deleteMany();
};

dropDB().catch((e) => {
    console.error(e);
    process.exit(1);
  }).finally(async () => {
    await PrismaService.$disconnect();
});