import Express from 'express';
import { AuthController } from '@app/Http/Controllers/AuthController';
import { handler } from '@core/http/controller-handler';

const authController = container.resolve<AuthController>(AuthController);
const AuthRouter = Express.Router();

/**
 * Set groups
 * Set Request Validator Middleware
 * Set middleware
 */
AuthRouter.use('/users', AuthRouter); /* users prefix */

/* Place to define routes */
AuthRouter.post('/auth', handler(authController, 'auth'));
AuthRouter.post('/refresh', handler(authController, 'refresh'));
AuthRouter.post('/logout', handler(authController, 'logout'));

export default AuthRouter;
