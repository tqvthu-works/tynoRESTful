import { inject, injectable } from 'inversify';
import { UserService } from '@app/Services/UserService';
import { Request, Response } from 'express';
import { ApiController } from './ApiController';

@injectable()
export class UserController extends ApiController {
    protected userService: UserService;

    constructor(@inject(UserService) userService: UserService) {
        super();
        this.userService = userService;
    }
    public async register(
        request: Request,
        response: Response,
    ): Promise<Response> {
        return this.response(
            response,
            await this.userService.register(request),
        );
    }
    public async login(
        request: Request,
        response: Response,
    ): Promise<Response> {
        return this.response(response, await this.userService.login(request));
    }
}
