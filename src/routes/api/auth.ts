import Express from 'express';
import AuthController from '@app/Http/Controllers/AuthController';
import { AuthRequest } from '@app/Http/Request/AuthRequest';
import { Auth } from '@app/Http/Middleware/Auth';

const AuthRouter = Express.Router();


AuthRouter.use((req, res, next) => {
    new AuthRequest(req, res, next).handle();
});

/* Place to define routes */
AuthRouter.post('/register', ActionHandler(AuthController, 'register'));
AuthRouter.post('/login', ActionHandler(AuthController, 'login'));
AuthRouter.get('/user', Auth, ActionHandler(AuthController, 'user'));

export default AuthRouter;
