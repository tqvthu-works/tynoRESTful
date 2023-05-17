export const appConfig = {
    secret_key: process.env.APP_KEY,
    env: process.env.APP_ENV,
    lang: ['en'],
    providers: ['AppServiceProvider'],
    host: process.env.HOST,
    webhook_host: process.env.WEBHOOKS_HOST,
};
