import { inject, injectable } from 'inversify';
import { User, UserCreationAttributes } from '@app/Models/User';
import { Request } from 'express';
import { BaseService } from './BaseService';
import { apiConfiguration } from '@config/api';
import querystring from 'querystring';
import i18next from 'i18next';
import { STATUS } from '@constant/common';

@injectable()
export class AuthService extends BaseService {
    constructor() {
        super();
    }
    public async auth(request: Request): Promise<this> {
        return this;
    }
    public async refresh(request: Request): Promise<this> {
        return this;
    }
    public async logout(request: Request): Promise<this> {
        return this;
    }
}
