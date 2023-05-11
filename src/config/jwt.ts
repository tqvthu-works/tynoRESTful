import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConfig = {
    secret: process.env.APP_KEY,
    algorithm: 'HS256',
    expiration: 3600, // Token expiration time in seconds
} as const;
