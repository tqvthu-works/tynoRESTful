import Express from 'express';
import { AuthController } from '@app/Http/Controllers/AuthController';
import { handler } from '@core/http/controller-handler';
import { AuthRequest } from '@app/Http/Request/AuthRequest';
import { Auth } from '@app/Http/Middleware/Auth';

const authController = container.resolve<AuthController>(AuthController);
const AuthRouter = Express.Router();

/**
 * Set groups
 * Set Request Validator Middleware
 * Set middleware
 */
AuthRouter.use(
    '/auth',
    (req, res, next) => {
        new AuthRequest(req, res, next).handle();
    },
    AuthRouter,
); /* users prefix */

/* Place to define routes */
AuthRouter.post('/register', handler(authController, 'register'));
AuthRouter.post('/login', handler(authController, 'login'));
AuthRouter.get('/user', Auth, handler(authController, 'user'));

export default AuthRouter;
