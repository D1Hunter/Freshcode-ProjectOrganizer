declare namespace NodeJS{
    export interface ProcessEnv{
        PORT?:number;
        JWT_ACCESS_SECRET?: string;
        JWT_ACCESS_EXPIRATION?: string;
        FRONTEND_URL?: string;
    }
}