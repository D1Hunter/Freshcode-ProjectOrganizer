import 'reflect-metadata';
import "dotenv/config";
import app from './app';

const PORT: number = Number(process.env.PORT) || 3000;

const start = async () => {
    try {
        app.listen({ port: PORT }, () => console.log(`Server has been started on port: ${PORT}`));
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start();