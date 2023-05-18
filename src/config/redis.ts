import { IRedisConfig } from '@contract/redis';
import 'dotenv/config';
export const redisConfig: IRedisConfig = {
    default: {
        host: process.env.REDIS_HOST_URI ?? 'localhost',
        port: process.env.REDIS_PORT ?? '6379',
        password: process.env.REDIS_PASS,
        db: process.env.REDIS_DB,
    },
    /* For another connection */
};

export const queues: string[] = ['default'].concat(
    process.env.REDIS_QUEUES.split(','),
    [],
);
