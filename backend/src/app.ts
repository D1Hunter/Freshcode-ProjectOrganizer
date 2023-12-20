import fastify, { FastifyInstance } from "fastify";
import cors from '@fastify/cors'
import { fastifyYupSchema } from "fastify-yup-schema";
import authRouter from "./modules/auth/auth.route";
import boardRouter from "./modules/board/board.route";
import listRouter from "./modules/list/list.route";
import cardRouter from "./modules/card/card.route";
import commentRouter from "./modules/comment/comment.route";
import activityTypeRouter from "./modules/activity-type/activity-type.route";
import activityRouter from "./modules/activity/activity.route";

const app: FastifyInstance = fastify({logger:true});
const FRONTEND_URL = process.env.FRONTEND_URL || "*";

app.register(cors,{
    origin:FRONTEND_URL,
    credentials:true
});
app.register(fastifyYupSchema);
app.register(authRouter, {prefix:'auth'});
app.register(boardRouter, {prefix:'board'});
app.register(listRouter, {prefix:'list'});
app.register(cardRouter, {prefix:'card'});
app.register(commentRouter, {prefix:'comment'});
app.register(activityTypeRouter, {prefix:'activity-type'});
app.register(activityRouter, {prefix:'activity'});

export default app;