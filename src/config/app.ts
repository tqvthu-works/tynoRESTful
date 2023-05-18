export const appConfig = {
    port: process.env.APP_PORT ?? 3000,
    host: process.env.HOST ?? 'http://localhost',
    secret_key: process.env.APP_KEY,
    env: process.env.APP_ENV,
    lang: ['en'],
    providers: ['AppServiceProvider'],
    webhook_host: process.env.WEBHOOKS_HOST,
};
