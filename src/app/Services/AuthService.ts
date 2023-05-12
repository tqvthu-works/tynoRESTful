import { inject, injectable } from 'inversify';
import { User, UserCreationAttributes } from '@app/Models/User';
import { Request } from 'express';
import { BaseService } from './BaseService';
import i18next from 'i18next';
import { HTTP_STATUS_CODE } from '@constant/common';
import bcrypt from 'bcrypt';
import { jwtConfig } from '@config/jwt';
import jwt from 'jsonwebtoken';

@injectable()
export class AuthService extends BaseService {
    constructor() {
        super();
    }
    public async register(request: Request): Promise<this> {
        const password: string = bcrypt.hashSync(request.body.password, 10);
        const data: UserCreationAttributes = {
            username: request.body.username,
            password: password,
        };
        const user = await User.create(data);
        this.setStatus(true);
        this.setData(user);
        return this;
    }

    public async login(request: Request): Promise<this> {
        const user = await User.findOne({
            where: {
                username: request.body.username,
            },
        });
        console.log(user);
        if (!user) {
            this.setStatus(false);
            this.setHttpCode(HTTP_STATUS_CODE.NOT_FOUND);
            return this;
        }
        const isMatch = bcrypt.compareSync(
            request.body.password,
            user.password,
        );
        if (!isMatch) {
            this.setStatus(false);
            this.setHttpCode(HTTP_STATUS_CODE.BAD_REQUEST);
            this.setMessage(i18next.t('custom.credential_invalid'));
        }
        delete user.dataValues.password;
        const token: string = jwt.sign(user.dataValues, jwtConfig.secret, {
            algorithm: jwtConfig.algorithm,
        });
        this.setStatus(true);
        this.setData({ token: token });
        return this;
    }

    public async user(request: Request): Promise<this> {
        this.setData(request.user);
        this.setStatus(true);
        return this;
    }
}
