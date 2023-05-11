import { inject, injectable } from 'inversify';
import { AuthService } from '@app/Services/AuthService';
import { Request, Response } from 'express';
import { ApiController } from './ApiController';

@injectable()
export class AuthController extends ApiController {
    protected service: AuthService;

    constructor(@inject(AuthService) service: AuthService) {
        super();
        this.service = service;
    }
    public async auth(request: Request, response: Response): Promise<Response> {
        return this.response(response, await this.service.auth(request));
    }
}
