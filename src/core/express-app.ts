import i18next from 'i18next';
import { ApiRouter } from '@routes/api';
import express from 'express';
import { appConfig } from '@config/app';
import { HTTP_STATUS_CODE } from '@constant/common';
import * as Sentry from '@sentry/node';
import { APP_ENVS } from '@constant/app';

export class ExpressApp {
    public static load(app: express.Express, router: express.Router): void {
        app.use(express.json({ limit: '500kb' }));
        app.use(express.urlencoded({ limit: '500kb', extended: false }));
        app.use(router);
        app.use((req, _, next) => {
            const supportedLanguages = appConfig.lang;
            const language = req.headers['accept-language'] ?? 'en';
            if (language && supportedLanguages.includes(language)) {
                i18next.changeLanguage(language);
            }
            next();
        });
        router.use(`/api`, ApiRouter);
        const errorHandler = (
            err,
            _: express.Request,
            res: express.Response,
            next: express.NextFunction
        ): express.Response | express.NextFunction => {
            const status = err.statusCode || 500;
            if (process.env.APP_ENV == APP_ENVS.LOCAL) {
                return res.status(status).json({
                    status: false,
                    message: err?.stack ?? err.message
                });
            }
            Sentry.captureMessage(err.message, {
                level: 'error'
            });
            return res.status(status).json({
                status: false,
                message: i18next.t('custom.http.internal_error')
            });
        };

        app.use(errorHandler);
        /*  Handle not found */
        router.use((_, res: express.Response) => {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
                code: HTTP_STATUS_CODE.NOT_FOUND,
                message: i18next.t('custom.http.not_found')
            });
        });
    }
}
