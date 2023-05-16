import { inject, injectable } from 'inversify';
import { AuthService } from '@app/Services/AuthService';
import { Request, Response } from 'express';
import { ApiController } from './ApiController';

@injectable()
class AuthController extends ApiController {
    protected service: AuthService;

    constructor(@inject(AuthService) service: AuthService) {
        super();
        this.service = service;
    }
    public async register(
        request: Request,
        response: Response,
    ): Promise<Response> {
        return this.response(response, await this.service.register(request));
    }
    public async login(
        request: Request,
        response: Response,
    ): Promise<Response> {
        return this.response(response, await this.service.login(request));
    }

    public async user(request: Request, response: Response): Promise<Response> {
        return this.response(response, await this.service.user(request));
    }
}
export default container.resolve<AuthController>(AuthController);
