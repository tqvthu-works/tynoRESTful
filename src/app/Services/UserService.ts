import { injectable } from 'inversify';
import { User, UserCreationAttributes } from '@app/Models/User';
import { Request } from 'express';
import { BaseService } from './BaseService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '@config/index';
import { HTTP_STATUS_CODE } from '@constant/common';
import i18next from 'i18next';

@injectable()
export class UserService extends BaseService {
    constructor() {
        super();
    }
    public async register(request: Request): Promise<this> {
        const checkExist = await User.findOne({
            where: {
                username: request.body.username,
            },
        });
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

        const token: string = jwt.sign(user.dataValues, jwtConfig.secret, {
            algorithm: jwtConfig.algorithm,
        });
        this.setStatus(true);
        this.setData({ token: token });
        return this;
    }
}
