export const onSendSetStatusCode = (statusCode: number) => {
    return (request:any, reply:any, payload:any, done:any) => {
        if (reply.statusCode === 200) {
            reply.status(statusCode);
        }
        done();
    }
};