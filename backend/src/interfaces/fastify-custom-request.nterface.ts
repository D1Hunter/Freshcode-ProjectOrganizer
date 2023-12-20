import { FastifyRequest } from "fastify";

export interface FastifyRequestWithBody<T> extends FastifyRequest {
    body:T
}

export interface FastifyRequestWithParams<T> extends FastifyRequest {
    params:T
}

export interface FastifyRequestWithParamsAndBody<T,U> extends FastifyRequest {
    params:T,
    body:U
}