import { NextFunction, Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import * as httpStatus from 'http-status';
import { jwtConfig } from '@config/jwt';
import { UserAttributes } from '@app/Models/User';

export const Auth = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '') || '';
        const data = jwt.verify(token, jwtConfig.secret);
        req.user = data as UserAttributes;
        return next();
    } catch (err) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: false,
        });
    }
};
