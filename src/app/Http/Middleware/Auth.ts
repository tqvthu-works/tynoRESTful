import { NextFunction, Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { parse as parseUrl } from 'url';
import { AnyObject } from '@core/contract';
import * as httpStatus from 'http-status';

export const Auth = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    const token = req.headers.authorization?.replace('Bearer ', '') || '';
    try {
        return next();
    } catch (err) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: false,
        });
    }
};
